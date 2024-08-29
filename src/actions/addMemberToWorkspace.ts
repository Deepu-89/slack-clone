"use server";

import { getUserData } from "@/queries";
import { supabaseServerClient } from "@/supabase/supabaseServerClient";

export async function addMemberToWorkspace(
  user_id: string,
  workspace_id: string,
) {
  const supabase = supabaseServerClient();
  const user = await getUserData();
  if (!user) return { error: "unauthorized" };

  const { data: addMemberToWorkspaceData, error: addMemberToWorkspaceError } =
    await supabase.rpc("add_member_to_work_space", {
      user_id,
      workspace_id,
    });

  return { addMemberToWorkspaceData, addMemberToWorkspaceError };
}
