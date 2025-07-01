'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import LogoIcon from '@/assets/images/logo-icon.svg';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import styles from './styles.module.scss';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users size={20} />,
    path: '/users',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart2 size={20} />,
    path: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    path: '/settings',
  },
  {
    id: 'support',
    label: 'Support',
    icon: <HelpCircle size={20} />,
    path: '/support',
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: <HelpCircle size={20} />,
    path: '/faq',
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className={styles.mobileMenuButton}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          ${styles.sidebar}
          ${isCollapsed ? styles.collapsed : ''}
          ${isCollapsed ? 'collapsed-sidebar' : ''}
          ${isMobileMenuOpen ? styles.mobileOpen : ''}
        `}
      >
        {/* Logo Section */}
        <div className={styles.logo}>
          <Image
            src={LogoIcon}
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
          {!isCollapsed && <span>Frontend</span>}
        </div>

        {/* Toggle Button */}
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Navigation Menu */}
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`${styles.navItem} ${
                pathname === item.path ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {!isCollapsed && (
                <span className={styles.label}>{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
};

export default Sidebar;