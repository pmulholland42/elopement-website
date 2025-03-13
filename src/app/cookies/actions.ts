"use server";

import { getDatabaseConnection } from "@/database";

export async function cookieRespond(formData: FormData) {
  console.log("!!!!!");
  console.log(formData);
  const name = formData.get("name");
  const cookies = formData.get("cookies");
  if (!name || !cookies) {
    throw "missing-required-field";
  }
  const db = getDatabaseConnection();
  await db.none("insert into cookie_response (name, cookies) values ($1, $2)", [
    name,
    cookies,
  ]);
}
