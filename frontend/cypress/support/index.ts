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
      bodyModifier,
      preview_image_link,
    }: {
      contentType: string;
      contentId: string;
      contentTitle: string;
      path?: string;
      bodyModifier?: (body: any) => any;
      preview_image_link?: { '@id': string };
    }): Chainable<JQuery<HTMLElement>>;
    addNewBlock(value: string): Chainable<JQuery<HTMLElement>>;
    matchImage(): Chainable<JQuery<HTMLElement>>;
    injectAxe({
      axeCorePath,
    }: {
      axeCorePath: string;
    }): Chainable<JQuery<HTMLElement>>;
    checkA11y(
      context?: Object | string,
      options?: Object,
      violationCallback?: (violations: any[]) => void,
      skipFailures?: boolean,
    ): Chainable<JQuery<HTMLElement>>;
    checkAccessibility(): Chainable<JQuery<HTMLElement>>;
    getSlate(): Chainable<JQuery<HTMLElement>>;
  }
}
