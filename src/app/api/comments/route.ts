// /src/app/api/comments/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const content = formData.get("content") as string;
    const fishId = parseInt(formData.get("fishId") as string, 10);

    console.log("Form data received:", { content, fishId });

    if (!content || isNaN(fishId)) {
      return NextResponse.json(
        { error: "Missing content or invalid fishId" },
        { status: 400 }
      );
    }

    await prisma.comment.create({
      data: {
        content,
        fishId,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
