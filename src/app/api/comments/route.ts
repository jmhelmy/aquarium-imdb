// /src/app/api/comments/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const content = formData.get("content");
    const fishId = formData.get("fishId");

    console.log("Form data received:", { content, fishId });

    if (!content || !fishId) {
      return NextResponse.json(
        { error: "Missing content or fishId" },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        content: String(content),
        fishId: parseInt(String(fishId)),
      },
    });

    return NextResponse.redirect(req.headers.get("referer") || "/");
  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
