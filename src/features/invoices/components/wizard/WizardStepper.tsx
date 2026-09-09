import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { shouldSkipStep } from "../../engine/ruleEngine";

const ALL_STEPS = [
  { id: 1, label: "البيانات الأساسية" },
  { id: 2, label: "بنود الفاتورة" },
  { id: 3, label: "التكلفة و الاعتماد" },
  { id: 4, label: "المراجعة والإصدار" },
];

export function WizardStepper() {
  const { currentStep, invoiceData } = useInvoiceStore();

  // Filter out skipped steps
  const visibleSteps = ALL_STEPS.filter((step) => {
    if (step.id === 3 && shouldSkipStep("cost-approval", invoiceData)) {
      return false;
    }
    return true;
  });

  const currentIndex = visibleSteps.findIndex((s) => s.id === currentStep);
  const progressPercentage = visibleSteps.length > 1
    ? (currentIndex / (visibleSteps.length - 1)) * 100
    : 0;

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
        
        {/* Progress Line (Active) */}
        <div 
          className="absolute top-1/2 right-0 h-0.5 bg-primary transition-all duration-300 ease-in-out -translate-y-1/2 z-0"
          style={{ width: `${progressPercentage}%` }}
        />

        {visibleSteps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-[#f9fafb] px-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300",
                  isCompleted || isActive
                    ? "bg-[#0b3c7c] text-white shadow-sm"
                    : "bg-[#e5e7eb] text-gray-500"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-[#0b3c7c]" : isCompleted ? "text-gray-900" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
