import { allowList, auth } from "@/auth";
import AddInviteeForm from "./AddInviteeForm";
import Link from "next/link";

export default async function ManagePage() {
  const session = await auth();

  if (
    !session?.user ||
    !session.user.email ||
    !allowList.includes(session.user.email)
  ) {
    return (
      <div style={{ margin: "6rem" }}>
        <Link href="/login">Please click here to log in first</Link>
      </div>
    );
  }

  return (
    <div style={{ margin: "6rem" }}>
      Logged in as {session.user.email}
      <Link href="/responses" style={{ margin: "1rem" }}>
        Click here to view responses
      </Link>
      <div>
        <AddInviteeForm />
      </div>
    </div>
  );
}
