"use client";

import { BsSlack } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Provider } from "@supabase/supabase-js";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { supabaseBrowserClient } from "@/supabase/supabaseBrowserClient";
import { socialAuth } from "@/actions";

const AuthPage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  //   const [error, socialAuthAction, isPending] = useActionState(socialAuth, null);

  const router = useRouter();
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    const getCurrUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        return router.push("/");
      }
    };

    getCurrUser();
    setIsMounted(true);
  }, [router, supabase]);

  const formSchema = z.object({
    email: z.string().email().min(2, { message: "Email must be 2 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);
    const { data, error } = await MagilcLinkAuth(values.email);
    setIsAuthenticating(false);
    if (error) {
      console.warn("Sign in error", error);
      return;
    }
  }

  async function MagilcLinkAuth(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: "${location.origin}/",
      },
    });
    return { data, error };
  }

  // async function socialAuth(provider: Provider) {
  //     console.log(location.origin);

  // 	setIsAuthenticating(true);
  // 	await supabase.auth.signInWithOAuth({
  // 		provider,
  // 		options: {
  // 			redirectTo: `${location.origin}/auth/callback`,
  // 		},
  // 	});
  // 	setIsAuthenticating(false);
  // }

  if (!isMounted) return null;

  return (
    <div className="grid min-h-screen place-content-center bg-white p-5 text-center">
      <div className="max-w-[450px]">
        <div className="mb-4 flex items-center justify-center gap-3">
          <BsSlack size={30} />
          <Typography text="Slackzz" variant="h2" />
        </div>

        <Typography
          text="Sign in to your Slackzz"
          variant="h2"
          className="mb-3"
        />

        <Typography
          text="We suggest using the email address that you use at work"
          variant="p"
          className="mb-7 opacity-90"
        />

        <div className="flex flex-col space-y-4">
          <Button
            disabled={false}
            variant="outline"
            className="flex space-x-3 border-2 py-6"
            onClick={() => socialAuth("google")}
          >
            <FcGoogle size={30} />
            <Typography
              className="text-xl"
              text="Sign in with Google"
              variant="p"
            />
          </Button>
          {/* <Button
						disabled={isAuthenticating}
						variant="outline"
						className="py-6 border-2 flex space-x-3"
						onClick={() => socialAuth("github")}>
						<RxGithubLogo size={30} />
						<Typography
							className="text-xl"
							text="Sign in with Github"
							variant="p"
						/>
					</Button> */}
        </div>

        <div>
          <div className="my-6 flex items-center">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variant="p" />
            <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticating}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name@work-email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="secondary"
                  className="my-5 w-full bg-primary-dark text-white hover:bg-primary-dark/90"
                  type="submit"
                >
                  <Typography text="Sign in with Email" variant="p" />
                </Button>

                <div className="rounded-sm bg-gray-100 px-5 py-4">
                  <div className="flex items-center space-x-3 text-gray-500">
                    <MdOutlineAutoAwesome />
                    <Typography
                      text="We will email you a magic link for a password-free sign-in"
                      variant="p"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
