import { connection } from "next/server";
import { getcollection } from "./lib/db";

export const instant = false
export default async function Home() {
  await connection()
  const posts = await getcollection("posts")
  const allposts = await posts.find({}).
  sort({createdAt: -1}).toArray()

  return (
  <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 py-12 text-slate-800 sm:px-8">
    <div className="mx-auto max-w-5xl">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl">
          The Blog
        </h1>
        <p className="mt-3 text-slate-600">
          Stories and ideas from our community.
        </p>
      </header>

      <section className="space-y-6">
        {allposts.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow">
            No posts yet. Check back soon!
          </p>
        ) : (
          allposts.map((post) => (
            <article
              key={post._id.toString()}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {post.title}
              </h2>
              <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-slate-700">
                {post.content}
              </p>
              <time className="mt-5 block text-sm text-slate-500">
                {post.createdAt.toLocaleDateString()}
              </time>
            </article>
          ))
        )}
      </section>
    </div>
  </main>
)
  
}