import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { userId } = await auth();

  if(!userId){
    return NextResponse.json({message: "unauthenticated"}, {status: 405})
  }

  const cart = await db.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.cartItems.length === 0) {
    return NextResponse.json(
      { success: false, error: "Cart is empty" },
      { status: 400 }
    );
  }

  // Calculate total amount
  const cartAmount = cart.cartItems.reduce((sum: number, item: any) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const totalAmount = cartAmount < 1000 ? cartAmount + 60 : cartAmount;

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY,
  });

  const receipt = Math.random().toString(36).substring(2, 12); // like "h4k9f2l8q3"

  try {
    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
