import type { Metadata } from "next";
import { Providers } from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { messages } from "@/locales";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard template",
};

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  const colorScheme = theme === "dark" ? "dark" : "light";

  return (
    <html lang={locale} data-theme={theme}>
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
