"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export const signInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/manage" });
};

export const signOutGoogle = async () => {
  await signOut();
  revalidatePath("/login");
};
