import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const Admin = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user) {
    return <div> Welcome back Admin {session?.user.username}</div>;
  }
  return <div>Log in to go to your admin page</div>;
};
export default Admin;
