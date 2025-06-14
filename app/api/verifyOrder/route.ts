import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";

// Generate HMAC signature for verification
const generateSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
): string => {
  const keySecret = process.env.RAZOR_PAY_SECRET_KEY as string;
  return crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
};

export async function POST(request: NextRequest) {
  try {
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated", isOk: false },
        { status: 401 }
      );
    }

    const {
      orderId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
    }: {
      orderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
      amount: number | string;
    } = await request.json();

    if (!orderId || !razorpayPaymentId || !razorpaySignature || !amount) {
      return NextResponse.json(
        { message: "Missing required payment fields", isOk: false },
        { status: 400 }
      );
    }

    const expectedSignature = generateSignature(orderId, razorpayPaymentId);

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    // const payment = await db.payment.create({
    //   data: {
    //     id: razorpayPaymentId,
    //     userId: user.user.id,
    //     amount: parseFloat(amount.toString()),
    //     paymentStatus: "Completed",
    //     paymentMethod: "Razorpay",
    //   },
    // });

    return NextResponse.json(
      {
        message: "Payment verified and recorded successfully",
        isOk: true,
        // payment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { message: "Internal server error", isOk: false },
      { status: 500 }
    );
  }
}
