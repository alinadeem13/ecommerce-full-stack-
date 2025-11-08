import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My E-Commerce App",
  description: "Professional React + Next.js + TypeScript Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <Providers>
          {/* <Navbar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
