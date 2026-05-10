import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [color, setColor] = useState(user?.color || "#10b981"); // Default emerald green

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ email, password, color });
    alert("✅ Settings Updated!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4 py-8">
      <div
        className="w-full max-w-lg bg-cream border border-emerald-500 rounded-2xl shadow-xl p-8"
        style={{ borderColor: color }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: color }}
        >
          ⚙️ Account Settings
        </h2>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Email */}
          <div>
            <label className="block text-emerald-600 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-400 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-emerald-600 font-semibold mb-2">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-emerald-400 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Theme Color */}
          <div>
            <label className="block text-emerald-600 font-semibold mb-2">
              Theme Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 border border-emerald-400 rounded-md cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 shadow-md hover:shadow-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
