import React, { type FC } from 'react';
import { render, screen } from '@testing-library/react';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-intl-redux';
import { ErrorBoundary } from './ErrorBoundary';
import configureStore from 'redux-mock-store';

describe('Error boundary', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  const mockStore = configureStore();

  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  it('renders fallback UI when a child throws', () => {
    const ThrowError: FC = () => {
      throw new Error('Test');
    };

    const { container } = render(
      <Provider store={store}>
        <ErrorBoundary
          name="test"
          block="123"
          type="slate"
          blocks={null}
          blocksLayout={null}
          title={null}
        >
          <ThrowError />
        </ErrorBoundary>
      </Provider>,
    );

    expect(screen.getByText('Block error:')).toBeInTheDocument();
    expect(
      container.querySelector('.block-error-boundary .title'),
    ).toBeInTheDocument();
  });
});
