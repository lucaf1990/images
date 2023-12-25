import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = getServerSession(authOptions);
  return NextResponse.json({ authenticated: !!session });
};
