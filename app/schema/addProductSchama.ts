import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be no more than 100 characters long." }),

  description: z
    .string()
    .min(1, { message: "Description must be greater than 1 character." })
    .optional(),

  addInfo: z.string().optional(),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price cannot be negative" }),

  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, { message: "Stock cannot be negative" }),

  productImage: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Product image is required.",
    }),
  category: z.string(),
  title: z
    .string()
    .min(1, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be no more than 100 characters long." }),
  brand: z
    .string()
    .min(1, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be no more than 100 characters long." }),
  dimensions: z
    .string()
    .min(1, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be no more than 100 characters long." }),
  weight: z
    .string()
    .min(1, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be no more than 100 characters long." }),
  manufacture: z
    .string()
    .min(1, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be no more than 100 characters long." }),
});
