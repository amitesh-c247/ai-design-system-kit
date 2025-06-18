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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
