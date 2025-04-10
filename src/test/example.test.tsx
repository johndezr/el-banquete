import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should render a component', () => {
    const { screen } = render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
