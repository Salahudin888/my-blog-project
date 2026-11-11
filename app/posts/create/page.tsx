
"use client"

import { useState } from "react"
import "./create.css"

export default function CreatePost() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        })
    }

    return (
        <main
            className="animated-bg min-h-screen px-4 py-12"
            onMouseMove={handleMouseMove}
        >
            {/* Cursor-following glow */}
            <div
                className="cursor-glow"
                style={{
                    left: position.x,
                    top: position.y,
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        Create New Post
                    </h1>
                    <p className="text-gray-300 mt-3">
                        Share your thoughts with the world.
                    </p>
                </div>

                <form className="post-form space-y-6 bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

                    <div>
                        <label htmlFor="title"
                            className="block font-semibold text-gray-700 mb-2">
                            Post Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            placeholder="Enter post title..."
                            className="post-input w-full border border-gray-300 rounded-xl p-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="content"
                            className="block font-semibold text-gray-700 mb-2">
                            Post Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={10}
                            required
                            placeholder="Write your post here..."
                            className="post-input w-full border border-gray-300 rounded-xl p-3 resize-y"
                        />
                    </div>

                    <button
                        type="submit"
                        className="publish-btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl"
                    >
                        Publish Post
                    </button>

                </form>
            </div>
        </main>
    )
}
