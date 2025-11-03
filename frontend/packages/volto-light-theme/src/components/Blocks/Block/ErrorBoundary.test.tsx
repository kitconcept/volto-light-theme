import React, { type FC } from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('Error boundary', () => {
  const consoleErrorSpy = jest
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

    render(
      <ErrorBoundary name="test" blocks={null} blocksLayout={null} title={null}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('<error: test>')).toBeInTheDocument();
  });
});
