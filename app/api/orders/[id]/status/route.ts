// app/api/orders/[id]/status/route.ts
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status, trackingId } = await req.json();

    if (!["pending", "shipped", "delivered", "canceled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    if (status === "shipped" && !trackingId) {
      return NextResponse.json({ message: "Please provide the tracking ID" }, { status: 400 });
    }

    const updatedOrder = await db.order.update({
      where: { id: params.id },
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
