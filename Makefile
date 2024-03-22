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

.PHONY: start-test-acceptance-frontend
start-test-acceptance-frontend: ## Start acceptance frontend in prod mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

.PHONY: start-test-acceptance-server
start-test-acceptance-server: ## Start acceptance server
	docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: start-test-acceptance-server-ci
start-test-acceptance-server-ci: ## Start acceptance server in CI mode (no terminal attached)
	docker run -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: test-acceptance
test-acceptance: ## Start Cypress in interactive mode
	pnpm --filter @plone/volto exec cypress open --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern=$(CURRENT_DIR)'/cypress/tests/**/*.{js,jsx,ts,tsx}'

.PHONY: test-acceptance-headless
test-acceptance-headless: ## Run cypress tests in headless mode for CI
	pnpm --filter @plone/volto exec cypress run --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern=$(CURRENT_DIR)'/cypress/tests/**/*.{js,jsx,ts,tsx}'
