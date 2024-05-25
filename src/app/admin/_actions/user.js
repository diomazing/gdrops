"use server";

import prisma from "@/lib/prisma";
import { UserSchema } from "@/validation/adminSchema";
import { revalidatePath } from "next/cache";

export const addUser = async (req, res) => {
  const result = UserSchema.safeParse(req);
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  if (result) {
    const user = await prisma.user.create({
      data: {
        ...result.data,
      },
    });
    revalidatePath("/admin/users");
    return user;
  }
};

export const updateUser = async (req, res) => {
  const { id } = req;
  const result = UserSchema.safeParse(req);
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  if (result) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...result.data,
      },
    });

    if (user) {
      revalidatePath("/admin/users");
    }

    return user;
  }
};
