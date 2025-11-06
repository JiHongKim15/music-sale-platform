import React from "react";
import { Link } from "react-router-dom";

//헤더 컴포넌트
export function Header() {
  return (
    <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold">My App</h1>
      <nav className="flex gap-4">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
      </nav>
    </header>
  );
}
