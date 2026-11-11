"use server"

import { ObjectId } from "mongodb"
import { getcollection } from "../lib/db"
import { getSession } from "../lib/session"
import { createPostSchema } from "../lib/rule"


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
}