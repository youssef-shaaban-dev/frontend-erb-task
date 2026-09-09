import { z } from "zod";
import { INVOICE_TYPES } from "../types";

export const step1Schema = z
  .object({
    invoiceNumber: z.string().min(1, "رقم الفاتورة مطلوب"),
    customerId: z.string().min(1, "العميل مطلوب"),
    currency: z.string(),
    paymentType: z.enum([INVOICE_TYPES.CASH, INVOICE_TYPES.CREDIT]),
    invoiceDate: z.date({
      message: "تاريخ الإصدار مطلوب",
    }),
    dueDate: z.date({
      message: "تاريخ الاستحقاق مطلوب",
    }),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.dueDate) return true;
      return data.dueDate >= data.invoiceDate;
    },
    {
      message: "تاريخ الاستحقاق لا يمكن أن يكون قبل تاريخ الإصدار",
      path: ["dueDate"],
    }
  );

export type Step1FormValues = z.infer<typeof step1Schema>;
