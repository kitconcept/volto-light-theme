### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

# Set distributions still in development
DISTRIBUTIONS="voltolighttheme"

# Docker Image name
IMAGE_NAME=ghcr.io/kitconcept/voltolighttheme
IMAGE_TAG=latest

PLONE6=6
PLONE_VERSION=6.1.0b1
SEED=$$(date +'%Y%m%d-%H%M%S')

# Python checks
PYTHON?=python3

# installed?
ifeq (, $(shell which $(PYTHON) ))
  $(error "PYTHON=$(PYTHON) not found in $(PATH)")
endif

# version ok?
PYTHON_VERSION_MIN=3.8
PYTHON_VERSION_OK=$(shell $(PYTHON) -c "import sys; print((int(sys.version_info[0]), int(sys.version_info[1])) >= tuple(map(int, '$(PYTHON_VERSION_MIN)'.split('.'))))")
ifeq ($(PYTHON_VERSION_OK),0)
  $(error "Need python $(PYTHON_VERSION) >= $(PYTHON_VERSION_MIN)")
endif

BACKEND_FOLDER=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
EXAMPLE_CONTENT_FOLDER=${BACKEND_FOLDER}/src/kitconcept/voltolighttheme/setuphandlers/examplecontent
PLONE_SITE_ID=Plone


GIT_FOLDER=$(BACKEND_FOLDER)/.git


all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

bin/pip bin/tox bin/mxdev:
	@echo "$(GREEN)==> Setup Virtual Env$(RESET)"
	$(PYTHON) -m venv .
	bin/pip install -U "pip" "wheel" "cookiecutter" "mxdev" "tox" "pre-commit"
	if [ -d $(GIT_FOLDER) ]; then bin/pre-commit install; else echo "$(RED) Not installing pre-commit$(RESET)";fi

.PHONY: config
config: bin/pip  ## Create instance configuration
	@echo "$(GREEN)==> Create instance configuration$(RESET)"
	bin/cookiecutter -f --no-input --config-file instance.yaml gh:plone/cookiecutter-zope-instance

.PHONY: build-dev
build-dev: config ## pip install Plone packages
	@echo "$(GREEN)==> Setup Build$(RESET)"
	bin/mxdev -c mx.ini
	bin/pip install -r requirements-mxdev.txt

.PHONY: install
install: build-dev ## Install Plone 6.0


.PHONY: build
build: build-dev ## Install Plone 6.0


.PHONY: clean
clean: ## Remove old virtualenv and creates a new one
	@echo "$(RED)==> Cleaning environment and build$(RESET)"
	rm -rf bin lib lib64 include share etc var inituser pyvenv.cfg .installed.cfg instance .tox .pytest_cache

.PHONY: start
start: ## Start a Plone instance on localhost:8080
	ALLOWED_DISTRIBUTIONS=$(DISTRIBUTIONS) DEVELOP_DISTRIBUTIONS=$(DISTRIBUTIONS) PYTHONWARNINGS=ignore ./bin/runwsgi instance/etc/zope.ini

.PHONY: console
console: ## Start a zope console
	ALLOWED_DISTRIBUTIONS=$(DISTRIBUTIONS) DEVELOP_DISTRIBUTIONS=$(DISTRIBUTIONS) PYTHONWARNINGS=ignore ./bin/zconsole debug instance/etc/zope.conf

.PHONY: create-site
create-site: ## Create a new Plone site using this distribution
	ALLOWED_DISTRIBUTIONS=$(DISTRIBUTIONS) DEVELOP_DISTRIBUTIONS=$(DISTRIBUTIONS) PYTHONWARNINGS=ignore ./bin/zconsole run instance/etc/zope.conf ./scripts/create_site.py

.PHONY: format
format: bin/tox ## Format the codebase according to our standards
	@echo "$(GREEN)==> Format codebase$(RESET)"
	bin/tox -e format

.PHONY: lint
lint: ## check code style
	bin/tox -e lint

.PHONY: dependencies
dependencies: ## check dependencies
	bin/tox -e dependencies

.PHONY: release-check
release-check: ## check if package is ready for release
	bin/tox -e release-check

# i18n
bin/i18ndude: bin/pip
	@echo "$(GREEN)==> Install translation tools$(RESET)"
	bin/pip install i18ndude

.PHONY: i18n
i18n: bin/i18ndude ## Update locales
	@echo "$(GREEN)==> Updating locales$(RESET)"
	bin/update_dist_locale


# Example Content
.PHONY: update-example-content
update-example-content: bin/tox ## Export example content inside package
	@echo "$(GREEN)==> Export example content into $(EXAMPLE_CONTENT_FOLDER) $(RESET)"
	if [ -d $(EXAMPLE_CONTENT_FOLDER)/content ]; then rm -r $(EXAMPLE_CONTENT_FOLDER)/* ;fi
	bin/plone-exporter instance/etc/zope.conf $(PLONE_SITE_ID) $(EXAMPLE_CONTENT_FOLDER)

# Tests
.PHONY: test
test: bin/tox ## run tests
	ALLOWED_DISTRIBUTIONS=$(DISTRIBUTIONS) DEVELOP_DISTRIBUTIONS=$(DISTRIBUTIONS) bin/tox -e test

.PHONY: test-coverage
test-coverage: bin/tox ## run tests with coverage
	ALLOWED_DISTRIBUTIONS=$(DISTRIBUTIONS) DEVELOP_DISTRIBUTIONS=$(DISTRIBUTIONS) bin/tox -e coverage

# Docker image
.PHONY: build-image
build-image:  ## Build Docker Image
	@DOCKER_BUILDKIT=1 docker build . -t $(IMAGE_NAME):$(IMAGE_TAG) -f Dockerfile --build-arg PLONE_VERSION=$(PLONE_VERSION) --build-arg SEED=$(SEED)

.PHONY: run-image
run-image:  build-image  ## Build Docker Image
	docker run --rm -it -p 8080:8080 $(IMAGE_NAME):$(IMAGE_TAG)
