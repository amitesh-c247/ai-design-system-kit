"use client";

import React from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fs-xxl fw-bold">{t("welcome", { name: user.name || "User" })}</h1>
      </div>
      <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div className="card shadow-sm">
          <div className="card-body p-3">
            <h2 className="fs-lg fw-medium mb-2">{t("overview")}</h2>
            <p className="text-muted">{t("info")}</p>
            <div className="mt-4 pt-3 border-top">
              <h3 className="fs-md fw-medium mb-2">{t("yourInformation")}</h3>
              <p className="mb-1 text-muted">
                {t("email")}: {user.email}
              </p>
              {user.first_name && (
                <p className="mb-1 text-muted">
                  {t("firstName")}: {user.first_name}
                </p>
              )}
              {user.last_name && (
                <p className="mb-1 text-muted">
                  {t("lastName")}: {user.last_name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
