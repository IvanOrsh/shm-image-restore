"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Must be a valid email." }),

  password: z
    .string({ required_error: "Password is required." })
    .min(7, { message: "Password must be at least 7 characters." })
    .max(12),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateAccountForm() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const supabase = createClientComponentClient();
      const { email, password } = values;

      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        // options: {
        //   emailRedirectTo: `${location.origin}/api/auth/callback`,
        // },
      });

      if (user) {
        form.reset();
        // router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(`[create-account-form:onSubmit]: ${error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      <span className="text-lg">You will love it.</span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>

                <FormDescription>This is your Email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>

                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create Account</Button>
        </form>
      </Form>
    </div>
  );
}
