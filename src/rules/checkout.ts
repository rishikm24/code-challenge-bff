import { CATALOG } from "./catalog";
import { PricingRule } from "./pricing-rule";
import { SKU } from "./types";

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
}