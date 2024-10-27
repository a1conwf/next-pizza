"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  formRegisterSchema,
  FormRegisterValues,
} from "./modals/auth-modal/forms/schemas";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form";
import { Button } from "../ui";
import { updateUserProfile } from "@/app/actions";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm<FormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: String(data.fullName),
      email: String(data.email),
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: FormRegisterValues) => {
    try {
      await updateUserProfile({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("User data updated 📝", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Error while updating user data", {
        icon: "❌",
      });
    }
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title text="Personal information" size="md" className="font-bold" />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormInput name="email" label="Email" required />
          <FormInput name="fullName" label="Full name" required />

          <FormInput
            type="password"
            name="password"
            label="New password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Repeat password"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Save
          </Button>

          <Button
            onClick={handleSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Logout
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
