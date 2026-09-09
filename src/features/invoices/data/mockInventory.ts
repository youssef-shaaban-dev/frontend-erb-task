export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  availableStock: number;
  taxPercent: number;
}

export const mockInventory: Product[] = [
  {
    id: "ITM-001",
    sku: "LPT-PRO-15",
    name: "جهاز حاسب آلي محمول - فئة الأعمال",
    price: 3450.00,
    availableStock: 45,
    taxPercent: 15,
  },
  {
    id: "ITM-002",
    sku: "PRN-LZ-M2",
    name: "طابعة ليزر متعددة المهام",
    price: 1200.00,
    availableStock: 5,
    taxPercent: 15,
  },
  {
    id: "ITM-003",
    sku: "SRV-RACK-1U",
    name: "خادم شبكات",
    price: 12000.00,
    availableStock: 1,
    taxPercent: 15,
  },
];
