# Acceptance migration inventory

The Cypress sources at commit `66de7a79` declare 221 scenarios across 57 specs.
Each source spec has a Playwright replacement with the same scenario count in the table below.
The 5 formerly skipped recurrence scenarios also run in Playwright.
Entirely commented-out historical tests are excluded.

The acceptance project also includes the 29 accessibility checks migrated earlier and two initial Playwright checks, giving 252 tests in total.
The visual and Storybook projects remain separate.

| Original source | Playwright replacement | Scenarios |
| --- | --- | ---: |
| [addons/button-block.cy.ts](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/addons/button-block.cy.ts) | [tests/addons/button-block.test.ts](tests/addons/button-block.test.ts) | 1 |
| [addons/separator-block.cy.ts](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/addons/separator-block.cy.ts) | [tests/addons/separator-block.test.ts](tests/addons/separator-block.test.ts) | 1 |
| [addons/slider-block.cy.ts](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/addons/slider-block.cy.ts) | [tests/addons/slider-block.test.ts](tests/addons/slider-block.test.ts) | 3 |
| [core/basic/FileWidget.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/FileWidget.js) | [tests/core/basic/FileWidget.test.ts](tests/core/basic/FileWidget.test.ts) | 1 |
| [core/basic/actions.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/actions.js) | [tests/core/basic/actions.test.ts](tests/core/basic/actions.test.ts) | 4 |
| [core/basic/aliasesContext.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/aliasesContext.js) | [tests/core/basic/aliasesContext.test.ts](tests/core/basic/aliasesContext.test.ts) | 1 |
| [core/basic/autologin.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/autologin.js) | [tests/core/basic/autologin.test.ts](tests/core/basic/autologin.test.ts) | 1 |
| [core/basic/deleteItemModal.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/deleteItemModal.js) | [tests/core/basic/deleteItemModal.test.ts](tests/core/basic/deleteItemModal.test.ts) | 11 |
| [core/basic/folder-contents.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/folder-contents.js) | [tests/core/basic/folder-contents.test.ts](tests/core/basic/folder-contents.test.ts) | 8 |
| [core/basic/form-undo.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/form-undo.js) | [tests/core/basic/form-undo.test.ts](tests/core/basic/form-undo.test.ts) | 1 |
| [core/basic/history.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/history.js) | [tests/core/basic/history.test.ts](tests/core/basic/history.test.ts) | 1 |
| [core/basic/linkIntegrityView.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/linkIntegrityView.js) | [tests/core/basic/linkIntegrityView.test.ts](tests/core/basic/linkIntegrityView.test.ts) | 12 |
| [core/basic/locking.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/locking.js) | [tests/core/basic/locking.test.ts](tests/core/basic/locking.test.ts) | 3 |
| [core/basic/login.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/login.js) | [tests/core/basic/login.test.ts](tests/core/basic/login.test.ts) | 1 |
| [core/basic/logout.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/logout.js) | [tests/core/basic/logout.test.ts](tests/core/basic/logout.test.ts) | 1 |
| [core/basic/metadata.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/metadata.js) | [tests/core/basic/metadata.test.ts](tests/core/basic/metadata.test.ts) | 3 |
| [core/basic/navigation.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/navigation.js) | [tests/core/basic/navigation.test.ts](tests/core/basic/navigation.test.ts) | 3 |
| [core/basic/objectBrowser.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/objectBrowser.js) | [tests/core/basic/objectBrowser.test.ts](tests/core/basic/objectBrowser.test.ts) | 4 |
| [core/basic/recurrence-widget.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/recurrence-widget.js) | [tests/core/basic/recurrence-widget.test.ts](tests/core/basic/recurrence-widget.test.ts) | 6 |
| [core/basic/search.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/search.js) | [tests/core/basic/search.test.ts](tests/core/basic/search.test.ts) | 3 |
| [core/basic/set-registry.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/set-registry.js) | [tests/core/basic/set-registry.test.ts](tests/core/basic/set-registry.test.ts) | 1 |
| [core/basic/sharing.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/sharing.js) | [tests/core/basic/sharing.test.ts](tests/core/basic/sharing.test.ts) | 3 |
| [core/basic/workflow.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/basic/workflow.js) | [tests/core/basic/workflow.test.ts](tests/core/basic/workflow.test.ts) | 1 |
| [core/blocks/block-carousel.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/block-carousel.js) | [tests/core/blocks/block-carousel.test.ts](tests/core/blocks/block-carousel.test.ts) | 1 |
| [core/blocks/blocks-autofocus.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-autofocus.js) | [tests/core/blocks/blocks-autofocus.test.ts](tests/core/blocks/blocks-autofocus.test.ts) | 7 |
| [core/blocks/blocks-banner.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-banner.js) | [tests/core/blocks/blocks-banner.test.ts](tests/core/blocks/blocks-banner.test.ts) | 2 |
| [core/blocks/blocks-chooser.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-chooser.js) | [tests/core/blocks/blocks-chooser.test.ts](tests/core/blocks/blocks-chooser.test.ts) | 2 |
| [core/blocks/blocks-copypaste.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-copypaste.js) | [tests/core/blocks/blocks-copypaste.test.ts](tests/core/blocks/blocks-copypaste.test.ts) | 3 |
| [core/blocks/blocks-grid.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-grid.js) | [tests/core/blocks/blocks-grid.test.ts](tests/core/blocks/blocks-grid.test.ts) | 2 |
| [core/blocks/blocks-image.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-image.js) | [tests/core/blocks/blocks-image.test.ts](tests/core/blocks/blocks-image.test.ts) | 11 |
| [core/blocks/blocks-indexing.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-indexing.js) | [tests/core/blocks/blocks-indexing.test.ts](tests/core/blocks/blocks-indexing.test.ts) | 1 |
| [core/blocks/blocks-map.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-map.js) | [tests/core/blocks/blocks-map.test.ts](tests/core/blocks/blocks-map.test.ts) | 8 |
| [core/blocks/blocks-slate.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-slate.js) | [tests/core/blocks/blocks-slate.test.ts](tests/core/blocks/blocks-slate.test.ts) | 1 |
| [core/blocks/blocks-table.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-table.js) | [tests/core/blocks/blocks-table.test.ts](tests/core/blocks/blocks-table.test.ts) | 1 |
| [core/blocks/blocks-teaser.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-teaser.js) | [tests/core/blocks/blocks-teaser.test.ts](tests/core/blocks/blocks-teaser.test.ts) | 4 |
| [core/blocks/blocks-text.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-text.js) | [tests/core/blocks/blocks-text.test.ts](tests/core/blocks/blocks-text.test.ts) | 3 |
| [core/blocks/blocks-title.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-title.js) | [tests/core/blocks/blocks-title.test.ts](tests/core/blocks/blocks-title.test.ts) | 1 |
| [core/blocks/blocks-video.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks-video.js) | [tests/core/blocks/blocks-video.test.ts](tests/core/blocks/blocks-video.test.ts) | 10 |
| [core/blocks/blocks.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/blocks.js) | [tests/core/blocks/blocks.test.ts](tests/core/blocks/blocks.test.ts) | 1 |
| [core/blocks/enter-key-focused-blocks.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/enter-key-focused-blocks.cy.js) | [tests/core/blocks/enter-key-focused-blocks.test.ts](tests/core/blocks/enter-key-focused-blocks.test.ts) | 17 |
| [core/blocks/enter-key-special-blocks.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks/enter-key-special-blocks.cy.js) | [tests/core/blocks/enter-key-special-blocks.test.ts](tests/core/blocks/enter-key-special-blocks.test.ts) | 3 |
| [core/blocks-listing/blocks-listing-templates.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks-listing/blocks-listing-templates.js) | [tests/core/blocks-listing/blocks-listing-templates.test.ts](tests/core/blocks-listing/blocks-listing-templates.test.ts) | 4 |
| [core/blocks-listing/blocks-listing.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks-listing/blocks-listing.js) | [tests/core/blocks-listing/blocks-listing.test.ts](tests/core/blocks-listing/blocks-listing.test.ts) | 17 |
| [core/blocks-listing/blocks-search.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/blocks-listing/blocks-search.js) | [tests/core/blocks-listing/blocks-search.test.ts](tests/core/blocks-listing/blocks-search.test.ts) | 5 |
| [core/content/content.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/content/content.js) | [tests/core/content/content.test.ts](tests/core/content/content.test.ts) | 9 |
| [core/content/createContent.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/content/createContent.js) | [tests/core/content/createContent.test.ts](tests/core/content/createContent.test.ts) | 6 |
| [core/content/delete.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/core/content/delete.js) | [tests/core/content/delete.test.ts](tests/core/content/delete.test.ts) | 1 |
| [main/Grid/image.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/Grid/image.cy.js) | [tests/main/Grid/image.test.ts](tests/main/Grid/image.test.ts) | 2 |
| [main/basic.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/basic.cy.js) | [tests/main/basic.test.ts](tests/main/basic.test.ts) | 2 |
| [main/blocks-calendar.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/blocks-calendar.cy.js) | [tests/main/blocks-calendar.test.ts](tests/main/blocks-calendar.test.ts) | 9 |
| [main/blocks-map.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/blocks-map.cy.js) | [tests/main/blocks-map.test.ts](tests/main/blocks-map.test.ts) | 2 |
| [main/blocks-slider-variant.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/blocks-slider-variant.js) | [tests/main/blocks-slider-variant.test.ts](tests/main/blocks-slider-variant.test.ts) | 2 |
| [main/blocks-table.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/blocks-table.cy.js) | [tests/main/blocks-table.test.ts](tests/main/blocks-table.test.ts) | 1 |
| [main/blocks-teaser-types.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/blocks-teaser-types.js) | [tests/main/blocks-teaser-types.test.ts](tests/main/blocks-teaser-types.test.ts) | 4 |
| [main/listing-grid.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/listing-grid.cy.js) | [tests/main/listing-grid.test.ts](tests/main/listing-grid.test.ts) | 1 |
| [main/nav.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/nav.cy.js) | [tests/main/nav.test.ts](tests/main/nav.test.ts) | 3 |
| [main/site-action.cy.js](https://github.com/kitconcept/volto-light-theme/blob/66de7a79/frontend/cypress/tests/main/site-action.cy.js) | [tests/main/site-action.test.ts](tests/main/site-action.test.ts) | 1 |
