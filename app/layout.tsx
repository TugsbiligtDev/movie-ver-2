import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Z",
  description:
    "Discover the latest movies, TV shows, and trailers. Browse by genre, search for your favorites, and watch trailers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/movie.png" type="image/png" />
        <link rel="apple-touch-icon" href="/movie.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors`}
      >
        <ThemeProvider>
          <Header />
          <main className="pb-12">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
