### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Python checks
UV?=uv

# installed?
ifeq (, $(shell which $(UV) ))
  $(error "UV=$(UV) not found in $(PATH)")
endif

DOCS_FOLDER=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

VENV_FOLDER=$(DOCS_FOLDER)/.venv
BIN_FOLDER=$(VENV_FOLDER)/bin

# Sphinx variables
# You can set these variables from the command line.
SPHINXOPTS      ?=
VALEOPTS        ?=
# Internal variables.
BUILDDIR        = $(DOCS_FOLDER)/_build/
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) .
VALEFILES       := $(shell find $(DOCS_FOLDER) -type f -name "*.md" -print)

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

.PHONY: all
all: install

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

$(VENV_FOLDER): ## Install dependencies
	@echo "$(GREEN)==> Install environment$(RESET)"
	@uv sync

.PHONY: install
install: $(VENV_FOLDER) ## Install dependencies

.PHONY: sync
sync: ## Install dependencies
	@echo "$(GREEN)==> Sync environment$(RESET)"
	@uv sync

.PHONY: clean
clean:  ## Clean current and legacy docs build directories, and Python virtual environment
	rm -rf $(VENV_FOLDER) .python-version
	rm -rf $(BUILDDIR)

.PHONY: html
html: $(VENV_FOLDER)  ## Build html
	@uv run sphinx-build  -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

.PHONY: build
build: html  ## Build html

.PHONY: livehtml
livehtml: $(VENV_FOLDER)  ## Rebuild Sphinx documentation on changes, with live-reload in the browser
	@uv run sphinx-autobuild --ignore "*.swp"  -b html . "$(BUILDDIR)/html" $(SPHINXOPTS)

.PHONY: linkcheck
linkcheck: $(VENV_FOLDER)  ## Run linkcheck
	@uv run sphinxbuild-b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: linkcheckbroken
linkcheckbroken: $(VENV_FOLDER)  ## Run linkcheck and show only broken links
	@uv run sphinxbuild-b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck | GREP_COLORS='0;31' grep -wi "broken\|redirect" --color=always | GREP_COLORS='0;31' grep -vi "https://github.com/plone/volto/issues/" --color=always && if test $$? -eq 0; then exit 1; fi || test $$? -ne 0

.PHONY: vale
vale: $(VENV_FOLDER)  ## Install (once) and run Vale style, grammar, and spell checks
	@uv run vale sync
	@uv run vale --no-wrap $(VALEOPTS) $(VALEFILES)
	@echo
	@echo "Vale is finished; look for any errors in the above output."

.PHONY: rtd-pr-preview
rtd-pr-preview: ## Build previews of pull requests that have documentation changes on Read the Docs via CI
	@pip install uv
	@uv sync
	@uv run sphinx-build -b html $(ALLSPHINXOPTS) ${READTHEDOCS_OUTPUT}/html/

.PHONY: rtd-build
rtd-build: ## Build Volto Light Theme docs on RTD
	@pip install uv
	@uv sync
	@uv run sphinx-build -b html $(ALLSPHINXOPTS) ${READTHEDOCS_OUTPUT}/html/
