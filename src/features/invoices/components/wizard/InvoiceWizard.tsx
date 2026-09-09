"use client";

import { WizardHeader } from "./WizardHeader";
import { WizardStepper } from "./WizardStepper";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { Button } from "@/components/ui/button";
import { Step1Form } from "./Step1Form";
import { Step2Form } from "./Step2Form";
import { Step3Form } from "./Step3Form";
import { Step4Review } from "./Step4Review";

export function InvoiceWizard() {
  const { currentStep, prevStep, nextStep } = useInvoiceStore();

  return (
    <div className="w-full">
      <WizardHeader />
      
      <div className="mb-8">
        <WizardStepper />
      </div>

      {/* Step Content Wrapper (The Card) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 min-h-100 relative">
        
        {/* Status Badge from Figma */}
        {currentStep === 4 && (
          <div className="absolute top-8 left-8 flex items-center gap-2 px-3 py-1 bg-muted/30 border border-border rounded-full text-xs font-medium text-foreground">
            <div className="w-2 h-2 rounded-full bg-primary" />
            قيد الاعتماد
          </div>
        )}

        <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {currentStep === 1 && <Step1Form />}
          {currentStep === 2 && <Step2Form />}
          {currentStep === 3 && <Step3Form />}
          {currentStep === 4 && <Step4Review />}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div>
            {currentStep > 1 && (
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="bg-muted/30 text-muted-foreground border-border/50"
              >
                السابق
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {currentStep < 4 && (
              <Button variant="outline">
                إلغاء
              </Button>
            )}
            
            <Button 
              type={currentStep <= 3 ? "submit" : "button"}
              form={currentStep <= 3 ? `step${currentStep}-form` : undefined}
              onClick={currentStep === 4 ? () => alert("تم إصدار الفاتورة بنجاح!") : undefined}
              className={currentStep === 4 ? "bg-[#003B95] hover:bg-[#003B95]/90 text-white font-medium px-6" : ""}
            >
              {currentStep === 4 ? "إصدار الفاتورة" : "الخطوة التالية"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
