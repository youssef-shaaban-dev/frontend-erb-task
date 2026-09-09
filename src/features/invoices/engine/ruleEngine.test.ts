import { describe, it, expect } from "vitest";
import {  shouldSkipStep, areDynamicFieldsRequired } from "./ruleEngine";
import { INVOICE_TYPES, InvoiceData } from "../types";

describe("Rule Engine", () => {
  describe("Step Visibility (skipWhen)", () => {
    it("should skip cost-approval step when invoice type is Cash", () => {
      const mockInvoiceData: Partial<InvoiceData> = {
        type: INVOICE_TYPES.CASH,
        items: [{
          id: "1",
          itemId: "item-1",
          name: "Test",
          quantity: 1,
          price: 100,
          discount: 0,
          taxPercent: 0,
          availableStock: 100
        }],
      };
      
      const skip = shouldSkipStep("cost-approval", mockInvoiceData);
      expect(skip).toBe(true);
    });

    it("should NOT skip cost-approval step when invoice type is Credit", () => {
      const mockInvoiceData: Partial<InvoiceData> = {
        type: INVOICE_TYPES.CREDIT,
      };
      
      const skip = shouldSkipStep("cost-approval", mockInvoiceData);
      expect(skip).toBe(false);
    });
  });

  describe("Dynamic Fields (requiredWhen)", () => {
    it("should require dynamic fields in cost-approval if total > 50000", () => {
      const mockInvoiceData: Partial<InvoiceData> = {
        items: [{
          id: "1",
          itemId: "item-1",
          name: "Test",
          quantity: 1000,
          price: 100, // Total = 100,000
          discount: 0,
          taxPercent: 0,
          availableStock: 2000
        }],
      };

      const required = areDynamicFieldsRequired("cost-approval", mockInvoiceData);
      expect(required).toBe(true);
    });

    it("should NOT require dynamic fields in cost-approval if total <= 50000", () => {
      const mockInvoiceData: Partial<InvoiceData> = {
        items: [{
          id: "1",
          itemId: "item-1",
          name: "Test",
          quantity: 10,
          price: 100, // Total = 1,000
          discount: 0,
          taxPercent: 0,
          availableStock: 2000
        }],
      };

      const required = areDynamicFieldsRequired("cost-approval", mockInvoiceData);
      expect(required).toBe(false);
    });
  });
});
