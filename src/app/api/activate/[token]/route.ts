import { db } from "@/lib/db";

import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const user = await db.user.findFirst({
    where: {
      ActivateToken: {
        some: {
          AND: [
            { activated_at: null },
            {
              created_at: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  });
  if (!user) {
    throw new Error("Invalid Token");
  }
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  });
  await prisma?.activateToken.update({
    where: {
      token,
    },
    data: {
      activated_at: new Date(),
    },
  });
  redirect("/sign-in");
}
