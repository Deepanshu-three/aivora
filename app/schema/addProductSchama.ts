import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(2).max(100),

  title: z.string().max(1000).optional(),
  description: z.string().optional(),
  addInfo: z.string().optional(),

  brand: z.string().max(100).optional(),
  dimensions: z.string().max(100).optional(),
  weight: z.string().max(100).optional(),
  manufacture: z.string().max(100).optional(),
  material: z.string().optional(),

  price: z.number({ invalid_type_error: "Price must be a number" }).min(0),
  stock: z.number({ invalid_type_error: "Stock must be a number" }).min(0),

  productImages: z.any().refine(
    (files) =>
      Array.isArray(files) &&
      files.length > 0 &&
      files.every((file) => file instanceof File),
    {
      message: "At least one valid product image is required.",
    }
  ),

  category: z.string().optional(),
  subcategory: z.string().optional(),
});
