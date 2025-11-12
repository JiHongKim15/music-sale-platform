import React from "react";
import { Home, Users, MapPin, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

//푸터 컴포넌트
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Users size={22} />, path: "/community" },
    { icon: <MapPin size={22} />, path: "/map" },
    { icon: <Home size={22} />, path: "/" },
    { icon: <MessageCircle size={22} />, path: "/chat" },
    { icon: <User size={22} />, path: "/profile" },
  ];

  return (
    <footer
      className="fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-[672px]
        bg-white border-t border-gray-200 shadow-md
        z-[100]"
    >
      <nav className="flex justify-around py-6">
        {navItems.map(({ icon, path }, index) => (
          <button
            key={index}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center ${
              location.pathname === path ? "text-black" : "text-gray-400"
            }`}
          >
            {icon}
          </button>
        ))}
      </nav>
    </footer>
  );
}
