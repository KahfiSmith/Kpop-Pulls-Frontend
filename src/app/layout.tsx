import type { Metadata } from "next";
import { Bungee } from 'next/font/google';
import "./globals.css";

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
})

export const metadata: Metadata = {
  title: "KPopPulls - Collect Your Favorite K-Pop Idols",
  description: "Pull and collect your favorite K-Pop idols in this gacha game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bungee.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
