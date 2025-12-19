"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import classNames from "classnames";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();
  const router = useRouter();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="app-header d-flex justify-content-between align-items-center p-2 px-4 bg-body border-bottom position-sticky top-0" style={{ height: "64px", zIndex: 100 }}>
      <div className="ms-auto">
        <div className="d-flex align-items-center gap-1 ms-auto">
          <button
            className="btn btn-link p-1 rounded-circle d-flex align-items-center justify-content-center text-body"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="position-relative" ref={dropdownRef}>
            <button
              className="btn btn-link d-flex align-items-center gap-2 p-1 rounded text-body"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                <User size={24} />
              </div>
              <span className="fs-sm fw-medium d-none d-md-inline">{user?.name || "User"}</span>
            </button>

            {isDropdownOpen && (
              <div className="app-header-dropdown position-absolute top-100 end-0 mt-1 bg-body border rounded shadow-sm" style={{ minWidth: "200px" }}>
                <div className="p-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-medium">{user?.name || "User"}</span>
                    <span className="fs-sm text-muted">{user?.email}</span>
                  </div>
                </div>
                <div className="border-top my-1" />
                <button
                  onClick={() => {
                    router.push("/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="btn btn-link d-flex align-items-center gap-2 w-100 text-start text-body p-2"
                >
                  <User size={16} />
                  <span className="fs-sm">Profile</span>
                </button>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-link d-flex align-items-center gap-2 w-100 text-start text-body p-2"
                >
                  <LogOut size={16} />
                  <span className="fs-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
