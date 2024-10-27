"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Container,
  Title,
  CheckoutSidebar,
  CheckoutCart,
  CheckoutDeliveryAddress,
  CheckoutPersonalInfo,
} from "@/components/shared";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants";
import { useCart } from "@/hooks";
import toast from "react-hot-toast";
import React from "react";
import { createOrder } from "@/app/actions";
import { Api } from "@/services/api-client";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { items, updateItemQuantity, deleteCartItem, totalAmount, loading } =
    useCart();

  const [submitting, setSubmitting] = React.useState(false);

  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error("Order successfully placed! 📝 ", {
        icon: "✅",
      });
    } catch (error) {
      console.error(error);
      setSubmitting(false);

      toast.error("Could not create an order"),
        {
          icon: "❌",
        };
    }
  };

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  return (
    <Container className="mt-10">
      <Title
        text="Order placement"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                deleteCartItem={deleteCartItem}
                loading={loading}
              />

              <CheckoutPersonalInfo
                className={loading ? "opacity-50 pointer-events-none" : ""}
              />

              <CheckoutDeliveryAddress
                className={loading ? "opacity-50 pointer-events-none" : ""}
              />
            </div>

            <aside className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </aside>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
