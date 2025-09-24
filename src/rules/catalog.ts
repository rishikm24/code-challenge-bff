import { Product } from './types';

export const CATALOG: Record<string, Product> = {
    ipd: { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    mbp: { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    atv: { sku: 'atv', name: 'Apple TV', price: 109.50 },
    vga: { sku: 'vga', name: 'VGA adapter', price: 30.00 }
};