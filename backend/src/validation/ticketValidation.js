import z from "zod";

export const postSchema = z.object({
  content: z.string().min(20, { message: "Title must be 20 or more characters long" }).max(800, { message: "Title must be less than 800 characters long" }),
  postImage: z.optional()
})