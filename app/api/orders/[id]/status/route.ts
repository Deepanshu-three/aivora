import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Utility to extract the order ID from the URL
function extractOrderId(req: NextRequest) {
  const segments = req.nextUrl.pathname.split("/");
  // Assumes the path is like /api/orders/:id/status → we want the 3rd segment from the end
  return segments[segments.length - 2];
}

export async function PUT(req: NextRequest) {
  try {
    const id = extractOrderId(req);
    const { status, trackingId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Order ID not found in URL" }, { status: 400 });
    }

    if (!["pending", "shipped", "delivered", "canceled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    if (status === "shipped" && !trackingId) {
      return NextResponse.json({ message: "Please provide the tracking ID" }, { status: 400 });
    }

    const updatedOrder = await db.order.update({
      where: { id },
      data: {
        status,
        trackingId: trackingId || null,
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
