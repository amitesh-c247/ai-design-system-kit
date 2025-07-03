import type { Metadata } from 'next'
import { Providers } from "./providers";
import { NextIntlClientProvider } from 'next-intl';
import { messages } from '@/locales';
import './globals.css'
import '../../assets/scss/admin.scss'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Modern admin dashboard template',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages[locale as keyof typeof messages]}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
