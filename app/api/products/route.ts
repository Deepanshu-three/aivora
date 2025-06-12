import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
// /api/products/route.ts

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const {
      name,
      description,
      brand,
      weight,
      manufacture,
      title,
      dimensions,
      price,
      stock,
      addInfo,
      category,
      productImages, // Now expecting an array of image URLs
    } = await req.json();

    // Basic validation
    if (
      !name ||
      !price ||
      !stock ||
      !category ||
      !productImages ||
      productImages.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create product with related images
    const product = await db.product.create({
      data: {
        name,
        title,
        description,
        brand,
        dimensions,
        weight,
        manufacture,
        price,
        stock,
        addInfo,
        categoryId: category,
        images: {
          create: productImages.map((url: string) => ({
            url,
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Product not created",
        error: (err as Error).message || String(err),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true, // only get image URLs
          },
        },
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Unable to fetch products" },
      { status: 500 }
    );
  }
}
