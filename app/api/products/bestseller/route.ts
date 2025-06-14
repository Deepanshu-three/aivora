// /api/products/bestsellers/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET() {
  try {
    const products = await db.product.findMany({
      take: 4, // ✅ Only 4 products
      orderBy: [
        {
          stock: "asc", // lower stock → selling fast
        },
        {
          price: "desc", // higher price → possibly better seller
        },
      ],
      include: {
        images: { select: { url: true } },
        category: { select: { name: true } },
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bestsellers:", error);
    return NextResponse.json(
      { message: "Unable to fetch bestsellers" },
      { status: 500 }
    );
  }
}
