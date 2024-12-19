import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload: false
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: false
});

export const metadata: Metadata = {
  title: "The Last Dawn",
  description: "A visual novel about love and death",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
        </body>
      </Suspense>
    </html>
  );
}
