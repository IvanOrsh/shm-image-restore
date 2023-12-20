import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { UserNav } from "@/components/common/user-nav";

export default async function UserApp() {
  let loggedIn = false;

  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) loggedIn = true;
  } catch (error) {
    console.log(`[user-app]: ${error}`);
  } finally {
    if (!loggedIn) {
      redirect("/", RedirectType.replace);
    }
  }

  return (
    <div className="text-lime-700 font-extrabold">
      <UserNav />
    </div>
  );
}
