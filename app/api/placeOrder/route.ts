import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {userId} = await auth()
    const { addressId, paymentMode, transactionId } = body;

    if (!addressId || !paymentMode || !userId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Fetch cart
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
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total amount
    const cartAmount = cart.cartItems.reduce((sum: number, item : any) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const totalAmount = cartAmount < 1000 ? cartAmount + 60 : cartAmount;


    // Create Order
    const order = await db.order.create({
      data: {
        userId,
        totalAmount,
        status: "pending",
        paymentStatus: paymentMode === "cod" ? "pending" : "completed", // Assume Razorpay already paid
        shippingId: addressId,
        orderItems: {
          create: cart.cartItems.map((item) => ({
            quantity: item.quantity,
            price: item.product.price,
            productId: item.productId,
          })),
        },
      },
    });

    // Create Payment record
    await db.payment.create({
      data: {
        orderId: order.id,
        paymentMethod:
          paymentMode === "cod"
            ? "cash_on_delivery"
            : "credit_card", // or 'bank_transfer' based on Razorpay type
        paymentAmount: totalAmount,
        paymentStatus: paymentMode === "cod" ? "pending" : "completed",
        transactionId: transactionId || null,
      },
    });

    // Clear cart
    await db.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (error) {
    console.error("[PLACE_ORDER_ERROR]", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
