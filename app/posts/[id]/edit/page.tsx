import { connection } from "next/server"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { getSession } from "../../../lib/session"
import { getcollection } from "../../../lib/db"

export const instant = false

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await connection()

  const { id } = await params
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  if (!ObjectId.isValid(id)) {
    redirect("/dashboard")
  }

  const posts = await getcollection("posts")
  const post = await posts.findOne({
    _id: new ObjectId(id),
    authorid: session.userId,
  })

  if (!post) {
    redirect("/dashboard")
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Edit Post</h1>
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="mt-3 whitespace-pre-wrap">{post.content}</p>
    </main>
  )
}