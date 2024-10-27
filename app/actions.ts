"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "./../constants/checkout-form-schema";
import { cookies } from "next/headers";
import { OrderStatus, Prisma } from "@prisma/client";
import { getUserSession } from "@/lib/get-user-session";
import { hashSync } from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();

    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.SUCCEEDED,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
  } catch (error) {
    console.log("[CREATE_ORDER] Server Error", error);
  }
}

export async function updateUserProfile(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.fullName,
        password: body.password
          ? hashSync(body.password as string, 10)
          : foundUser?.password,
      },
    });
  } catch (error) {
    console.log("[UPDATE_USER_PROFILE] error", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });
  } catch (error) {
    console.error("[REGISTER_USER] error", error);
    throw error;
  }
}
