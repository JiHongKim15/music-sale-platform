import React from "react";
import { Home, Users, MapPin, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

//푸터 컴포넌트
export function Footer() {
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
    <div className="w-full flex justify-center fixed bottom-0 left-1/2 -translate-x-1/2 bg-white border-t border-gray-200 shadow-md">
      <footer className="w-full max-w-2xl">
        <nav className="flex justify-around py-3">
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
        <div className="flex justify-center mt-1">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
      </footer>
    </div>
  );
}
