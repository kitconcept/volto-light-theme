import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Caption from './Caption';

describe('Caption', () => {
  it('renders title, description lines, and credits', () => {
    const { container } = render(
      <Caption
        title="My image"
        description={'First line\n\nThird line'}
        credit="Photo: Someone"
      />,
    );

    expect(screen.getByText('My image')).toBeInTheDocument();
    const paragraphs = Array.from(
      container.querySelectorAll('.description p'),
    ).map((node) => node.textContent);
    expect(paragraphs).toEqual(['First line', '\u00A0', 'Third line']);
    expect(screen.getByText('Photo: Someone')).toHaveClass('credits');
  });

  it('allows configuring the wrapper tag', () => {
    const { container } = render(<Caption as="div" title="Custom tag" />);
    const wrapper = container.querySelector('div');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.tagName).toBe('DIV');
  });
});
