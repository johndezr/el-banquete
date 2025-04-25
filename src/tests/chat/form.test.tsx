import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '@/components/chat/form';

describe('Form', () => {
  const mockHandleInputChange = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    input: '',
    handleInputChange: mockHandleInputChange,
    onSubmit: mockOnSubmit,
    isLoading: false,
  };

  it('should render form with input and button', () => {
    render(<Form {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type a message');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call handleInputChange when input value changes', () => {
    render(<Form {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type a message');
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit when form is submitted', () => {
    render(<Form {...defaultProps} />);

    const form = screen.getByTestId('chat-form');
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should disable input and button when isLoading is true', () => {
    render(<Form {...defaultProps} isLoading />);

    const input = screen.getByPlaceholderText('Type a message');
    const button = screen.getByRole('button');

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
