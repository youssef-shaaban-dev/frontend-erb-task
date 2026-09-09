import { z } from "zod";

export const invoiceItemSchema = z.object({
  id: z.string(), 
  itemId: z.string().min(1, "يجب اختيار الصنف"),
  name: z.string(),
  quantity: z.number().min(1, "الكمية يجب أن تكون 1 على الأقل"),
  price: z.number().min(0, "السعر لا يمكن أن يكون سالباً"),
  discount: z.number().min(0, "الخصم لا يمكن أن يكون سالباً"),
  taxPercent: z.number().min(0, "الضريبة لا يمكن أن تكون سالبة"),
  availableStock: z.number().min(0),
});

export const step2Schema = z.object({
  items: z.array(invoiceItemSchema).min(1, "يجب إضافة بند واحد على الأقل للفاتورة"),
});

export type Step2FormValues = z.infer<typeof step2Schema>;
export type InvoiceItemFormValues = z.infer<typeof invoiceItemSchema>;
