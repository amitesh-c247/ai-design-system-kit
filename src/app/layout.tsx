import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Providers } from './providers';

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
