"use client";
import { signOutGoogle } from "./actions";

export function SignOut() {
  return (
    <form
      action={async () => {
        await signOutGoogle();
      }}
      style={{ marginTop: "4rem" }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
