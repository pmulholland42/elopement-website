import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});

export const allowList = ["pmulholland08@gmail.com", "rwolynn@gmail.com"];
