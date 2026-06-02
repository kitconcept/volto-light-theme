// Shared helpers for the block styling testing

// The alignment / block width widgets are
// radio button groups whose inputs are visually hidden, so clicks are forced.
export const pickSidebarButton = (label) => {
  cy.get(`#sidebar .buttons-widget-option input[aria-label="${label}"]`).click({
    force: true,
  });
};

// Saves the current page and waits for the PATCH and the content GET to settle.
// Requires the `@save` (PATCH) and `@content` (GET) intercepts to be aliased.
export const save = () => {
  cy.get('#toolbar-save').click();
  cy.wait('@save');
  cy.wait('@content');
};

// Reads the `--block-alignment` / `--block-width` custom properties straight off
// the inline style so the assertion is independent of how the browser
// serializes the `style` attribute.
export const assertBlockStyle = (selector, { alignment, width }) => {
  cy.get(selector).should(($el) => {
    const { style } = $el[0];
    if (alignment) {
      expect(style.getPropertyValue('--block-alignment').trim()).to.eq(
        alignment,
      );
    }
    if (width) {
      expect(style.getPropertyValue('--block-width').trim()).to.eq(width);
    }
  });
};
