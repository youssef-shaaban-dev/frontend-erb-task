"use client";

import { WizardHeader } from "./WizardHeader";
import { WizardStepper } from "./WizardStepper";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { Button } from "@/components/ui/button";
import { Step1Form } from "./Step1Form";

export function InvoiceWizard() {
  const { currentStep, prevStep, nextStep } = useInvoiceStore();

  return (
    <div className="w-full">
      <WizardHeader />
      
      <div className="mb-8">
        <WizardStepper />
      </div>

      {/* Step Content Wrapper (The Card) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 min-h-100">
        
        {currentStep === 1 && <Step1Form />}
        {currentStep > 1 && (
          <div className="flex items-center justify-center h-full text-muted-foreground border-2 border-dashed border-border rounded-lg p-12">
            محتوى الخطوة رقم {currentStep} سيتم إضافته هنا
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {
            currentStep > 1 && 
            <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
          >
            السابق
          </Button>
          }

          <div className={`flex gap-3 w-full ${
            currentStep > 1 ? "justify-between" : "justify-end"
          }`}>
            <Button variant="outline">
              إلغاء
            </Button>
            <Button onClick={nextStep}>
              {currentStep === 4 ? "إصدار الفاتورة" : "الخطوة التالية"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
