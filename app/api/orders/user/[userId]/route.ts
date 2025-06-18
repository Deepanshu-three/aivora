// GET /api/orders/user/:userId
import {  NextResponse } from "next/server";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {

    const {userId} = await auth()

    if(!userId) {
      return NextResponse.json({message: "unauthenticated"}, {status: 405})
    }

    const orders = await db.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
