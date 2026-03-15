import * as z from "zod";

export const validatorUserSchema = z.object({
  name: z.string().min(2,"Name must be at least 2 characters long").max(50,"Name must be at most 50 characters long"),
  email: z.email("Invalid email format"),
  age: z.number().int("Age must be an integer").min(0,"Age must be a positive number")
});


