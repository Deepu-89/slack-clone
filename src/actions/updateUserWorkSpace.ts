import { supabaseServerClient } from "@/supabase/supabaseServerClient";

export async function updateUserWorkSpace(
  user_id: string,
  workspace_id: string,
) {
  const supabase = supabaseServerClient();

  let { data: updatedWorkSpaceData, error: updateWorkspaceError } =
    await supabase.rpc("add_work_space_to_user", {
      new_workspace: workspace_id,
      user_id,
    });
  return { updatedWorkSpaceData, updateWorkspaceError };
}
