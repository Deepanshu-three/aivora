import { z } from "zod";

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(100, { message: "Full name must be no more than 100 characters long." }),

  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit mobile number." }),

  pincode: z
    .string()
    .regex(/^\d{4,10}$/, { message: "Pincode must be a valid number." }),

  houseNo: z
    .string()
    .min(1, { message: "House number is required." }),

  area: z
    .string()
    .min(2, { message: "Area must be at least 2 characters long." }),

  city: z
    .string()
    .min(1, { message: "City must be at least 1 character long." }),

  state: z
    .string()
    .min(1, { message: "State must be at least 1 character long." }),
});
