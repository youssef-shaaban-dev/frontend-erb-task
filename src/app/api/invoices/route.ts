import { NextResponse } from "next/server";

const lastSavedDrafts: Record<string, number> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, items, total, updatedAt } = body;

    // Simulate server latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate 409 Conflict if an older draft is trying to save over a newer one
    // For demo purposes, we randomly throw a 409 if the body contains a special flag,
    // or just simulate logic. Let's do real timestamp logic if provided.
    
    if (id && updatedAt) {
      const currentServerTime = lastSavedDrafts[id];
      if (currentServerTime && currentServerTime > updatedAt) {
        return NextResponse.json(
          { error: "Draft conflict. A newer version exists." },
          { status: 409 }
        );
      }
      lastSavedDrafts[id] = Date.now();
    }

    // Simulate validation error 422
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Validation failed: items are required." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      id: id || "inv_" + Date.now(),
      savedAt: new Date().toISOString(),
      message: "Draft saved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
