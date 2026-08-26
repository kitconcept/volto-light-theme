import type { APIRequestContext, Page } from '@playwright/test';

export type RequestOptions = {
  apiURL?: string;
  username?: string;
  password?: string;
};

export type CreateContentParams = {
  contentType: string;
  contentId: string;
  contentTitle: string;
  contentDescription?: string;
  path?: string;
  allow_discussion?: boolean;
  transition?: string;
  bodyModifier?: (body: Record<string, unknown>) => Record<string, unknown>;
};

function getRequestContext(requestOrPage: APIRequestContext | Page) {
  if ('request' in requestOrPage) return requestOrPage.request;
  return requestOrPage;
}

function getDefaultApiConfig(options: RequestOptions) {
  const hostname = process.env.BACKEND_HOST || '127.0.0.1';
  const siteId = process.env.SITE_ID || 'plone';

  const apiURL =
    options.apiURL ||
    process.env.API_PATH ||
    `http://${hostname}:55001/${siteId}`;

  const username = options.username || 'admin';
  const password = options.password || 'secret';

  return { apiURL, username, password };
}

function basicAuthHeader(username: string, password: string) {
  const token = Buffer.from(`${username}:${password}`, 'utf8').toString(
    'base64',
  );
  return `Basic ${token}`;
}

function normalizePath(value?: string) {
  if (!value) return '';
  return value.replace(/^\/+/, '').replace(/\/+$/, '');
}

/**
 * Creates content through the REST API (same behavior as cy.createContent).
 * Content types that support blocks get a default title + slate scaffold,
 * which can be overridden through `bodyModifier`.
 */
export async function createContent(
  requestOrPage: APIRequestContext | Page,
  {
    contentType,
    contentId,
    contentTitle,
    contentDescription = '',
    path = '',
    allow_discussion = false,
    transition = '',
    bodyModifier = (body) => body,
  }: CreateContentParams,
  requestOptions: RequestOptions = {},
) {
  const request = getRequestContext(requestOrPage);
  const { apiURL, username, password } = getDefaultApiConfig(requestOptions);

  const authHeader = basicAuthHeader(username, password);
  const normalizedPath = normalizePath(path);
  const containerUrl = `${apiURL}/${normalizedPath}`;

  const defaultBody: Record<string, unknown> = {
    '@type': contentType,
    id: contentId,
    title: contentTitle,
    description: contentDescription,
    allow_discussion,
  };

  let body: Record<string, unknown>;

  if (['Document', 'News Item', 'Folder'].includes(contentType)) {
    body = bodyModifier({
      ...defaultBody,
      blocks: {
        'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
        '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'slate' },
      },
      blocks_layout: {
        items: [
          'd3f1c443-583f-4e8e-a682-3bf25752a300',
          '7624cf59-05d0-4055-8f55-5fd6597d84b0',
        ],
      },
    });
  } else {
    body = bodyModifier(defaultBody);
  }

  const response = await request.post(containerUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    data: body,
  });

  if (!response.ok()) {
    throw new Error(
      `Create content failed: POST ${containerUrl} returned ${response.status()} ${response.statusText()}`,
    );
  }

  if (transition) {
    const normalizedId = normalizePath(contentId);
    const url = `${apiURL}/${normalizedPath}/${normalizedId}/@workflow/${transition}`;

    const transitionResponse = await request.post(url, {
      headers: {
        Accept: 'application/json',
        Authorization: authHeader,
      },
    });

    if (!transitionResponse.ok()) {
      throw new Error(
        `Workflow transition failed: POST ${url} returned ${transitionResponse.status()} ${transitionResponse.statusText()}`,
      );
    }
  }

  return response;
}
