"use client";
import { loginValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { axiosAuth } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof loginValidation>) => {
    try {
      let loading = true;
      setError(false);
      const res = await axiosAuth.post("/auth/login", value);
      const token = res.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("data", token);
      }
      router.push("/");
      toast.success("Login Successful!");
    } catch (err: any) {
      setError(true);
      toast.error(
        err.response?.data?.message || "Login Failed. Please try again.",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input
                  type="phone"
                  placeholder="Enter Your Phone Number"
                  {...field}
                  className="px-6 bg-transparent"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="px-6 bg-transparent"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <h1 className="text-red-500 font-bold text-center animate-bounce">
            OOPS! Please Try Again
          </h1>
        )}
        <Button
          type="submit"
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
