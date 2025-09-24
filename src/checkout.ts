import { CATALOG } from "./catalog";
import { PricingRule } from "./pricing-rule";
import { SKU } from "./types";
import { CartItem } from "./types";

export class Checkout {
    private cart: Map<string, number> = new Map()
    private rules: PricingRule[] = [];
    constructor(rules: PricingRule[] = []) {
        this.rules = rules.slice().sort((a, b) => ((a.priority || 0) - (b.priority || 0)));
    }

    scan(sku: SKU) {
        if (!CATALOG[sku]) throw new Error(`Unknown SKU ${sku}`);
        this.cart.set(sku, (this.cart.get(sku) || 0) + 1);
    }

    items() {
        let items: CartItem[] = []
        for (let [sku, qty] of this.cart) {
            items.push({ sku, qty })
        }
        return items
    }

    rawTotal() {
        let total = 0;
        for (const [sku, qty] of this.cart) {
            total += CATALOG[sku].price * qty;
        }
        return Number(total.toFixed(2));
    }

    total() {
        const cartItems: CartItem[] = this.items();
        const raw = this.rawTotal();
        let totalDiscount = 0;
        for (const rule of this.rules) {
            const discount = rule.apply(cartItems, raw - totalDiscount);
            if (discount && Number.isFinite(discount)) {
                totalDiscount += discount;
            }

        }
        const finalTotal = Math.max(0, raw - totalDiscount);
        return Number(finalTotal.toFixed(2));
    }
}
