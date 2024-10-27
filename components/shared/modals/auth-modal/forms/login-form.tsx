"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, FormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Title } from "@/components/shared";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        throw Error();
      }

      toast.success("Successfully logged in", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      console.error("[LOGIN] error", error);
      toast.error("Error while logging in", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title
              text="Login to your account"
              size="md"
              className="font-bold"
            />
            <p className="text-gray-400">
              Enter your email to access your account.
            </p>
          </div>
        </div>

        <FormInput name="email" label="Email" required />
        <FormInput name="password" label="Password" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};