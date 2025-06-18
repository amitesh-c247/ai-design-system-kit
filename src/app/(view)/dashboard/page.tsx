'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Dashboard = () => {
  const { user, isLoadingUser, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    console.log('Dashboard effect:', { user, isLoadingUser, isAuthenticated });
    
    if (!isLoadingUser) {
      if (!isAuthenticated || !user) {
        console.log('Redirecting to login...');
        router.replace('/login');
      }
    }
  }, [user, isLoadingUser, isAuthenticated, router]);

  React.useEffect(() => {
    if (user) {
      console.log(user, 'User Data:', {
        success: true,
        user: {
          data: user
        }
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  if (isLoadingUser) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }
console.log("user  => ",user)
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Welcome, {user.data.display_name || 'User'}</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2>Dashboard Overview</h2>
          <p>Welcome to your dashboard. This is where you can manage your account and view important information.</p>
          <div className={styles.userInfo}>
            <h3>Your Information</h3>
            <p>Email: {user.data.email}</p>
            {user.data.first_name && <p>First Name: {user.data.first_name}</p>}
            {user.data.last_name && <p>Last Name: {user.data.last_name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 