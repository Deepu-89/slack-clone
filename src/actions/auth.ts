"use server";

import { supabaseServerClient } from "@/supabase/supabaseServerClient";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function socialAuth(provider: Provider) {
  const supabase = supabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (error) {
    console.log(error);
    return "some thing went wrong !! ";
  }
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signOut() {
  const supabase = supabaseServerClient();
  const { error } = await supabase.auth.signOut();
  console.log(error);

  if (error) "something went wrong";
  redirect("/");
}
