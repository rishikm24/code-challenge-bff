import { PricingRule } from '../pricing-rule';
import { CartItem } from '../types';
import { CATALOG } from '../catalog';

export class BulkDiscountRule implements PricingRule {
  sku: string;
  minQty: number;
  discountedPrice: number;
  priority?: number;
  constructor(sku: string, minQty: number, discountedPrice: number) {
    this.sku = sku;
    this.minQty = minQty;
    this.discountedPrice = discountedPrice;
    this.priority = 2;
  }
  apply(cart: CartItem[], rawTotal: number): number {
    const item = cart.find(c => c.sku === this.sku);
    if (!item) return 0;
    if (item.qty >= this.minQty) {
      const original = CATALOG[this.sku].price * item.qty;
      const discounted = this.discountedPrice * item.qty;
      return original - discounted; // amount to subtract from rawTotal
    }
    return 0;
  }
}
