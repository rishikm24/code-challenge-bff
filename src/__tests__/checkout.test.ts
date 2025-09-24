import { Checkout } from '../checkout';
import { ThreeForTwoRule } from '../rules/threeForTwo';
import { CATALOG } from '../catalog';

describe('Checkout extended scenarios', () => {
  test('Should charge for 2 Apple TVs instead of 3', () => {
    const rules = [new ThreeForTwoRule('atv')];
    const co = new Checkout(rules);
    co.scan('atv'); co.scan('atv'); co.scan('atv');
    expect(co.total()).toBe(Number((CATALOG['atv'].price * 2).toFixed(2)));
  });
});
