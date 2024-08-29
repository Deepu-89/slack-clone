import SignOutButton from "@/components/ui/global/SignOutButton";
import { getUserData } from "@/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserData();
  if (!user) redirect("/login");

  if (!user.workspaces) redirect("/create-workspace");
  const workSpaceId = user.workspaces[0];
  redirect(`/workspace/${workSpaceId}`);
}
