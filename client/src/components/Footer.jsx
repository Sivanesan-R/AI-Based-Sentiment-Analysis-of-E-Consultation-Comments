import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-6 py-6 flex flex-col items-center">
        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>

        {/* Subtle Gradient Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full mt-2"></div>
      </div>
    </footer>
  );
}
