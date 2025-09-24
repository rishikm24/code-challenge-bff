import { PricingRule } from '../pricing-rule';
import { CartItem } from '../types';
import { CATALOG } from '../catalog';

export class ThreeForTwoRule implements PricingRule {
  sku: string;
  priority?: number;
  constructor(sku: string) {
    this.sku = sku;
    this.priority = 1;
  }
  apply(cart: CartItem[], rawTotal: number): number {
    const item = cart.find(c => c.sku === this.sku);
    if (!item) return 0;
    const freeUnits = Math.floor(item.qty / 3);
    const unitPrice = CATALOG[this.sku].price;
    return freeUnits * unitPrice;
  }
}