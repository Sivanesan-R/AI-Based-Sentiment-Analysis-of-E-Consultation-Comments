import React from "react";
import { useAuth } from "../context/AuthContext";
import PostCard from "./PostCard";
import { posts } from "../data/posts";
import { Link, useLocation } from "react-router-dom";

export default function Hero() {
  const { user } = useAuth();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("q")?.toLowerCase() || "";

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen p-4 bg-white"> {/* Global white background */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - User Info */}
        <div className="col-span-1 bg-cream border border-gray-200 rounded-xl p-6 shadow-md">
          {!user ? (
            <div className="flex flex-col gap-4 text-center text-slate-700">
              <h2 className="text-2xl font-bold">Welcome</h2>
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-500 transition"
              >
                Login to see posts
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-slate-800">
              <h2 className="text-xl font-semibold">Account</h2>
              <p>
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <div className="flex gap-3 mt-4">
                <Link
                  to="/profile"
                  className="px-3 py-1 border border-emerald-600 rounded-md text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                >
                  User Credentials
                </Link>
                <Link
                  to="/settings"
                  className="px-3 py-1 border border-blue-600 rounded-md text-blue-700 hover:bg-blue-600 hover:text-white transition"
                >
                  Settings
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right - Posts */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-4">
            {user ? (
              filteredPosts.length > 0 ? (
                filteredPosts.map((p) => <PostCard key={p.id} post={p} />)
              ) : (
                <div className="bg-cream border border-gray-200 rounded-xl p-6 text-center text-slate-600 shadow-sm">
                  No posts found for "{query}"
                </div>
              )
            ) : (
              <div className="bg-cream border border-gray-200 rounded-xl p-6 text-center text-slate-600 shadow-sm">
                You must login to view posts
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
