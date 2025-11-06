import React from "react";
import { useNavigate } from "react-router-dom";

//푸터 컴포넌트
export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/about")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          About
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Contact
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Login
        </button>
      </div>
    </footer>
  );
}
