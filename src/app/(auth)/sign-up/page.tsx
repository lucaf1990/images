import SignUpForm from "@/components/form/SignUpForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <SignUpForm />;
};

export default Register;
