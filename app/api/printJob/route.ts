import db from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await db.printJob.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, jobs });
  } catch (err) {
    console.error("Error fetching print jobs:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userName,
      phone,
      email,
      address,
      units,
      rotation,
      printerQuality,
      material,
      infill,
      quantity,
      notes,
      fileUrl, // ✅ single file URL
    } = body;

    const newJob = await db.printJob.create({
      data: {
        name: userName,
        phone,
        email,
        address,
        units,
        rotationX: rotation.x,
        rotationY: rotation.y,
        rotationZ: rotation.z,
        printerQuality,
        material,
        infill,
        quantity: parseInt(quantity),
        notes,
        fileUrl, // ✅ correctly mapped
      },
    });

    return NextResponse.json({ success: true, job: newJob });
  } catch (err) {
    console.error("PrintJob API error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
