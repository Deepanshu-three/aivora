import { z } from "zod";

export const addCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be no more than 100 characters long." }),
  
  description: z
    .string()
    .min(1, { message: "Description must be greater than 1 character." })
    .optional(),

});
