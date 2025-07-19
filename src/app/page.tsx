'use client';

import { GachaPull } from "@/components/features";
import { Button } from "@/components/ui";
import Link from "next/link";
import dynamic from 'next/dynamic';

const ClientOnlyGachaPull = dynamic(() => Promise.resolve(GachaPull), { 
  ssr: false 
});

export default function Home() {

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-retro-cream p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-medium text-retro-brown mb-2 font-bungee">KPop Idol Gacha</h1>
        <p className="text-retro-navy">Collect your favorite KPop idols!</p>
        
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="/">
            <Button className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm">
              Home
            </Button>
          </Link>
          
          <Link href="/collection">
            <Button className="bg-retro-teal hover:bg-retro-navy text-white font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm">
              My Collection
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="flex flex-col items-center py-8">
        <section className="w-full">
          <ClientOnlyGachaPull />
        </section>
      </main>
      
      <footer className="py-6 text-center text-retro-brown">
        <p>© 2025 KPop Pulls Collection</p>
      </footer>
    </div>
  );
}
