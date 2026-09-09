import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { InvoiceStore, InvoiceData, INVOICE_STATUSES, INVOICE_TYPES } from "../types";
import { shouldSkipStep } from "../engine/ruleEngine";

const INITIAL_INVOICE_DATA: Partial<InvoiceData> = {
  status: INVOICE_STATUSES.DRAFT,
  items: [],
  type: INVOICE_TYPES.CASH,
};

export const useInvoiceStore = create<InvoiceStore>()(
  devtools(
    (set) => ({
      // Initial State
      currentStep: 1,
      totalSteps: 4,
      invoiceData: INITIAL_INVOICE_DATA,
      isSaving: false,
      saveError: null,
      lastSavedAt: null,

      // Actions
      setStep: (step) => set({ currentStep: step }, false, "invoice/setStep"),
      
      nextStep: () =>
        set(
          (state) => {
            let next = Math.min(state.currentStep + 1, state.totalSteps);
            // Skip Step 3 if rule engine says so
            if (next === 3 && shouldSkipStep("cost-approval", state.invoiceData)) {
              next = 4;
            }
            return { currentStep: next };
          },
          false,
          "invoice/nextStep"
        ),
        
      prevStep: () =>
        set(
          (state) => {
            let prev = Math.max(state.currentStep - 1, 1);
            // Skip Step 3 backwards if rule engine says so
            if (prev === 3 && shouldSkipStep("cost-approval", state.invoiceData)) {
              prev = 2;
            }
            return { currentStep: prev };
          },
          false,
          "invoice/prevStep"
        ),
        
      updateInvoiceData: (data) =>
        set(
          (state) => ({
            invoiceData: { ...state.invoiceData, ...data },
          }),
          false,
          "invoice/updateData"
        ),
        
      setSavingStatus: (isSaving, error = null) =>
        set(
          () => ({
            isSaving,
            saveError: error,
            lastSavedAt: !isSaving && !error ? new Date() : null, // Update timestamp only on success
          }),
          false,
          "invoice/setSavingStatus"
        ),
        
      resetWizard: () =>
        set(
          {
            currentStep: 1,
            invoiceData: INITIAL_INVOICE_DATA,
            isSaving: false,
            saveError: null,
            lastSavedAt: null,
          },
          false,
          "invoice/reset"
        ),
    }),
    { name: "InvoiceWizardStore" }
  )
);
