"use server"

import { ObjectId } from "mongodb"
import { getcollection } from "../lib/db"
import { getSession } from "../lib/session"
import { createPostSchema } from "../lib/rule"
import { error } from "console"


export async function createPost(
    _previousState: { error?: string; success?: string } | null,
    formData: FormData
) {
    const parsed = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
   })
  if (!parsed.success) {
    return {
        error: parsed.error.issues[0].message
    }
}
const session = await getSession()
if(!session){
    return{
        error:"you must be logged to create a post"
    }
}
//get the database
const posts = await getcollection("posts")
//parse the input form data to content and title
const {title , content } = parsed.data
//creat posts
const post = {
    title,
    content,
    authorid: session.userId,
    createdAt : new Date(),
}
//insert the data to the database
await posts.insertOne(post)
return {
    success: "Post created successfully!",
}

}