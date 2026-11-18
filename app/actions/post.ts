"use server"

import { ObjectId } from "mongodb"
import { getcollection } from "../lib/db"
import { getSession } from "../lib/session"
import { createPostSchema } from "../lib/rule"
import { revalidatePath } from "next/cache"
import { success } from "zod"


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

export async function updtepost(
    _previouseState:{error?: string ;sucess?:string} | null,
    formData:FormData
) {
    const postId = formData.get("postId")
    const valid = createPostSchema.safeParse({
        title:formData.get("title"),
        content:formData.get("content")
    })
    if (!valid.success){
        return{error: valid.error.issues[0].message}
    }
    const session = await getSession()
   if(!session){
     return{
        error:"you must be logged to create a post"
     }
    }
    if (typeof postId !=="string" || !ObjectId.isValid(postId)){
        return {error : "invalid post id"}
    }
    const posts = await getcollection("posts")
    const {title ,content} = valid.data
    const updatePost = {
        title,
        content,
        updateAt:new Date(),
    }
    const result = await posts.updateOne({
        _id : new ObjectId(postId),
        authorid : session.userId,
    },{
        $set:updatePost,
    }   
    )
    if (result.matchedCount === 0) {
       return {
       error: "Post not found or you don’t have permission to edit it.",
    }
}
revalidatePath("/")
revalidatePath("/dashboard")
return{
    success: "post updated sucessfully"
}
}
