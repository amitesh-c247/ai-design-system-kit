import React from 'react';
import styles from './styles.module.scss';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  return (
    <div className={`${styles.spinnerContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner; 