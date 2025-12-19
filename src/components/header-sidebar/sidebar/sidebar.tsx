"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoIcon from "@/assets/images/logo-icon.svg";
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  Book,
  MessageCircle,
  FileText,
  Upload,
} from "lucide-react";
import classNames from "classnames";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    id: "users",
    label: "Users",
    icon: <Users size={20} />,
    path: "/users",
  },
  {
    id: "cms",
    label: "CMS",
    icon: <Book size={20} />,
    path: "/cms",
  },
  {
    id: "documents",
    label: "Documents",
    icon: <FileText size={20} />,
    path: "/documents",
  },
  {
    id: "bulk-import",
    label: "Bulk Import",
    icon: <Upload size={20} />,
    children: [
      {
        id: "bulk-import-faq",
        label: "FAQ",
        icon: <MessageCircle size={16} />,
        path: "/bulk-import/faq",
      },
      {
        id: "bulk-import-user",
        label: "User",
        icon: <Users size={16} />,
        path: "/bulk-import/users",
      },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    icon: <MessageCircle size={20} />,
    path: "/faq",
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle click outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  // Keep accordion open if we're on a bulk import route
  useEffect(() => {
    if (pathname.startsWith("/bulk-import")) {
      setOpenAccordions((prev) =>
        prev.includes("bulk-import") ? prev : [...prev, "bulk-import"]
      );
    }
  }, [pathname]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const toggleAccordion = (itemId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className="app-mobile-menu-btn"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={classNames(
          "app-sidebar",
          {
            "app-sidebar-collapsed": isCollapsed,
            "collapsed-sidebar": isCollapsed,
            "app-sidebar-mobile-open": isMobileMenuOpen,
          }
        )}
      >
        {/* Logo Section */}
        <div className="d-flex align-items-center gap-2 p-1 mb-4">
          <Image
            src={LogoIcon}
            alt="Logo"
            width={40}
            height={40}
          />
          {!isCollapsed && <span className="fs-md">Frontend</span>}
        </div>

        {/* Toggle Button */}
        <button
          className="app-sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRight size={20} color="var(--bs-light)"/> : <ChevronLeft size={20} color="var(--bs-light)" />}
        </button>

        {/* Navigation Menu */}
        <nav className="d-flex flex-column gap-1 flex-grow-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.children ? (
                // Accordion Item
                <div className="mb-1">
                  <button
                    className={classNames(
                      "app-nav-item w-100 border-0 bg-transparent",
                      "position-relative"
                    )}
                    onClick={() => toggleAccordion(item.id)}
                  >
                    <span className="d-flex align-items-center justify-content-center" style={{ minWidth: "24px" }}>{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="fs-sm fw-medium">{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={classNames(
                            "app-accordion-chevron",
                            {
                              "app-accordion-chevron-open": openAccordions.includes(item.id),
                            }
                          )}
                        />
                      </>
                    )}
                  </button>
                  {!isCollapsed && openAccordions.includes(item.id) && (
                    <div className="app-accordion-content">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.path!}
                          className={classNames(
                            "app-nav-item app-nav-sub-item",
                            {
                              "app-nav-item-active": pathname === child.path,
                            }
                          )}
                        >
                          <span className="app-nav-icon d-flex align-items-center justify-content-center">{child.icon}</span>
                          <span className="fs-xs">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular Item
                <Link
                  href={item.path!}
                  className={classNames(
                    "app-nav-item",
                    {
                      "app-nav-item-active": pathname === item.path,
                    }
                  )}
                >
                  <span className="d-flex align-items-center justify-content-center" style={{ minWidth: "24px" }}>{item.icon}</span>
                  {!isCollapsed && (
                    <span className="fs-sm fw-medium">{item.label}</span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
