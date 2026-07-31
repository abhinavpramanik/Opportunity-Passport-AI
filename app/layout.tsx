import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Opportunity Passport AI — One Intelligent Passport. Unlimited Opportunities.",
  description:
    "AI-powered personal opportunity intelligence platform that transforms your resume into a living digital passport for careers, scholarships, government schemes, finance, and global mobility.",
  keywords: [
    "opportunity passport",
    "AI career platform",
    "scholarship finder",
    "Singapore jobs",
    "government schemes",
    "career intelligence",
  ],
  openGraph: {
    title: "Opportunity Passport AI",
    description: "One Intelligent Passport. Unlimited Opportunities.",
    type: "website",
  },
};

import { AppShell } from "@/components/layout/AppShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-dark-bg`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
