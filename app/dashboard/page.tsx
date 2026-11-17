import { connection } from "next/server"
import { getSession } from "../lib/session"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
import { getcollection } from "../lib/db"

export const instant = false

export default async function Dashboard() {
  
  await connection()
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const users = await getcollection("users")

  const user = await users.findOne({
    _id: new ObjectId(session.userId),
  })

  if (!user) {
    redirect("/login")
  }

  const posts = await getcollection("posts")

  const userPosts = await posts
    .find({ authorid: session.userId })
    .sort({ createdAt: -1 })
    .toArray()

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 px-4 py-12 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <section className="mb-6 rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
            Welcome to Your Dashboard
          </h1>
          <p className="text-slate-600">
            <span className="font-semibold text-indigo-600">
              {user.username}
            </span>
            , you are successfully logged in!
          </p>
        </section>
         <h2 className="mb-5 text-2xl font-bold text-indigo-950">
            Your Posts
          </h2>
        <section className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          {userPosts.length === 0 ? (
            <p className="rounded-xl bg-slate-50 px-4 py-6 text-slate-600">
              You haven’t created any posts yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-200">
              {userPosts.map((post) => (
                <article key={post._id.toString()} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mb-3 whitespace-pre-wrap break-words leading-7 text-slate-600">
                    {post.content}
                  </p>
                  <time className="text-sm text-slate-500">
                    {post.createdAt.toLocaleDateString()}
                  </time>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}