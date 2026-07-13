import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";
import { uploadImageToR2 } from "@/lib/r2";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!(await isValidAdminSession(session))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const url = await uploadImageToR2(file);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
