import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    const body = await req.json();

    const {
      name,
      description,
      addInfo,
      price,
      stock,
      productImage,
      category, // category ID
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
        imageUrl: productImage,
        categoryId: category,
      },
    });

    return NextResponse.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a product by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;

    // Optional: Check if product exists before deletion
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
