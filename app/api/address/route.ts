import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
    }

    const addresses = await db.shipping.findMany({
      where: { userId },
    });

    // Wrap in object with key "addresses"
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    console.error("Error getting address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const { fullName, mobileNumber, area, houseNo, state, city, pincode } =
      await req.json();

    const shipping = await db.shipping.create({
      data: {
        fullName,
        mobileNumber,
        area,
        houseNo,
        state,
        city,
        pincode,
        userId,
      },
    });

    return NextResponse.json({ message: "Address saved", shipping });
  } catch (error) {
    console.error("Error saving address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
