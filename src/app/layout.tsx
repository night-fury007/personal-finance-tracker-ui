import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Wealth Engine",
  description: "Multi-currency financial wealth and portfolio architect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen overflow-hidden flex bg-slate-50 text-slate-900 m-0">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto p-8 min-h-0 bg-slate-50">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}