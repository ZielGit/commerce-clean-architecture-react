import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../../../../src/presentation/components/products/ProductCard/ProductCard';
import { Product } from '../../../../src/domain/entities/Product';
import { Money } from '../../../../src/domain/valueObjects/Money';

// Mock de react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ProductCard', () => {
  const mockProduct = new Product(
    '1',
    'Laptop Gaming',
    new Money(999.99, 'USD'),
    10,
    true,
    new Date()
  );

  const mockHandlers = {
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it('should render product name', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />);
    expect(screen.getByText('Laptop Gaming')).toBeInTheDocument();
  });

  it('should render formatted price', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />);
    expect(screen.getByText('$999.99')).toBeInTheDocument();
  });

  it('should call onView when view button is clicked', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />);
    fireEvent.click(screen.getByText('common.view'));
    expect(mockHandlers.onView).toHaveBeenCalledWith('1');
  });

  it('should call onEdit when edit button is clicked', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />);
    fireEvent.click(screen.getByText('common.edit'));
    expect(mockHandlers.onEdit).toHaveBeenCalledWith('1');
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />);
    fireEvent.click(screen.getByText('common.delete'));
    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
  });

  it('should show out of stock badge when stock is 0', () => {
    const outOfStockProduct = new Product(
      '2',
      'Mouse',
      new Money(29.99, 'USD'),
      0,
      true,
      new Date()
    );

    render(<ProductCard product={outOfStockProduct} {...mockHandlers} />);
    expect(screen.getByText('products.outOfStock')).toBeInTheDocument();
  });
});
