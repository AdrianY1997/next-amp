import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function GET(request) {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
