import '@frsource/cypress-plugin-visual-regression-diff/dist/support';

// --
// Visual testing support
// --

Cypress.Commands.add('visualPageLoadingFixes', () => {
  cy.visualPageLoadingFixScrolling();
  cy.visualPageLoadingFixLazyImages();
  cy.visualPageLoadingDisableHovers();
  cy.visualPageLoadingDisableHovers();
  // Since we only run tests in Firefox, hyphenation is enabled now.
  // But if Chrome is a target again, the next line has to be
  // uncommented again, in order to avoid errors caused by the different
  // hyphenation dictionary of Chrome and Firefox.
  // cy.visualPageLoadingDisableHyphenation();
  cy.restrictBrowserToFirefox();
});

Cypress.Commands.add('visualPageLoadingFixesLightTheme', () => {
  cy.visualPageLoadingFixes();
  cy.visualPageLoadingFixStickyHeader();
});

Cypress.Commands.add('visualPageLoadingFixScrolling', () => {
  const log = Cypress.log({
    name: 'log',
    displayName: 'Visual page loading fixes',
  });
  // fix fullPage image repetition caused by 100% height
  // see https://github.com/cypress-io/cypress/issues/2681
  cy.root({ log: false }).then(($app) => {
    return new Cypress.Promise((resolve, reject) => {
      $app.find('html').css('height', 'initial');
      $app.find('body').css('height', 'initial');
      log.set('message', 'Made page scrollable for fullscreen snapshot');
      resolve();
    });
  });
});

Cypress.Commands.add('visualPageLoadingFixLazyImages', () => {
  const log = Cypress.log({
    name: 'log',
    displayName: 'Visual page loading fixes',
  });
  // Eager load lazy loading images. Without this the
  // images would be missing from the screenshot or
  // getting distorted as a result of scrolling.
  cy.root({ log: false }).then(($app) => {
    return new Cypress.Promise((resolve, reject) => {
      $app.find('img[loading="lazy"]').prop('loading', 'eager');
      log.set('message', 'Made lazy images eager loading');
      resolve();
    });
  });
});

Cypress.Commands.add('visualPageLoadingDisableHovers', () => {
  const log = Cypress.log({
    name: 'log',
    displayName: 'Visual page loading fixes',
  });
  // Disable hover effect on images, without this the screenshot
  // will make a difference if running the tests in UI mode and the
  // cursor happens to get in front of the image, triggering the effect.
  cy.root({ log: false }).then(($app) => {
    cy.document().then((doc) => {
      return new Cypress.Promise((resolve, reject) => {
        let $style = doc.createElement('style');
        // Caveat: this would only work if the transform rule is not already important.
        // If that would be the case, project-specific rules have to be added.
        $style.innerHTML = `
          img { transform: none !important; }
          a:hover { text-decoration: none !important; }`;
        doc.head.appendChild($style);
        log.set('message', 'Disabled hover transform effects on images');
        resolve();
      });
    });
  });
});

Cypress.Commands.add('visualPageLoadingDisableHyphenation', () => {
  const log = Cypress.log({
    name: 'log',
    displayName: 'Visual page loading fixes',
  });
  // Disable hyphenation, as it will lead to different results as
  // different browsers use different hyphenation dictionaries.
  cy.root({ log: false }).then(($app) => {
    cy.document().then((doc) => {
      return new Cypress.Promise((resolve, reject) => {
        let $style = doc.createElement('style');
        // Caveat: this would only work if the transform rule is not already important.
        // If that would be the case, project-specific rules have to be added.
        $style.innerHTML = `
          h1, h2, h3, h4, h5, h6, p {
            hyphens: none !important;
            -ms-hyphens: none !important;
            -moz-hyphens: none !important;
            -webkit-hyphens: none !important;
         }`;
        doc.head.appendChild($style);
        log.set('message', 'Disabled hyphenation of titles and paragraphs');
        resolve();
      });
    });
  });
});

Cypress.Commands.add('restrictBrowserToFirefox', () => {
  const log = Cypress.log({
    name: 'log',
    displayName: 'Visual page loading fixes',
  });
  cy.root({ log: false }).then(($app) => {
    cy.document().then((doc) => {
      return new Cypress.Promise((resolve, reject) => {
        if (Cypress.browser.name !== 'firefox') {
          throw new Error(
            `Visual test must be running in Firefox [detected ${Cypress.browser.name}]`,
          );
        }
        log.set('message', 'Browser is Firefox, ok');
        resolve();
      });
    });
  });
});

Cypress.Commands.add('visualPageLoadingFixStickyHeader', () => {
  const log = Cypress.log({
    name: 'log',
    displayName: 'Visual page loading fixes',
  });
  // Disable hyphenation, as it will lead to different results as
  // different browsers use different hyphenation dictionaries.
  cy.root({ log: false }).then(($app) => {
    cy.document().then((doc) => {
      return new Cypress.Promise((resolve, reject) => {
        let $style = doc.createElement('style');
        // Caveat: this would only work if the transform rule is not already important.
        // If that would be the case, project-specific rules have to be added.
        $style.innerHTML = `
          #page-header,
          #toolbar .toolbar-content,
          #toolbar .toolbar
           {
            position: absolute !important;
         }`;
        doc.head.appendChild($style);
        log.set('message', 'Fixed sticky header and toolbar style on dlr.de');
        resolve();
      });
    });
  });
});

Cypress.Commands.overwrite(
  'matchImage',
  (originalFn, el, { skipFixes, ...options } = {}) => {
    if (skipFixes) {
      // skipFixes reverts to the original command without our fixes
      return originalFn(el, options);
    } else {
      //      return cy.visualPageLoadingFixes().then(() => {
      return cy.visualPageLoadingFixesLightTheme().then(() => {
        return originalFn(el, options);
      });
    }
  },
);
