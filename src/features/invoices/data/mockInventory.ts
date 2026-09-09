export interface Product {
  id: string;
  name: string;
  price: number;
  availableStock: number;
  taxPercent: number;
}

export const mockInventory: Product[] = [
  {
    id: "ITM-001",
    name: "أجهزة حاسب آلي",
    price: 3500.00,
    availableStock: 3,
    taxPercent: 15,
  },
  {
    id: "ITM-002",
    name: "تراخيص برمجيات",
    price: 1200.00,
    availableStock: 50,
    taxPercent: 15,
  },
  {
    id: "ITM-003",
    name: "خدمات دعم فني (ساعة)",
    price: 150.00,
    availableStock: 999, // unlimited essentially
    taxPercent: 15,
  },
  {
    id: "ITM-004",
    name: "خوادم شبكات",
    price: 12000.00,
    availableStock: 1,
    taxPercent: 15,
  },
];
