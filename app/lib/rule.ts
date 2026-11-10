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
 