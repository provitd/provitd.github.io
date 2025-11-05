// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from './components/navbar'
import Footer from './components/footer'
import Providers from "./providers"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROVitD - Laverny Group Website",
  description: "PROVitD - Pathophysiological Role Of Vitamin D - Laverny's Group at IGBMC. Investigating the molecular mechanisms by which vitamin D signaling influences cellular processes and disease progression.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-(--background) text-(--foreground)">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full overflow-y-auto overflow-x-hidden antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
