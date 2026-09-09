import { FileText } from "lucide-react";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { INVOICE_STATUSES } from "../../types";
import { Badge } from "@/components/ui/badge";

export function WizardHeader() {
  const { invoiceData } = useInvoiceStore();

  return (
    <div className="flex flex-col gap-2 pb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">إنشاء فاتورة جديدة</h1>
        
        {/* Draft Badge */}
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 text-sm">
          <FileText className="w-4 h-4" />
          {invoiceData.status === INVOICE_STATUSES.DRAFT ? "مسودة" : invoiceData.status}
        </Badge>
      </div>
      
      <p className="text-gray-500">
        الرجاء إدخال البيانات الأساسية للفاتورة قبل المتابعة لإضافة العناصر.
      </p>
    </div>
  );
}
