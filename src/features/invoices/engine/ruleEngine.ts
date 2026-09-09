import wizardRulesConfig from "../config/wizardRules.json";
import { InvoiceData, InvoiceItem } from "../types";

// --- Types ---

export interface RuleCondition {
  field: string;
  operator: "equals" | "notEquals" | "greaterThan" | "lessThan" | "greaterThanOrEqual" | "lessThanOrEqual";
  value: string | number | boolean;
}

export interface StepConfig {
  id: string;
  title: string;
  order: number;
  alwaysVisible: boolean;
  skipWhen?: RuleCondition;
  dynamicFields?: Record<string, { requiredWhen: RuleCondition }>;
}

export interface FieldRule {
  id: string;
  targetField: string;
  rule: RuleCondition;
  action: string;
  value?: number;
  message: string;
}

// --- Engine ---

function resolveFieldValue(
  fieldName: string,
  invoiceData: Partial<InvoiceData>
): string | number | boolean {
  switch (fieldName) {
    case "total": {
      const items: InvoiceItem[] = (invoiceData.items as InvoiceItem[]) || [];
      return items.reduce((sum, item) => {
        const itemTotal = item.quantity * item.price;
        const afterDiscount = itemTotal - itemTotal * (item.discount / 100);
        return sum + afterDiscount + afterDiscount * (item.taxPercent / 100);
      }, 0);
    }
    case "type":
      return invoiceData.type || "Cash";
    case "hasTaxableItems": {
      const items: InvoiceItem[] = (invoiceData.items as InvoiceItem[]) || [];
      return items.some((item) => item.taxPercent > 0);
    }
    default:
      return (invoiceData as Record<string, unknown>)[fieldName] as string | number | boolean;
  }
}

function evaluateCondition(
  condition: RuleCondition,
  invoiceData: Partial<InvoiceData>
): boolean {
  const actualValue = resolveFieldValue(condition.field, invoiceData);

  switch (condition.operator) {
    case "equals":
      return actualValue === condition.value;
    case "notEquals":
      return actualValue !== condition.value;
    case "greaterThan":
      return Number(actualValue) > Number(condition.value);
    case "lessThan":
      return Number(actualValue) < Number(condition.value);
    case "greaterThanOrEqual":
      return Number(actualValue) >= Number(condition.value);
    case "lessThanOrEqual":
      return Number(actualValue) <= Number(condition.value);
    default:
      return false;
  }
}

// --- Public API ---

/**
 * Returns the list of visible steps based on current invoice data.
 * Steps with a `skipWhen` condition that evaluates to true are filtered out.
 */
export function getVisibleSteps(invoiceData: Partial<InvoiceData>): StepConfig[] {
  const steps = wizardRulesConfig.steps as StepConfig[];

  return steps.filter((step) => {
    if (step.alwaysVisible && !step.skipWhen) return true;
    if (step.skipWhen) {
      return !evaluateCondition(step.skipWhen, invoiceData);
    }
    return true;
  });
}

/**
 * Checks if a specific step should be skipped.
 */
export function shouldSkipStep(stepId: string, invoiceData: Partial<InvoiceData>): boolean {
  const steps = wizardRulesConfig.steps as StepConfig[];
  const step = steps.find((s) => s.id === stepId);
  if (!step?.skipWhen) return false;
  return evaluateCondition(step.skipWhen, invoiceData);
}

/**
 * Returns whether dynamic fields in a step should be required
 * based on the current invoice data.
 */
export function areDynamicFieldsRequired(
  stepId: string,
  invoiceData: Partial<InvoiceData>
): boolean {
  const steps = wizardRulesConfig.steps as StepConfig[];
  const step = steps.find((s) => s.id === stepId);
  if (!step?.dynamicFields) return false;

  // Check any dynamic field's requiredWhen condition
  return Object.values(step.dynamicFields).some((fieldConfig) =>
    evaluateCondition(fieldConfig.requiredWhen, invoiceData)
  );
}

/**
 * Returns all active field rules that match current invoice data.
 */
export function getActiveFieldRules(
  invoiceData: Partial<InvoiceData>
): FieldRule[] {
  const fieldRules = wizardRulesConfig.fieldRules as FieldRule[];
  return fieldRules.filter((rule) => evaluateCondition(rule.rule, invoiceData));
}

/**
 * Convenience: checks if a specific field rule is active.
 */
export function isFieldRuleActive(
  ruleId: string,
  invoiceData: Partial<InvoiceData>
): boolean {
  const fieldRules = wizardRulesConfig.fieldRules as FieldRule[];
  const rule = fieldRules.find((r) => r.id === ruleId);
  if (!rule) return false;
  return evaluateCondition(rule.rule, invoiceData);
}
