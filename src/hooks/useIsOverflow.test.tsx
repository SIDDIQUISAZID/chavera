import React from 'react';
import { render, screen } from '@testing-library/react';

import { useIsOverflow } from './useIsOverflow';

describe('useIsOverflow', () => {
  test('should detect overflow correctly', () => {
    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      const isOverflow = useIsOverflow(ref);

      return (
        <div ref={ref} style={{ width: '100px', height: '100px', overflow: isOverflow ? 'scroll' : 'hidden' }}>
          Content
        </div>
      );
    };

    render(<TestComponent />);

    // Assert that the initial state of isOverflow is false
    expect(screen.getByText('Content')).toHaveStyle('overflow: hidden');

    // Change the size of the element to make it overflow
    const container = screen.getByText('Content');
    container.style.width = '200px';
    container.style.height = '200px';
    container.style.overflow = "scroll";

    // Assert that isOverflow is updated to true
    expect(screen.getByText('Content')).toHaveStyle('overflow: scroll');
  });
});
