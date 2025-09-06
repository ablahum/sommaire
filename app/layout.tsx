import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import { Toaster } from '@/components/ui/sonner'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Sommaire - AI-Powered PDF Summarization',
  description:
    'Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className='relative flex min-h-screen flex-col'>
            <Header />

            <main className='flex-1'>{children}</main>

            <Footer />
          </div>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
