import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .optional(),
});

 