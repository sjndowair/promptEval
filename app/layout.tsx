import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import AuthProvider from "@/components/auth-provider"
import Header from "@/components/header"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

export const metadata: Metadata = {
  metadataBase: new URL('https://prompt-eval-pied.vercel.app'),
  title: "프롬프트 평가 서비스",
  description: "사용자의 프롬프트를 평가해주는 서비스입니다.",
  generator: 'v0.dev',
  icons: {
    icon: "/favicon-32x32.png",
  },
  openGraph: {
    title: "프롬프트 평가 서비스",
    description: "AI를 활용한 프롬프트 품질 평가 및 개선 서비스입니다.",
    url: "https://prompt-eval-pied.vercel.app", 
    siteName: "프롬프트 평가 서비스",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "프롬프트 평가 서비스 - AI로 프롬프트를 분석하고 개선하세요",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "프롬프트 평가 서비스",
    description: "AI를 활용한 프롬프트 품질 평가 및 개선 서비스입니다.",
    images: [{
      url: "meta.png",
      alt: "프롬프트 평가 서비스 - AI로 프롬프트를 분석하고 개선하세요",
    }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {GA_MEASUREMENT_ID && (
          <>
          <Script
           src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
           strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive" >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <QueryProvider>
            <AuthProvider>
              <Header />
              <main className="min-h-screen pt-16">{children}</main>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
