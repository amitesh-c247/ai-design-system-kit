"use client";

import React from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./styles.module.scss";
import LoadingSpinner from "@/components/pure-components/LoadingSpinner";

const Dashboard = () => {
  const t = useTranslations("dashboard");
  const { user, isLoadingUser, isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoadingUser, router]);

  if (isLoadingUser) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated || !user || !user.data) {
    return null;
  }

  const userData = user.data;

  return (
    <div className={`${styles.dashboardContainer}`}>
      <div className={styles.header}>
        <h1>{t("welcome", { name: userData.displayName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || "User" })}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2>{t("overview")}</h2>
          <p>{t("info")}</p>
          <div className={styles.userInfo}>
            <h3>{t("yourInformation")}</h3>
            <p>
              {t("email")}: {userData.email}
            </p>
            {userData.first_name && (
              <p>
                {t("firstName")}: {userData.first_name}
              </p>
            )}
            {userData.last_name && (
              <p>
                {t("lastName")}: {userData.last_name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
