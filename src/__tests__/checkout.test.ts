import { Checkout } from '../checkout';
import { ThreeForTwoRule } from '../rules/threeForTwo';
import { CATALOG } from '../catalog';
import { BulkDiscountRule } from '../rules/bulkDiscount';

describe('Checkout extended scenarios', () => {
  test('Should charge for 2 Apple TVs instead of 3', () => {
    const rules = [new ThreeForTwoRule('atv')];
    const co = new Checkout(rules);
    co.scan('atv'); co.scan('atv'); co.scan('atv');
    expect(co.total()).toBe(Number((CATALOG['atv'].price * 2).toFixed(2)));
  });

  test('Should charge for 4 Apple TVs instead of 6', () => {
    const rules = [new ThreeForTwoRule('atv')];
    const co = new Checkout(rules);
    for (let i = 0; i < 6; i++)  co.scan('atv');
    expect(co.total()).toBe(Number((CATALOG['atv'].price * 4).toFixed(2)));
  });

  test('Should charge for 2 Apple TVs when buying 2', () => {
    const rules = [new ThreeForTwoRule('atv')];
    const co = new Checkout(rules);
    for (let i = 0; i < 2; i++)  co.scan('atv');
    expect(co.total()).toBe(Number((CATALOG['atv'].price * 2).toFixed(2)));
  });

  test('Should charge $499.99 per Super iPad when buying > 4', () => {
    const rules = [new BulkDiscountRule('ipd', 5, 499.99)];
    const co = new Checkout(rules);
    for (let i = 0; i < 5; i++) co.scan('ipd');
    expect(co.total()).toBe(Number((5 * 499.99).toFixed(2)));
  });
});
