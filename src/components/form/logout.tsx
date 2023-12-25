"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      <LogOutIcon size={25} />
    </button>
  );
};
export default Logout;
