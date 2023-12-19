import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateAccountForm from "@/features/auth/create-account-form";
import CreateLoginForm from "@/features/auth/login-account-form";

export default async function Home() {
  let loggedIn = false;

  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("[home:session]", session);

    if (session) loggedIn = true;
  } catch (error) {
    console.log(`[home]: ${error}`);
  } finally {
    if (loggedIn) {
      redirect("/user-app", RedirectType.replace);
    }
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Tabs
        defaultValue="create-account"
        className="w-[400px] border rounded-md pb-4 shadow-2xl"
      >
        <TabsList className="flex justify-around items-center rounded-b-none h-14">
          <TabsTrigger
            value="create-account"
            className="transition-all delay-150"
          >
            Account
          </TabsTrigger>
          <TabsTrigger value="login">Log in</TabsTrigger>
        </TabsList>

        <TabsContent value="create-account">
          <CreateAccountForm />
        </TabsContent>

        <TabsContent value="login">
          <CreateLoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
