import { auth } from "@/auth";
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    return <SignOut />;
  }
  return <SignIn />;
}
