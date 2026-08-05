import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'پدیده | قطعات موبایل و تعمیرات',
    template: '%s | پدیده',
  },
  description:
    'پدیده - بزرگترین فروشگاه آنلاین قطعات یدکی موبایل، تجهیزات تعمیر و ابزار تخصصی. خرید اقساطی، ضمانت اصالت کالا، ارسال سریع.',
  keywords: [
    'قطعات موبایل',
    'تعمیر موبایل',
    'LCD موبایل',
    'باتری موبایل',
    'تجهیزات تعمیر',
    'پدیده',
  ],
  authors: [{ name: 'پدیده' }],
  creator: 'پدیده',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    title: 'پدیده | قطعات موبایل و تعمیرات',
    description: 'بزرگترین فروشگاه تخصصی قطعات یدکی موبایل و تجهیزات تعمیر در ایران',
    siteName: 'پدیده',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پدیده | قطعات موبایل و تعمیرات',
    description: 'بزرگترین فروشگاه تخصصی قطعات یدکی موبایل و تجهیزات تعمیر در ایران',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1565C0' },
    { media: '(prefers-color-scheme: dark)', color: '#0D47A1' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} bg-background`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster richColors position="top-center" />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
