import { z } from "zod";

export const createStep3Schema = (isExceedingLimit: boolean) =>
  z.object({
    costCenterId: isExceedingLimit
      ? z.string().min(1, "مركز التكلفة مطلوب للغرض الإداري")
      : z.string().optional(),
    departmentId: isExceedingLimit
      ? z.string().min(1, "القسم الإداري مطلوب للغرض الإداري")
      : z.string().optional(),
    managerId: isExceedingLimit
      ? z.string().min(1, "المدير المسؤول مطلوب للغرض الإداري")
      : z.string().optional(),
    approvalReason: z.string().optional(),
    attachments: z.array(z.any()).optional(),
  });

export type Step3FormValues = z.infer<ReturnType<typeof createStep3Schema>>;
