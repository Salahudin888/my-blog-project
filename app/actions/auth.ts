"use server"
import bcrypt from "bcryptjs";
import { getcollection } from "../lib/db";
import { loginSchema, registerSchema } from "../lib/rule";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation"

export async function registerUser(
  _previousState:{error?:string;success?:string} | null,
     formData:FormData) {
   const plszod =registerSchema.safeParse({ 
     username : formData.get("username"),
     email : formData.get("email"),
     password : formData.get("password"),
     cpassword : formData.get("cpassword")

  })

  if(!plszod.success){
    return{
        error : plszod.error.issues[0].message
    }
  }
   const {username,email,password} = plszod.data;
   
   const users =await getcollection("users");
  
   const existigUser = await users.findOne({username});
   if (existigUser){
    return {
        error:"Email is already registerd",
    }
   }
  
   const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({
    username,
    email,
    password: hashedPassword,
  });
    
  return {
    success: "Registration successful!",
 };
    
}

export async function loginUser(
  _previousState:{error?:string;success?:string} | null,
     formData:FormData) {
   const parsed =loginSchema.safeParse({ 
     username : formData.get("username"),
     password : formData.get("password"),
  })

  if (!parsed.success) {
  return {
    error: parsed.error.issues[0].message
  }
}
  const users = await getcollection("users")

  const user = await users.findOne({
    username: parsed.data.username
  })
  if(!user){
    return {
       error: "Invalid username or password"
    }
  }

  const ispassword = await bcrypt.compare(
    parsed.data.password,
    user.password
  )
  if(!ispassword){
    return {
       error: "Invalid username or password"
    }
  }
  await createSession(user._id.toString())
  redirect("/dashboard")
}

export async function logoutUser() {
  await deleteSession()
  redirect("/login")
}