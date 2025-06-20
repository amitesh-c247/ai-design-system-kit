import type { Metadata } from "next";
import Header from "@/components/header-sidebar/header/header";
import Sidebar from "@/components/header-sidebar/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard template",
};

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex flex-column collesped-sidebar">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="dashboard-container flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
