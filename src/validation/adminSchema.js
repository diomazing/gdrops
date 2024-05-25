import { Gender } from "@prisma/client";
import { z } from "zod";

export const UserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
      refine: (email) => {
        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
        return re.test(email) || "Email is not valid.";
      },
    })
    .email(),
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message: "First Name must be at least 2 characters.",
    }),
  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string",
    })
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
  birthdate: z
    .date({
      required_error: "Birthdate is required",
      invalid_type_error: "Birthdate must be a date",
    })
    .refine((date) => date.getTime() < Date.now(), {
      message: "Birthdate must be in the past.",
    }),
  gender: z
    .string({
      required_error: "Gender is required",
      invalid_type_error: "Gender must be a string",
    })
    .refine((gender) => Object.values(Gender).includes(gender), {
      message: "Gender must be one of the following: male, female, other",
    }),
  country: z.string({
    required_error: "Country is required",
    invalid_type_error: "Country must be a string",
  }),
  state: z.string({
    required_error: "State is required",
    invalid_type_error: "Country must be a string",
  }),
  city: z.string({
    required_error: "City is required",
    invalid_type_error: "Country must be a string",
  }),
  address1: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .max(500, {
      message: "Max characters reached.",
    }),
  hasAdminAccess: z.boolean().optional(),
});

export const CategoriesSchema = z.object({
  categoryName: z
    .string({
      required_error: "Category Name is required",
      invalid_type_error: "Category Name must be a string",
    })
    .min(3, {
      message: "Category Name must be at least 3 characters.",
    }),
});
