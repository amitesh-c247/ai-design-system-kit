'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();
  const router = useRouter();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.rightSection}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className={styles.userSection} ref={dropdownRef}>
            <button
              className={styles.userButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className={styles.avatar}>
                <User size={24} />
              </div>
              <span className={styles.userName}>
                {user?.data?.display_name || 'User'}
              </span>
            </button>

            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <div className={styles.userInfo}>
                    <span className={styles.name}>
                      {user?.data?.display_name || 'User'}
                    </span>
                    <span className={styles.email}>{user?.data?.email}</span>
                  </div>
                </div>
                <div className={styles.dropdownDivider} />
                <button
                  onClick={() => {
                    router.push('/profile')
                    setIsDropdownOpen(false)
                  }}
                  className={styles.dropdownItem}
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;