import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import TeaserDefaultTemplate from './DefaultBody';

const mockStore = configureStore();

describe('TeaserDefaultTemplate', () => {
  it('renders markdown links inside the description', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TeaserDefaultTemplate
            className=""
            data={{
              href: [
                {
                  '@id': '/news',
                },
              ],
              preview_image: [],
              title: 'News',
              description: 'Read the [Portal](/portal) updates',
              overwrite: true,
            }}
            isEditMode={false}
          />
        </MemoryRouter>
      </Provider>,
    );

    const link = screen.getByRole('link', { name: 'Portal' });
    expect(link.getAttribute('href')).toBe('/portal');

    const mainLink = screen.getByRole('link', { name: 'News' });
    expect(mainLink.getAttribute('href')).toBe('/news');
  });
});
