import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import defaultLogo from "../assets/WhatsApp Image 2025-09-17 at 21.15.55_249ecaa2.jpg";

export default function Header() {
  const { user } = useAuth();
  const [logo] = useState(defaultLogo);
  const navigate = useNavigate();
  const location = useLocation();

  // Get search query from URL on initial load
  const params = new URLSearchParams(location.search);
  const [search, setSearch] = useState(params.get("q") || "");

  // Update URL when search changes
  useEffect(() => {
    const currentQuery = new URLSearchParams(location.search).get("q") || "";
    if (search !== currentQuery) {
      navigate(`/?q=${encodeURIComponent(search)}`, { replace: true });
    }
  }, [search]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        
        {/* Logo */}
        <div
          className="flex items-center gap-4 cursor-pointer transform hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className="h-14 w-14 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-emerald-600 shadow-md hover:shadow-emerald-400 transition-shadow duration-300"
          />
          <div className="flex flex-col">
            <div className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-wide drop-shadow-sm">
              समीक्षा
            </div>
            <div className="text-sm sm:text-base text-gray-500 font-light tracking-wide">
              SAMIKSHA
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:flex-1 max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-5 py-3 rounded-full bg-gray-100 border border-gray-300 text-slate-700 placeholder-gray-400 text-base sm:text-lg focus:outline-none 
                       focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-sm transition-all duration-300"
          />
        </div>

        {/* User Section */}
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          {user ? (
            <div
              className="text-base sm:text-lg font-semibold bg-gray-100 px-6 py-2 rounded-full border-2 border-emerald-600 shadow-sm hover:shadow-md hover:shadow-emerald-400 hover:scale-105 transition-all duration-300"
              style={{ color: user.color || "#065f46" }}
            >
              Welcome, {user.name}
            </div>
          ) : (
            <div className="text-base sm:text-lg font-semibold text-gray-600 bg-gray-100 px-6 py-2 rounded-full border-2 border-gray-300 shadow-sm hover:shadow-md hover:shadow-emerald-400 hover:scale-105 transition-all duration-300">
              Guest Mode
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
