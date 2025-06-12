import db from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const addressId = params.id;

  try {
    // Optional: Add user auth check here

    await db.shipping.delete({
      where: { id: addressId },
    });

    return NextResponse.json({ message: "Address deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json({ message: "Failed to delete address" }, { status: 500 });
  }
}