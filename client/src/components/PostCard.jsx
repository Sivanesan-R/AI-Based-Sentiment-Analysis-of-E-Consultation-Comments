import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{post.title}</h3>
          <div
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              post.draft
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                : "bg-emerald-100 text-emerald-700 border border-emerald-300"
            }`}
          >
            {post.draft ? "Draft" : "Published"}
          </div>
        </div>
        <p
          className="mt-3 text-gray-600 cursor-pointer hover:text-emerald-600 transition"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {post.short}
        </p>
        <div className="mt-4">
          <button
            onClick={() => navigate(`/dashboard/${post.id}`)}
            className="px-4 py-2 rounded-lg border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-600 hover:text-white transition"
          >
            Details (Dashboard)
          </button>
        </div>
      </div>
    </div>
  );
}
