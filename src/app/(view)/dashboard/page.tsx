'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Dashboard = () => {
  const t = useTranslations('dashboard');
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
        <h1>{t('welcome', { name: user.data.display_name || 'User' })}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2>{t('overview')}</h2>
          <p>{t('info')}</p>
          <div className={styles.userInfo}>
            <h3>{t('yourInformation')}</h3>
            <p>{t('email')}: {user.data.email}</p>
            {user.data.first_name && <p>{t('firstName')}: {user.data.first_name}</p>}
            {user.data.last_name && <p>{t('lastName')}: {user.data.last_name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 