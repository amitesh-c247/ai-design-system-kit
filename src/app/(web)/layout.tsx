import type { Metadata } from "next";
import WebHeader from "../../components/web/WebHeader";
import WebFooter from "../../components/web/WebFooter";
import styles from "../../components/web/web.module.scss";

export const metadata: Metadata = {
  title: "Web Pages",
  description: "Web page template",
};

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles["web-layout"]}>
      <WebHeader />
      <main className={styles["web-main-content"]}>{children}</main>
      <WebFooter />
    </div>
  );
}
