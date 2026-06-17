import { describe, it, expect } from 'vitest';
import { Money } from '../../../../src/domain/valueObjects/Money';

describe('Money Value Object', () => {
  describe('Constructor', () => {
    it('should create valid Money', () => {
      const money = new Money(100, 'USD');
      expect(money.amount).toBe(100);
      expect(money.currency).toBe('USD');
    });

    it('should use USD as default currency', () => {
      const money = new Money(100);
      expect(money.currency).toBe('USD');
    });

    it('should throw for negative amount', () => {
      expect(() => new Money(-100, 'USD'))
        .toThrow('Amount cannot be negative');
    });

    it('should throw for invalid currency length', () => {
      expect(() => new Money(100, 'US'))
        .toThrow('Currency must be 3 characters (ISO 4217)');
    });
  });

  describe('format()', () => {
    it('should format USD correctly', () => {
      const money = new Money(999.99, 'USD');
      expect(money.format()).toBe('$999.99');
    });
  });

  describe('equals()', () => {
    it('should return true for equal money', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(100, 'USD');
      expect(money1.equals(money2)).toBe(true);
    });

    it('should return false for different amount', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(200, 'USD');
      expect(money1.equals(money2)).toBe(false);
    });
  });

  describe('add()', () => {
    it('should add two Money objects of same currency', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(50, 'USD');
      const result = money1.add(money2);
      expect(result.amount).toBe(150);
    });

    it('should throw when adding different currencies', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(50, 'EUR');
      expect(() => money1.add(money2))
        .toThrow('Cannot add different currencies');
    });
  });
});
