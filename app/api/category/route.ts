import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { message: "Name and description are required" },
        { status: 400 }
      );
    }

    const category = await db.category.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(
      { message: "Category created successfully", category },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create category", error: (error as Error).message },
      { status: 500 }
    );

  }
}


export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        subCategories: true, // include subcategories
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories", error: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await db.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete category", error: (error as Error).message },
      { status: 500 }
    );
  }
}
