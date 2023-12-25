import SignInForm from "@/components/form/SignInForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <SignInForm />;
};

export default Login;
