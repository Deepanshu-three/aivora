import { auth } from "@clerk/nextjs/server";
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
      material,
      addInfo,
      category, // categoryId
      subCategory, // subCategoryId ✅
      productImages, // array of image URLs
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

    // Create product
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
        material,
        stock,
        addInfo,
        categoryId: category,
        subCategoryId: subCategory || null, // ✅ handle optional subcategory
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
            id: true,
            name: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!products || products.length === 0) {
      return NextResponse.json(
        {
          message: "No products found",
          products: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Unable to fetch products" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("id");

  if (!productId) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    await db.product.delete({ where: { id: productId } });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}