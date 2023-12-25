import Link from "next/link";

import { HandMetal, LogInIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Logout from "./logout";
import { buttonVariants } from "../ui/button";
import MaxWidthWrapper from "../MaxWidthWrapper";

const UserSessionNavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <MaxWidthWrapper className="d-flex w-full justify-end position-relative">
      <div className="position-absolute right-20 top-0">
        {session?.user ? (
          <div className="menu p-2 rounded-md d-flex justify-between items-center w-[170px] mr-4 fixed right-12">
            <div>
              {" "}
              Welcome{" "}
              <span className="text-gray-500">
                {" "}
                {session.user.username.toUpperCase()}{" "}
              </span>
            </div>

            <div>
              {" "}
              <Logout />
            </div>
          </div>
        ) : (
          <Link href="/sign-in">
            <LogInIcon size={30} />
          </Link>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default UserSessionNavBar;
