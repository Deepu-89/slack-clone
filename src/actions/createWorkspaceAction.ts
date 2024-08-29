"use server";

import { getUserData } from "@/queries";
import { updateSession } from "@/supabase/middleware";
import { supabaseServerClient } from "@/supabase/supabaseServerClient";
import { WorkSpaces } from "@/types/app";
import { updateUserWorkSpace } from "./updateUserWorkSpace";
import { addMemberToWorkspace } from "./addMemberToWorkspace";

export async function createWorkspaceAction({
  name,
  slug,
  invite_code,
  image_url,
}: Partial<WorkSpaces>) {
  const supabase = supabaseServerClient();
  const user = await getUserData();
  if (!user) return { error: "User not found" };
  const { data: workspacedata, error } = await supabase
    .from("workspaces")
    .insert({
      name,
      slug,
      invite_code,
      image_url,
      super_admin: user.id,
    } as WorkSpaces)
    .select("*");
  console.log(workspacedata);

  if (error) return { error };
  // add workspaces to users
  const { updatedWorkSpaceData, updateWorkspaceError } =
    await updateUserWorkSpace(user.id, workspacedata[0].id);

  if (updateWorkspaceError) return { error: updateWorkspaceError };

  const { addMemberToWorkspaceData, addMemberToWorkspaceError } =
    await addMemberToWorkspace(user.id, workspacedata[0].id);

  if (addMemberToWorkspaceError) return { error: addMemberToWorkspaceError };
}
