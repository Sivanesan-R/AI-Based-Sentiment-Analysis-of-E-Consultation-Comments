import React from "react";
import { useParams } from "react-router-dom";
import { posts } from "../data/posts";

export default function PostDetails() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        Post not found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white/90 border border-gray-300 rounded-xl p-6 shadow-md">
      <h2 className="text-3xl font-bold text-gray-800">{post.title}</h2>
      <div className="text-sm text-gray-500 mt-1">
        Status: {post.draft ? "Draft" : "Published"}
      </div>
      <p className="mt-4 text-gray-700 leading-relaxed">{post.description}</p>
      <div className="mt-6 text-xs text-gray-400">
        More info: This is sample data.
      </div>
    </div>
  );
}
