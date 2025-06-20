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

# Recipe snippets  for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

NODEBIN = ./node_modules/.bin

PLONE_VERSION=6
IMAGE_NAME=ghcr.io/kitconcept/voltolighttheme
IMAGE_NAME_SUFFIX=frontend
IMAGE_TAG=latest
DOCKER_IMAGE_ACCEPTANCE=plone/server-acceptance:${PLONE_VERSION}

VOLTO_VERSION = $(shell cat ./mrs.developer.json | python -c "import sys, json; print(json.load(sys.stdin)['core']['tag'])")
ADDON_NAME='@kitconcept/volto-light-theme'


.PHONY: help
help: ## Show this help
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

# Dev Helpers
.PHONY: clean
clean: ## Clean environment
	@echo "$(RED)==> Cleaning Volto core and node_modules$(RESET)"
	rm -rf core node_modules public

.PHONY: install
install: ## Installs the add-on in a development environment
	pnpm dlx mrs-developer missdev --no-config --fetch-https
	pnpm i
	make build-deps

.PHONY: start
start: ## Starts Volto, allowing reloading of the add-on during development
	pnpm start

.PHONY: build
build: ## Build a production bundle for distribution of the project with the add-on
	pnpm build

core/packages/registry/dist: $(shell find core/packages/registry/src -type f)
	pnpm --filter @plone/registry build

core/packages/components/dist: $(shell find core/packages/components/src -type f)
	pnpm --filter @plone/components build

.PHONY: build-deps
build-deps: core/packages/registry/dist core/packages/components/dist ## Build dependencies

.PHONY: i18n
i18n: ## Sync i18n
	pnpm --filter $(ADDON_NAME) i18n

.PHONY: ci-i18n
ci-i18n: ## Check if i18n is not synced
	pnpm --filter $(ADDON_NAME) i18n && git diff -G'^[^\"POT]' --exit-code

.PHONY: format
format: ## Format codebase
	pnpm lint:fix
	pnpm prettier:fix
	pnpm stylelint:fix

.PHONY: lint
lint: ## Lint, or catch and remove problems, in code base
	pnpm lint
	pnpm prettier
	pnpm stylelint --allow-empty-input

.PHONY: release
release: ## Release the add-on on npmjs.org
	pnpm release

.PHONY: release-dry-run
release-dry-run: ## Dry-run the release of the add-on on npmjs.org
	pnpm release

.PHONY: test
test: ## Run unit tests
	pnpm test

.PHONY: test-ci
ci-test: ## Run unit tests in CI
	VOLTOCONFIG=$(CURRENT_DIR)/volto.config.js pnpm --filter @plone/volto i18n
	CI=1 pnpm test -- --passWithNoTests

.PHONY: build-image
build-image:  ## Build Docker Image
	@DOCKER_BUILDKIT=1 docker build . -t $(IMAGE_NAME)-$(IMAGE_NAME_SUFFIX):$(IMAGE_TAG) -f Dockerfile --build-arg VOLTO_VERSION=$(VOLTO_VERSION)

.PHONY: backend-docker-start
backend-docker-start:	## Starts a Docker-based backend for development
	@echo "$(GREEN)==> Start Docker-based Plone Backend$(RESET)"
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone $(IMAGE_NAME)-backend

## Storybook
.PHONY: storybook-start
storybook-start: ## Start Storybook server on port 6006
	@echo "$(GREEN)==> Start Storybook$(RESET)"
	pnpm run storybook

.PHONY: storybook-build
storybook-build: ## Build Storybook
	@echo "$(GREEN)==> Build Storybook$(RESET)"
	mkdir -p $(CURRENT_DIR)/.storybook-build
	pnpm run storybook-build -o $(CURRENT_DIR)/.storybook-build

## Acceptance
.PHONY: acceptance-frontend-dev-start
acceptance-frontend-dev-start: ## Start acceptance frontend in development mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone NODE_OPTIONS=--dns-result-order=ipv4first pnpm start

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: ## Start acceptance frontend in production mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: ci-acceptance-backend-start
ci-acceptance-backend-start: ## Start backend acceptance server in headless mode for CI
	docker run -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: acceptance-test
acceptance-test: ## Start Cypress in interactive mode
	pnpm --filter @plone/volto exec cypress open --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern=$(CURRENT_DIR)'/cypress/tests/**/*.{js,jsx,ts,tsx}'

.PHONY: ci-acceptance-test
ci-acceptance-test: ## Run cypress tests in headless mode for CI
	pnpm --filter @plone/volto exec cypress run --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern='$(SPEC)'

# a11y tests
.PHONY: acceptance-a11y-frontend-prod-start
acceptance-a11y-frontend-prod-start: ## Start a11y acceptance frontend in prod mode
	pnpm build && pnpm start:prod

.PHONY: ci-acceptance-a11y-backend-start
ci-acceptance-a11y-backend-start: ## Start acceptance a11y server in CI mode (no terminal attached)
	docker run -i --rm --name=backend -p 8080:8080 -e SITE=Plone -e ADDONS='$(KGS)' $(IMAGE_NAME)-backend

.PHONY: acceptance-a11y-test
acceptance-a11y-test: ## Start a11y Cypress in interactive mode
	CYPRESS_a11y=1 CYPRESS_API_PATH=http://localhost:8080/Plone pnpm exec cypress open specPattern=$(CURRENT_DIR)'/cypress/tests/a11y/**/*.{js,jsx,ts,tsx}'

.PHONY: ci-acceptance-a11y-test
ci-acceptance-a11y-test: ## Run a11y cypress tests in headless mode for CI
	CYPRESS_a11y=1 CYPRESS_API_PATH=http://localhost:8080/Plone pnpm exec cypress run --config specPattern='$(SPEC)'

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

.PHONY: acceptance-test-visual
acceptance-test-visual: ## Start visual Cypress Acceptance Tests
	NODE_ENV=production $(NODEBIN)/cypress open --config-file cypress/config/cypress.visual.config.js --config specPattern='$(SPEC)'

.PHONY: acceptance-test-visual-storybook
acceptance-test-visual-storybook: ## Start visual Cypress Acceptance Tests for Storybook
	NODE_ENV=production $(NODEBIN)/cypress open --config-file cypress/config/cypress.visual.config.storybook.js --config specPattern='$(SPEC)'

# Running the visual tests in headless, cumulative mode will SKIP tests that have run previously, and
# only run the still failing tests HOWEVER the results are not collected in interactive mode due to
# inherent limitations of Cypress. But if you run the tests in cumulative headless mode first,
# then this command can be used to run ONLY the failing tests in interactive mode.
.PHONY: acceptance-test-visual-cumulative
acceptance-test-visual-cumulative: ## Start visual Cypress Acceptance Tests with cumulative filtering
	@echo WARNING: cumulative results are NOT collected in interactive mode, use headless mode for collection
	NODE_ENV=production cypress_enableCumulative=true $(NODEBIN)/cypress open --config-file cypress/config/cypress.visual.config.js

.PHONY: ci-acceptance-test-visual
ci-acceptance-test-visual: ## Start visual Cypress Acceptance Tests in headless mode
	NODE_ENV=production $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js --config specPattern='$(SPEC)'

.PHONY: ci-acceptance-test-visual-storybook
ci-acceptance-test-visual-storybook: ## Start visual Cypress Acceptance Tests in headless mode for Storybook
	NODE_ENV=production $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.storybook.js --config specPattern='$(SPEC)'

# Running the visual tests in headless, cumulative mode will SKIP tests that have run previously, and
# only run the still failing tests.
.PHONY: ci-acceptance-test-visual-cumulative
ci-acceptance-test-visual-cumulative: ## Start visual Cypress Acceptance Tests in headless mode
	NODE_ENV=production cypress_enableCumulative=true $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js

# Automatically update all changed visual snapshots
.PHONY: ci-acceptance-test-visual-update
ci-acceptance-test-visual-update: ## Start visual Cypress Acceptance Tests in headless mode, always pass and update images
	NODE_ENV=production cypress_pluginVisualRegressionUpdateImages=true $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js

# Automatically update all changed visual snapshots, and
# running the visual tests in headless, cumulative mode will SKIP tests that have run previously, and
# only run the still failing tests
.PHONY: ci-acceptance-test-visual-update-cumulative
ci-acceptance-test-visual-update-cumulative: ## Start visual Cypress Acceptance Tests in headless mode, always pass and update images, with cumulative results
	NODE_ENV=production cypress_enableCumulative=true cypress_pluginVisualRegressionUpdateImages=true $(NODEBIN)/cypress run --browser firefox --config-file cypress/config/cypress.visual.config.js

.PHONY: summarize-cumulative-state
summarize-cumulative-state: ## Summarize cumulative state into ...-summary.report
	pnpm summarize-cumulative-state


.PHONY: ci-acceptance-server-visual-start
ci-acceptance-server-visual-start: ci-acceptance-a11y-backend-start

.PHONY: ci-acceptance-frontend-visual-start
ci-acceptance-frontend-visual-start: acceptance-a11y-frontend-prod-start
