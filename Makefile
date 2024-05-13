### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Recipe snippets for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

NODEBIN = ./node_modules/.bin

PLONE_VERSION=6
DOCKER_IMAGE=ghcr.io/kitconcept/voltolighttheme:latest
DOCKER_IMAGE_ACCEPTANCE=plone/server-acceptance:${PLONE_VERSION}

ADDON_NAME='@kitconcept/volto-light-theme'

.PHONY: help
help:		## Show this help
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

# Dev Helpers
.PHONY: install
install: ## Install task, checks if missdev (mrs-developer) is present and runs it
	pnpm dlx mrs-developer missdev --no-config --fetch-https
	pnpm i

.PHONY: i18n
i18n: ## Sync i18n
	pnpm --filter $(ADDON_NAME) i18n

.PHONY: format
format: ## Format codebase
	pnpm lint:fix
	pnpm prettier:fix
	pnpm stylelint:fix

.PHONY: lint
lint: ## Lint Codebase
	pnpm lint
	pnpm prettier
	pnpm stylelint --allow-empty-input

.PHONY: test
test: ## Run unit tests
	pnpm test

.PHONY: test-ci
test-ci: ## Run unit tests in CI
	CI=1 RAZZLE_JEST_CONFIG=$(CURRENT_DIR)/jest-addon.config.js pnpm --filter @plone/volto test

.PHONY: start-backend-docker
start-backend-docker:		## Starts a Docker-based backend for developing
	@echo "$(GREEN)==> Start Docker-based Plone Backend$(RESET)"
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

## Acceptance
.PHONY: start-test-acceptance-frontend-dev
start-test-acceptance-frontend-dev: ## Start acceptance frontend in dev mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

.PHONY: start-test-acceptance-frontend start-test-acceptance-frontend-visual
start-test-acceptance-frontend start-test-acceptance-frontend-visual: ## Start acceptance frontend in prod mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: start-test-acceptance-frontend-a11y
start-test-acceptance-frontend-a11y: ## Start a11y acceptance frontend in prod mode
	pnpm build && pnpm start:prod

.PHONY: start-test-acceptance-server start-test-acceptance-server-visual
start-test-acceptance-server start-test-acceptance-server-visual: ## Start acceptance server
	docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-server-ci start-test-acceptance-server-visual-ci
start-test-acceptance-server-ci start-test-acceptance-server-visual-ci: ## Start acceptance server in CI mode (no terminal attached)
	docker run -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-server-a11y
start-test-acceptance-server-a11y: ## Start acceptance a11y server
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: start-test-acceptance-server-a11y-ci
start-test-acceptance-server-a11y-ci: ## Start acceptance a11y server in CI mode (no terminal attached)
	docker run -i --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(DOCKER_IMAGE)

.PHONY: test-acceptance
test-acceptance: ## Start Cypress in interactive mode
	pnpm exec cypress open --config specPattern=$(CURRENT_DIR)'/cypress/tests/main/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-a11y
test-acceptance-a11y: ## Start a11y Cypress in interactive mode
	CYPRESS_a11y=1 CYPRESS_API_PATH=http://localhost:8080/Plone pnpm exec cypress open specPattern=$(CURRENT_DIR)'/cypress/tests/a11y/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Run cypress tests in headless mode for CI
	pnpm exec cypress run --config specPattern=$(CURRENT_DIR)'/cypress/tests/main/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-headless-a11y
test-acceptance-headless-a11y: ## Run a11y cypress tests in headless mode for CI
	CYPRESS_a11y=1 CYPRESS_API_PATH=http://localhost:8080/Plone pnpm exec cypress run --config specPattern=$(CURRENT_DIR)'/cypress/tests/a11y/**/*.{js,jsx,ts,tsx}'

### Visual acceptance tests ###
#
# Useful env vars:
#
# cypress_cumulativeReport: cumulative report file, by default `cumulative.report`
# cypress_cumulativeSummaryReport: cumulative summary report file, by default adding `-summary.report`
#                                  to the end of the cumulative file
#                                  They are placed into `frontend/cypress/config` and
#                                  cannot be outside
#                                  of Cypress due to its virtual filesystem.
#
# Env vars in support of CI runs:
#
# cypress_baseUrl: url of server to run the test against
#                  e.g. cypress_baseUrl=https://plone-redaktion.de
#
#

.PHONY: test-acceptance-visual
test-acceptance-visual: ## Start visual Cypress Acceptance Tests
	NODE_ENV=production $(NODEBIN)/cypress open --config-file cypress/config/cypress.visual.config.js

# Running the visual tests in headless, cumulative mode will SKIP tests that have run previously, and
# only run the still failing tests HOWEVER the results are not collected in interactive mode due to
# inherent limitations of Cypress. But if you run the tests in cumulative headless mode first,
# then this command can be used to run ONLY the failing tests in interactive mode.
.PHONY: test-acceptance-visual-cumulative
test-acceptance-visual-cumulative: ## Start visual Cypress Acceptance Tests with cumulative filtering
	@echo WARNING: cumulative results are NOT collected in interactive mode, use headless mode for collection
	NODE_ENV=production cypress_enableCumulative=true $(NODEBIN)/cypress open --config-file cypress/config/cypress.visual.config.js

.PHONY: test-acceptance-visual-headless
test-acceptance-visual-headless: ## Start visual Cypress Acceptance Tests in headless mode
	NODE_ENV=production $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js

# Running the visual tests in headless, cumulative mode will SKIP tests that have run previously, and
# only run the still failing tests.
.PHONY: test-acceptance-visual-headless-cumulative
test-acceptance-visual-headless-cumulative: ## Start visual Cypress Acceptance Tests in headless mode
	NODE_ENV=production cypress_enableCumulative=true $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js

# Automatically update all changed visual snapshots
.PHONY: test-acceptance-visual-headless-update
test-acceptance-visual-headless-update: ## Start visual Cypress Acceptance Tests in headless mode, always pass and update images
	NODE_ENV=production cypress_pluginVisualRegressionUpdateImages=true $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js

# Automatically update all changed visual snapshots, and
# running the visual tests in headless, cumulative mode will SKIP tests that have run previously, and
# only run the still failing tests
.PHONY: test-acceptance-visual-headless-update-cumulative
test-acceptance-visual-headless-update-cumulative: ## Start visual Cypress Acceptance Tests in headless mode, always pass and update images, with cumulative results
	NODE_ENV=production cypress_enableCumulative=true cypress_pluginVisualRegressionUpdateImages=true $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js

.PHONY: summarize-cumulative-state
summarize-cumulative-state: ## Summarize cumulative state into ...-summary.report
	yarn summarize-cumulative-state
