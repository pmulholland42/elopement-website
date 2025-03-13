"use client";

import { signInWithGoogle } from "./actions";

export default function SignIn() {
  return (
    <form
      action={async () => {
        await signInWithGoogle();
      }}
      style={{ marginTop: "4rem" }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
