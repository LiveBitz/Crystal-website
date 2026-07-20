import { NextResponse } from "next/server";
import { auth } from "@/lib/neonAuth";
import { upsertUserProfileFields } from "@/lib/data/userProfile";

export async function PUT(req: Request) {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    // Only allow updating specific fields
    const { phone, addressLine1, addressLine2, city, state, postalCode, country } = data;

    await upsertUserProfileFields({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      phone, addressLine1, addressLine2, city, state, postalCode, country,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
