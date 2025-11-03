import React, { type FC } from 'react';
import { render, screen } from '@testing-library/react';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

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

  it('renders fallback UI when a child throws', () => {
    const ThrowError: FC = () => {
      throw new Error('Test');
    };

    const { container } = render(
      <ErrorBoundary
        name="test"
        block="123"
        type="hero"
        blocks={null}
        blocksLayout={null}
        title={null}
      >
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Block error:')).toBeInTheDocument();
    expect(
      container.querySelector('.block-error-boundary .title'),
    ).toBeInTheDocument();
  });
});
