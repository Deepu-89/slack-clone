"use client";
import { signOut } from "@/actions";
import { Button } from "../button";

function SignOutButton() {
  async function handleSignOut() {
    await signOut();
  }
  return <Button onClick={handleSignOut}>SignOut</Button>;
}

export default SignOutButton;
