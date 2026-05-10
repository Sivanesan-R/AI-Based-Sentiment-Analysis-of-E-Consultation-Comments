import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Sidebar() {
  const { user, login, logout } = useAuth();
  const [showCredentials, setShowCredentials] = useState(false);

  if (!user) {
    return (
      <aside className="w-1/4 bg-white border-l border-gray-200 p-4 flex flex-col gap-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            login(
              form.username.value,
              form.email.value,
              form.companyId.value,
              form.password.value
            );
          }}
          className="flex flex-col gap-3"
        >
          <input
            name="username"
            placeholder="Username"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            name="companyId"
            placeholder="Company ID"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition">
            Login
          </button>
        </form>
      </aside>
    );
  }

  return (
    <aside className="w-1/4 bg-white border-l border-gray-200 p-4 flex flex-col gap-4 shadow-sm">
      <button
        onClick={() => setShowCredentials(!showCredentials)}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition"
      >
        User Credentials
      </button>
      {showCredentials && (
        <div className="bg-gray-50 border border-gray-200 shadow p-3 rounded">
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Company ID:</strong> {user.companyId}</p>
        </div>
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
        Settings
      </button>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
      >
        Logout
      </button>
    </aside>
  );
}
