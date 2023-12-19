import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function Home() {
  const loggedIn = false;

  try {
    const supabase = createServerComponentClient({ cookies });
  } catch (error) {
    console.log(`[home]: ${error}`);
  }

  return <div className="text-lime-700 font-extrabold">Home</div>;
}
