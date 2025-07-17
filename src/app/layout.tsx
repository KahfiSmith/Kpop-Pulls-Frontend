import type { Metadata } from "next";
import { Bungee } from 'next/font/google';
import "@/app/globals.css";

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
})

export const metadata: Metadata = {
  title: "KPopPulls - Collect Your Favorite K-Pop Idols",
  description: "Pull and collect your favorite K-Pop idols in this gacha game",
  metadataBase: new URL('https://kpoppulls.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/images/gacha-machine.png"
          as="image"
          type="image/png"
        />
      </head>
      <body
        className={`${bungee.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
