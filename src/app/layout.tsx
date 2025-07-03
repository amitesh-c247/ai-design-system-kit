import type { Metadata } from "next";
import { Providers } from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { messages } from "@/locales";
import "./globals.css";
import "../../assets/scss/admin.scss";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard template",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  const colorScheme = theme === "dark" ? "dark" : "light";

  return (
    <html lang={locale} className={theme} style={{ colorScheme }}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages[locale as keyof typeof messages]}
        >
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
