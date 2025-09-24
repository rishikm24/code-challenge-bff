export type SKU = 'ipd' | 'mbp' | 'atv' | 'vga' | string;

export interface Product {
    sku: SKU;
    name: string;
    price: number;
}

export interface CartItem {
    sku: SKU;
    qty: number;
}