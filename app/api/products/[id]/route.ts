import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function extractIdFromUrl(req: NextRequest) {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1]; // assumes ID is last segment
}

// GET /api/products/[id]
export async function GET(req: NextRequest) {
  const productId = extractIdFromUrl(req);

  if (!productId) {
    return NextResponse.json({ message: "No id provided" }, { status: 400 });
  }

  try {
    const res = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: { select: { name: true } },
        images: { select: { url: true } },
      },
    });

    if (!res) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(req: NextRequest) {
  const productId = extractIdFromUrl(req);

  try {
    const body = await req.json();
    const {
      name,
      description,
      brand,
      weight,
      manufacture,
      title,
      dimensions,
      addInfo,
      price,
      stock,
      productImages,
      category,
    } = body;

    if (!name || !price || !stock) {
      return NextResponse.json(
        { message: "Name, price, and stock are required." },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        addInfo,
        price,
        stock,
        brand,
        weight,
        manufacture,
        title,
        dimensions,
        images: {
          create: productImages.map((url: string) => ({ url })),
        },
        categoryId: category,
      },
    });

    return NextResponse.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(req: NextRequest) {
  const productId = extractIdFromUrl(req);

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id: productId } });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
