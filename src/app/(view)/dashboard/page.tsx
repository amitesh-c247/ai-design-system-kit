'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Dashboard = () => {
  const { user, isLoadingUser, isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoadingUser, router]);

  if (isLoadingUser) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Welcome, {user.data.display_name || 'User'}</h1>
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