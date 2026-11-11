import { z } from "zod";

export const registerSchema = z.object({
  username:z.string().min(3,"user name must be 3 characheter"),
  email: z.string().email("Please enter a valid email"),  
  password: z.string().min(4, "Password must be at least 4 characters"),
  cpassword: z.string(),
}).
 refine((data)=>data.password === data.cpassword,{
    message:"password not match",
    path:["cpassword"],
 })

 export const loginSchema = z.object({
  username:z.string().min(3,"user name must be 3 characheter"),  
  password: z.string().min(4, "Password must be at least 4 characters"),
})
 /* for create post schema */
export const createPostSchema = z.object({
    title: z.string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(120, "Title cannot exceed 120 characters"),

    content: z.string()
        .trim()
        .min(10, "Content must be at least 10 characters")
        .max(10000, "Content cannot exceed 10000 characters"),
})