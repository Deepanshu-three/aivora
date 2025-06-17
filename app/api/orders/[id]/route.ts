import db from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 2]; // Assuming route is /api/orders/[id]/details

    if (!id) {
      return NextResponse.json({ error: "ID not provided" }, { status: 400 });
    }

    const order = await db.order.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        orderItems: {
          include: { product: { select: { name: true, price: true } } },
        },
        payment: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let shipping = null;

    if (order.shippingId) {
      shipping = await db.shipping.findUnique({
        where: { id: order.shippingId },
        select: {
          fullName: true,
          mobileNumber: true,
          pincode: true,
          houseNo: true,
          area: true,
          city: true,
          state: true,
        },
      });
    }

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        totalAmount: order.totalAmount,
        user: order.user,
        orderItems: order.orderItems,
        payment: order.payment,
        shipping,
      },
    });
  } catch (error) {
    console.error("[ORDER_ID_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching the order" },
      { status: 500 }
    );
  }
}
