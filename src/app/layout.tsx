import type { Metadata } from 'next'
import './globals.css'
import '../../assets/scss/admin.scss'
import { Providers } from "./providers";
import { NextIntlClientProvider } from 'next-intl';
import { messages } from '@/locales';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Modern admin dashboard template',
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
