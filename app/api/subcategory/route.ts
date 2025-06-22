// app/api/subcategory/route.ts

import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, categoryId } = body;

    if (!name || !categoryId) {
      return NextResponse.json({ message: "Missing name or categoryId" }, { status: 400 });
    }

    const subcategory = await db.subCategory.create({
      data: {
        name,
        categoryId,
      },
    });

    return NextResponse.json({ message: "Subcategory created", subcategory });
  } catch (error) {
    console.error("[SUBCATEGORY_POST]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

// app/api/subcategory/route.ts

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const subcategories = await db.subCategory.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ subcategories });
  } catch (error) {
    console.error("[SUBCATEGORY_GET]", error);
    return NextResponse.json({ message: "Error fetching subcategories" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await db.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Subcategory deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete subcategory", error: (error as Error).message },
      { status: 500 }
    );
  }
}
