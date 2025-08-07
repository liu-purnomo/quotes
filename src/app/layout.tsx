/**
 * Root Layout Component
 * 
 * This is the main layout component that wraps all pages in the application.
 * It sets up the basic HTML structure, fonts, and metadata for the site.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Configure Geist Sans font
 * A modern, clean sans-serif font for the main text
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configure Geist Mono font
 * A monospace font for code blocks and technical content
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application metadata
 * Defines the title and description for SEO and browser tabs
 */
export const metadata: Metadata = {
  title: "Kutipan Inspiratif Bahasa Indonesia",
  description: "Aplikasi kutipan inspiratif dalam Bahasa Indonesia",
};

/**
 * Root Layout Component
 * 
 * This component serves as the main layout wrapper for all pages in the application.
 * It applies the configured fonts and sets up the basic HTML structure.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered inside the layout
 * @returns {JSX.Element} The rendered layout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Render the page content */}
        {children}
      </body>
    </html>
  );
}
