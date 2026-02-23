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

.PHONY: status
status:  ## Show status
	@echo "Show status"
	python3 ../dirty.py

.PHONY: check-versions
check-versions:  ## Show check-versions
	@echo "Checking versions"
	cd packages/volto-light-theme && pnpm exec vitest run src/internalChecks.test.ts

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
	RAZZLE_INTERNAL_API_PATH=http://127.0.0.1:55001/plone NODE_OPTIONS=--dns-result-order=ipv4first pnpm start

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: ## Start acceptance frontend in production mode
	RAZZLE_INTERNAL_API_PATH=http://127.0.0.1:55001/plone pnpm build && pnpm start:prod

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
# Keep local snapshots aligned with the shared visual regression repository.
.PHONY: sync-visual-regression-snapshots
sync-visual-regression-snapshots:
	@if [ -d playwright/__screenshots__/.git ]; then \
		if git -C playwright/__screenshots__ status --porcelain | grep -q .; then \
			echo "Skipping snapshot sync: local changes detected"; \
		else \
			git -C playwright/__screenshots__ fetch origin main; \
			git -C playwright/__screenshots__ reset --hard origin/main; \
		fi; \
	else \
		rm -rf playwright/__screenshots__; \
		git clone --branch main git@github.com:kitconcept/vlt-visual-regression.git playwright/__screenshots__; \
	fi

.PHONY: acceptance-visual-test
acceptance-visual-test: sync-visual-regression-snapshots ## Start visual Cypress Acceptance Tests
	pnpm exec playwright test playwright/tests/visual/main --ui

.PHONY: acceptance-visual-test-storybook
acceptance-visual-test-storybook: sync-visual-regression-snapshots ## Start visual Cypress Acceptance Tests for Storybook
	pnpm exec playwright test playwright/tests/visual/storybook --ui
