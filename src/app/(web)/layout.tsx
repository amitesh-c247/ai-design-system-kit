import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import WebHeader from "../../components/web/WebHeader";
import WebFooter from "../../components/web/WebFooter";

export const metadata: Metadata = {
  title: "Web Pages",
  description: "Web page template",
};

export default function ViewLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <WebHeader />
      <main className="flex-grow-1">{children}</main>
      <WebFooter />
    </div>
  );
}
