'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import styles from './styles.module.scss';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: 'John Doe',
    avatar: '/avatar-placeholder.png'
  };

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

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
  };

  return (
    <header className={styles.header}>

      <div className={styles.headerRight}>
        {/* Theme Toggle Button */}
        <button 
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Section */}
        <div className={styles.userSection} ref={dropdownRef}>
          <button 
            className={styles.userButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles.avatar}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <User size={24} />
              )}
            </div>
            <span className={styles.userName}>{user.name}</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem}>
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button 
                className={styles.dropdownItem}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 