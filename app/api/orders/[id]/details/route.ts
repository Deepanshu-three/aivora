import db from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await db.order.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { name: true, email: true } },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                images: { select: { url: true } },
              },
            },
          },
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
        trackingId: order.trackingId ?? null,
        user: order.user,
        paymentStatus: order.payment?.paymentStatus ?? "pending",
        orderItems: order.orderItems.map((item) => ({
          quantity: item.quantity,
          price: item.price,
          product: {
            name: item.product.name,
            price: item.product.price,
            images: item.product.images,
          },
        })),
        shipping,
      },
    });
  } catch (error) {
    console.error("[ORDER_DETAILS_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching the order" },
      { status: 500 }
    );
  }
}
