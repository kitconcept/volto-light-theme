namespace Cypress {
  export interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    navigate(value: string): Chainable<JQuery<HTMLElement>>;
    getSlateEditorAndType(value: string): Chainable<JQuery<HTMLElement>>;
    setSlateSelection(value: string): Chainable<JQuery<HTMLElement>>;
    clickSlateButton(value: string): Chainable<JQuery<HTMLElement>>;
    autologin(): Chainable<JQuery<HTMLElement>>;
    createContent({
      contentType,
      contentId,
      contentTitle,
      path,
    }: {
      contentType: string;
      contentId: string;
      contentTitle: string;
      path?: string;
    }): Chainable<JQuery<HTMLElement>>;
    addNewBlock(value: string): Chainable<JQuery<HTMLElement>>;
    matchImage(): Chainable<JQuery<HTMLElement>>;
  }
}
