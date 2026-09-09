export const INVOICE_TYPES = {
  CASH: "Cash",
  CREDIT: "Credit",
} as const;

export type InvoiceType = typeof INVOICE_TYPES[keyof typeof INVOICE_TYPES];

export const INVOICE_STATUSES = {
  DRAFT: "Draft",
  PENDING_APPROVAL: "Pending Approval",
  APPROVED: "Approved",
  ERROR: "Error",
} as const;

export type InvoiceStatus = typeof INVOICE_STATUSES[keyof typeof INVOICE_STATUSES];

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  file?: File;
}

export interface Step1BasicInfo {
  invoiceNumber: string;
  type: InvoiceType;
  customerId: string;
  invoiceDate: string;
  dueDate?: string; // Required if Credit
  currency: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  taxPercent: number;
  availableStock: number;
}

export interface Step2Items {
  items: InvoiceItem[];
}

export interface Step3Approval {
  costCenterId?: string;
  departmentId?: string;
  approvalReason?: string;
  managerId?: string;
  attachments?: Attachment[];
}


export interface InvoiceData extends Step1BasicInfo, Step2Items, Step3Approval {
  id?: string;
  status: InvoiceStatus;
  lastSaved?: string;
}


export interface WizardState {
  currentStep: number;
  totalSteps: number;
  invoiceData: Partial<InvoiceData>;
  isSaving: boolean;
  saveError: string | null;
  lastSavedAt: Date | null;
}

export interface WizardActions {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateInvoiceData: (data: Partial<InvoiceData>) => void;
  setSavingStatus: (isSaving: boolean, error?: string | null) => void;
  resetWizard: () => void;
}

export type InvoiceStore = WizardState & WizardActions;
