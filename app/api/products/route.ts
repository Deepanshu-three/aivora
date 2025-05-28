import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
// /api/products/route.ts

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
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
      productImage, // This is the uploaded Cloudinary URL
    } = await req.json();

    if (!name || !price || !stock || !category || !productImage) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        name,
        description: description || "",
        price,
        stock,
        brand,
        weight,
        manufacture,
        title,
        dimensions,
        addInfo: addInfo || "",
        categoryId: category,
        imageUrl: productImage,
      },
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "poduct not created",
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
            name: true, // only get category name
          },
        },
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Unable to fetch products" },
      { status: 401 }
    );
  }
}
