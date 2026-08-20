import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-700 text-lg border-b-2 border-emerald-500 pb-1">
          You must be logged in.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <h1 className="text-4xl font-bold text-emerald-600 mb-8">User Credentials</h1>

      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex flex-col">
          <label className="text-emerald-500 text-sm font-semibold mb-1">Name</label>
          <span className="px-2 py-1 border-b border-gray-300">{user.name}</span>
        </div>
        <div className="flex flex-col">
          <label className="text-emerald-500 text-sm font-semibold mb-1">Email</label>
          <span className="px-2 py-1 border-b border-gray-300">{user.email}</span>
        </div>
        <div className="flex flex-col">
          <label className="text-emerald-500 text-sm font-semibold mb-1">Password</label>
          <span className="px-2 py-1 border-b border-gray-300">{user.password}</span>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              logout();
              nav("/");
            }}
            className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 hover:shadow-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
