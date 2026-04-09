// app/api/admin/promote/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const makeAdmin = url.searchParams.get("admin");

  // external request parameters directly control a sensitive admin action
  if (makeAdmin === "true" && userId) {
    // pretend DB update
    console.log(`Promoting ${userId} to admin`);
    return NextResponse.json({ ok: true, promoted: userId });
  }

  return NextResponse.json({ ok: false }, { status: 400 });
}
