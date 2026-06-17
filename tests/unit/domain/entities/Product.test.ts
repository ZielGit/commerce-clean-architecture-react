import { describe, it, expect } from 'vitest';
import { Product } from '../../../../src/domain/entities/Product';
import { Money } from '../../../../src/domain/valueObjects/Money';
import { DomainException } from '../../../../src/domain/exceptions/DomainException';

describe('Product Entity', () => {
  describe('Constructor', () => {
    it('should create a valid product', () => {
      const money = new Money(999.99, 'USD');
      const product = new Product('1', 'Laptop', money, 10, true, new Date());

      expect(product.id).toBe('1');
      expect(product.name).toBe('Laptop');
      expect(product.price.amount).toBe(999.99);
      expect(product.stock).toBe(10);
      expect(product.isActive).toBe(true);
    });

    it('should throw DomainException for empty name', () => {
      const money = new Money(100, 'USD');

      expect(() => new Product('1', '', money, 10, true, new Date()))
        .toThrow(DomainException);

      expect(() => new Product('1', '', money, 10, true, new Date()))
        .toThrow('Product name cannot be empty');
    });

    it('should throw DomainException for name exceeding 200 characters', () => {
      const money = new Money(100, 'USD');
      const longName = 'A'.repeat(201);

      expect(() => new Product('1', longName, money, 10, true, new Date()))
        .toThrow('Product name cannot exceed 200 characters');
    });

    it('should throw DomainException for negative stock', () => {
      const money = new Money(100, 'USD');

      expect(() => new Product('1', 'Laptop', money, -1, true, new Date()))
        .toThrow('Product stock cannot be negative');
    });
  });

  describe('Factory Method: create()', () => {
    it('should create product with empty id', () => {
      const money = new Money(100, 'USD');
      const product = Product.create('Mouse', money, 5);

      expect(product.id).toBe('');
      expect(product.name).toBe('Mouse');
      expect(product.isActive).toBe(true);
    });
  });

  describe('hasStock()', () => {
    it('should return true when product has stock and is active', () => {
      const product = new Product('1', 'Laptop', new Money(100, 'USD'), 10, true, new Date());
      expect(product.hasStock()).toBe(true);
    });

    it('should return false when product has no stock', () => {
      const product = new Product('1', 'Laptop', new Money(100, 'USD'), 0, true, new Date());
      expect(product.hasStock()).toBe(false);
    });

    it('should return false when product is inactive', () => {
      const product = new Product('1', 'Laptop', new Money(100, 'USD'), 10, false, new Date());
      expect(product.hasStock()).toBe(false);
    });
  });

  describe('hasEnoughStock()', () => {
    it('should return true when stock is sufficient', () => {
      const product = new Product('1', 'Laptop', new Money(100, 'USD'), 10, true, new Date());
      expect(product.hasEnoughStock(5)).toBe(true);
    });

    it('should return false when stock is insufficient', () => {
      const product = new Product('1', 'Laptop', new Money(100, 'USD'), 2, true, new Date());
      expect(product.hasEnoughStock(5)).toBe(false);
    });
  });
});
