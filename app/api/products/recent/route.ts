// /api/products/recent/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4, // ✅ Only 4 products
      include: {
        images: { select: { url: true } },
        category: { select: { name: true } },
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return NextResponse.json(
      { message: "Unable to fetch recent products" },
      { status: 500 }
    );
  }
}
