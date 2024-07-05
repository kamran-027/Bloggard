import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const addBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type SignUpInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type AddBlogInput = z.infer<typeof addBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
