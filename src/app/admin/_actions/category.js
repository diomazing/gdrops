"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { CategoriesSchema } from "@/validation/adminSchema";

export const addCategory = async (req, res) => {
  const result = CategoriesSchema.safeParse(req);
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  if (result) {
    const category = await prisma.categories.create({
      data: {
        ...result.data,
      },
    });

    if (category) {
      revalidatePath("/admin/categories");
    }

    return category;
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req;

  const result = CategoriesSchema.safeParse(req);
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  if (result) {
    const category = await prisma.categories.update({
      where: { id },
      data: {
        ...result.data,
      },
    });

    if (category) {
      revalidatePath("/admin/categories");
    }

    return category;
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req;

  const categoryInuse = await prisma.products.findOne({
    where: { categoryId: id },
  });

  if (categoryInuse) {
    return { message: "Category is in use, Deletion not allowed" };
  }

  const category = await prisma.categories.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });

  if (category) {
    revalidatePath("/admin/categories");
  }

  return category;
};
