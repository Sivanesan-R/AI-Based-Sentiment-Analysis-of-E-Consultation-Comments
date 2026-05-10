import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserActions() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full bg-gray-100 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex gap-3">
        <Link
          to="/settings"
          className="bg-yellow-400 text-black px-3 py-2 rounded-md"
        >
          Settings
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
