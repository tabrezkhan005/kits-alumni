"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import WowScript from "@/components/layout/WowScript";
import Spinner from "@/components/layout/Spinner";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const isStudentDashboard = pathname?.startsWith('/student-dashboard');
  const shouldHideNavbarAndFooter = isAdminPage || isStudentDashboard;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>KITS Alumni Association</title>
        <meta name="description" content="KKR & KSR Institute of Technology and Sciences Alumni Association for the Department of Artificial Intelligence & Machine Learning" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Google Web Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Montserrat:wght@200;400;600&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Spinner />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={5000}
          toastOptions={{
            style: {
              fontSize: '1.1rem',
              padding: '16px 20px',
              width: 'min(420px, calc(100vw - 30px))'
            }
          }}
        />
        {!shouldHideNavbarAndFooter && <Navbar />}
        <main className={`flex min-h-screen flex-col ${shouldHideNavbarAndFooter ? '' : 'pt-16'}`}>
          {children}
        </main>
        {!shouldHideNavbarAndFooter && <Footer />}
        {!shouldHideNavbarAndFooter && <BackToTop />}
        <WowScript />
      </body>
    </html>
  );
}
