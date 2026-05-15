import type { Page } from '@playwright/test';

export type LoginOptions = {
  apiURL?: string;
  frontendURL?: string;
  username?: string;
  password?: string;
};

const DEFAULT_PLONE_AUTH: [string, string] = ['admin', 'admin'];

function getDefaults(options: LoginOptions) {
  // @ts-ignore
  const hostname = process.env.BACKEND_HOST || '127.0.0.1';
  // @ts-ignore
  const siteId = 'Plone';

  const apiURL =
    options.apiURL ||
    // @ts-ignore
    process.env.API_PATH ||
    `http://${hostname}:8080/${siteId}`;

  const username = options.username || DEFAULT_PLONE_AUTH[0];
  const password = options.password || DEFAULT_PLONE_AUTH[1];

  const frontendURL =
    // @ts-ignore
    options.frontendURL || process.env.FRONTEND_URL || 'http://localhost:3000';

  return { apiURL, username, password, frontendURL };
}

/**
 * Logs in by POSTing to `${apiURL}/@login` and setting the `auth_token`
 * cookie in the current browser context (same behavior as cy.autologin).
 */
export async function login(page: Page, options: LoginOptions = {}) {
  const { apiURL, username, password, frontendURL } = getDefaults(options);

  const response = await page.request.post(`${apiURL}/@login`, {
    headers: { Accept: 'application/json' },
    data: { login: username, password },
  });

  if (!response.ok()) {
    throw new Error(
      `Login failed: POST ${apiURL}/@login returned ${response.status()} ${response.statusText()}`,
    );
  }

  const body = (await response.json()) as { token?: string };
  if (!body.token) {
    throw new Error('Login failed: response did not include body.token');
  }

  await page.context().addCookies([
    {
      name: 'auth_token',
      value: body.token,
      url: frontendURL,
    },
  ]);

  return { token: body.token };
}
