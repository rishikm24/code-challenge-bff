import { CartItem } from './types'

export interface PricingRule {
    apply(cart: CartItem[], rawTotal: number): number;
    priority?: number;
}