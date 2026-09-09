import { InvoiceData } from "../types";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const invoiceApi = {
  async saveDraft(data: Partial<InvoiceData>): Promise<{ id: string; savedAt: string }> {
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        updatedAt: Date.now(), // send client timestamp to test 409
      }),
    });

    if (!response.ok) {
      let errorMessage = "An error occurred";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // ignore JSON parse error
      }
      throw new ApiError(response.status, errorMessage);
    }

    return response.json();
  },
};
