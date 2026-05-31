import { describe, it, expect } from 'vitest';
import {
  calculateBillableHourlyRate,
  computeVerdict,
  VERDICT_LIMIT_MARGIN_PCT,
} from './pricing';

describe('calculateBillableHourlyRate', () => {
  it('applies the net-margin formula cost / (1 - margin/100)', () => {
    // 30,68 € de coût à 23,08 % de marge nette ≈ 39,89 €/h
    expect(calculateBillableHourlyRate(30.68, 23.08)).toBeCloseTo(39.89, 1);
  });

  it('returns the cost unchanged when margin is 0', () => {
    expect(calculateBillableHourlyRate(42, 0)).toBe(42);
  });

  it('guards against margin >= 100 by returning the raw cost', () => {
    expect(calculateBillableHourlyRate(50, 100)).toBe(50);
    expect(calculateBillableHourlyRate(50, 150)).toBe(50);
  });

  it('returns 0 for non-positive or non-finite cost', () => {
    expect(calculateBillableHourlyRate(0, 23.08)).toBe(0);
    expect(calculateBillableHourlyRate(-10, 23.08)).toBe(0);
    expect(calculateBillableHourlyRate(Number.NaN, 23.08)).toBe(0);
  });

  it('doubles the price at 50 % margin', () => {
    expect(calculateBillableHourlyRate(100, 50)).toBeCloseTo(200, 6);
  });
});

describe('coefficient <-> net-margin equivalence', () => {
  // Coefficient 1,30 = +30 % markup-on-cost = 23,0769 % de marge nette.
  const COEF = 1.3;
  const cost = 100;

  it('coefficient 1.30 yields ~23.08 % net margin', () => {
    const price = cost * COEF;
    const netMargin = ((price - cost) / price) * 100;
    expect(netMargin).toBeCloseTo(23.0769, 3);
  });

  it('billable rate at 23.08 % margin reproduces the 1.30 coefficient', () => {
    const rate = calculateBillableHourlyRate(cost, 23.0769);
    expect(rate / cost).toBeCloseTo(COEF, 4);
  });
});

describe('computeVerdict', () => {
  it('returns "perte" when direct costs exceed the estimated price', () => {
    expect(computeVerdict(10, 1000, 1100)).toBe('perte');
  });

  it('returns "limite" just below the 14.5 % threshold', () => {
    // marge 14 % < 14,5 %, et prix > coûts → limite
    expect(computeVerdict(14, 1000, 860)).toBe('limite');
    expect(computeVerdict(VERDICT_LIMIT_MARGIN_PCT - 0.01, 1000, 855)).toBe('limite');
  });

  it('returns "rentable" at or above the 14.5 % threshold', () => {
    expect(computeVerdict(VERDICT_LIMIT_MARGIN_PCT, 1000, 855)).toBe('rentable');
    expect(computeVerdict(23.08, 1000, 770)).toBe('rentable');
  });

  it('exposes the limit threshold as 14.5 %', () => {
    expect(VERDICT_LIMIT_MARGIN_PCT).toBe(14.5);
  });
});
