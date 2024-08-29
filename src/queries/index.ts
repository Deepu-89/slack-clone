import "server-only";
import { supabaseServerClient } from "@/supabase/supabaseServerClient";
import { User } from "@/types/app";
import { cache } from "react";

export const getUserData = cache(async (): Promise<User | null> => {
  const supabase = supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.log(error);
    return null;
  }
  return data[0];
});
