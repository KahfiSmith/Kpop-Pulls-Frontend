"use client";

import { IdolCard, IdolDetailModal } from "@/components/features";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { groups } from "@/data/groups";
import { Idol } from "@/data/idols";
import { rarities, RarityType } from "@/data/rarities";
import { CollectionFilters, CollectionShareData } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SharedCollectionContent() {
  const searchParams = useSearchParams();
  const [sharedData, setSharedData] = useState<CollectionShareData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<CollectionFilters>({
    rarity: "all",
    group: "all",
    search: "",
  });

  const [selectedIdol, setSelectedIdol] = useState<Idol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      const encodedData = searchParams.get("data");

      if (!encodedData) {
        setError("No collection data found");
        setIsLoading(false);
        return;
      }

      const decodedData = JSON.parse(atob(decodeURIComponent(encodedData)));

      if (
        !decodedData.collection ||
        !decodedData.userId ||
        !decodedData.sharedAt
      ) {
        setError("Invalid collection data");
        setIsLoading(false);
        return;
      }

      if (decodedData.expiresAt) {
        const expiryDate = new Date(decodedData.expiresAt);
        if (expiryDate < new Date()) {
          setError("This shared collection has expired");
          setIsLoading(false);
          return;
        }
      }

      setSharedData(decodedData);
    } catch (err) {
      console.error("Error parsing shared data:", err);
      setError("Could not load the shared collection");
    }

    setIsLoading(false);
  }, [searchParams]);

  const openIdolDetails = (idol: Idol) => {
    setSelectedIdol(idol);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredItems =
    sharedData?.collection.items.filter((item) => {
      if (filters.rarity !== "all" && item.idol.rarity !== filters.rarity) {
        return false;
      }

      if (filters.group !== "all" && item.idol.group !== filters.group) {
        return false;
      }

      if (
        filters.search &&
        !item.idol.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    }) || [];

  const totalCards =
    sharedData?.collection.items.reduce((sum, item) => sum + item.count, 0) ||
    0;
  const uniqueCards = sharedData?.collection.items.length || 0;

  const formattedSharedDate = sharedData?.sharedAt
    ? new Date(sharedData.sharedAt).toLocaleDateString()
    : "";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-retro-cream p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold text-retro-brown mb-2">
          Shared Idol Collection
        </h1>
        {sharedData && (
          <p className="text-retro-navy">
            Shared by User {sharedData.userId.substring(0, 8)}... on{" "}
            {formattedSharedDate}
          </p>
        )}

        <div className="mt-4">
          <Link href="/">
            <Button className="bg-retro-navy hover:bg-retro-teal text-white font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,128,128,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,128,128,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-retro-brown"></div>
          </div>
        ) : error ? (
          <div className="bg-retro-coral text-white p-4 rounded-lg max-w-md mx-auto text-center">
            <p className="text-lg font-bold mb-2">Error</p>
            <p>{error}</p>
            <Link href="/collection" className="block mt-4">
              <Button className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200">
                Go to My Collection
              </Button>
            </Link>
          </div>
        ) : sharedData ? (
          <>
            <div className="w-full max-w-7xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center bg-retro-mint p-4 rounded-lg border-3 border-retro-brown">
                <div className="mb-4 md:mb-0">
                  <p className="text-retro-brown font-bold">Collection Stats:</p>
                  <p className="text-retro-navy">
                    {totalCards} total cards ({uniqueCards} unique)
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Link href="/collection">
                    <Button className="bg-retro-teal hover:bg-retro-navy text-white font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm">
                      My Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full max-w-7xl mx-auto mb-8">
              <div className="bg-retro-cream p-4 rounded-lg border-3 border-retro-brown">
                <h2 className="text-xl font-bold text-retro-brown mb-4">
                  Filters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label
                      htmlFor="rarity-filter"
                      className="block text-retro-brown font-medium mb-2"
                    >
                      Rarity
                    </Label>
                    <Select
                      value={filters.rarity}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          rarity: value as RarityType | "all",
                        }))
                      }
                    >
                      <SelectTrigger
                        id="rarity-filter"
                        className="w-full px-3 py-2 bg-white border-2 border-retro-brown rounded-md focus:outline-none focus:ring-2 focus:ring-retro-yellow"
                      >
                        <SelectValue placeholder="Select rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Rarities</SelectItem>
                        {Object.values(rarities).map((rarity) => (
                          <SelectItem key={rarity.id} value={rarity.id}>
                            {rarity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="group-filter"
                      className="block text-retro-brown font-medium mb-2"
                    >
                      Group
                    </Label>
                    <Select
                      value={filters.group}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, group: value }))
                      }
                    >
                      <SelectTrigger
                        id="group-filter"
                        className="w-full px-3 py-2 bg-white border-2 border-retro-brown rounded-md focus:outline-none focus:ring-2 focus:ring-retro-yellow"
                      >
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Groups</SelectItem>
                        {groups.map((group) => (
                          <SelectItem key={group.id} value={group.name}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="search-filter"
                      className="block text-retro-brown font-medium mb-2"
                    >
                      Search
                    </Label>
                    <input
                      id="search-filter"
                      type="text"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          search: e.target.value,
                        }))
                      }
                      placeholder="Search by name..."
                      className="w-full px-3 py-2 bg-white border-2 border-retro-brown rounded-md focus:outline-none focus:ring-2 focus:ring-retro-yellow"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-retro-brown mb-6">
                {filteredItems.length > 0
                  ? `Shared Collection (${filteredItems.length} cards)`
                  : "No cards match your filters"}
              </h2>

              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                  {filteredItems.map((item) => (
                    <div key={item.idol.id} className="relative">
                      <div className="absolute -top-2 -right-2 bg-retro-brown text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
                        {item.count}
                      </div>
                      <IdolCard
                        name={item.idol.name}
                        group={item.idol.group}
                        birthdate={item.idol.birthdate}
                        birthplace={item.idol.birthplace}
                        position={item.idol.position}
                        quote={item.idol.quote}
                        imageSrc={item.idol.image}
                        rarity={item.idol.rarity}
                        onViewProfile={() => openIdolDetails(item.idol)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-retro-navy text-lg">
                    No cards match your filters.
                  </p>
                  <p className="text-retro-navy mt-2">
                    Try adjusting your filters!
                  </p>
                </div>
              )}
            </div>
          </>
        ) : null}
      </main>

      <footer className="py-6 text-center text-retro-brown">
        <p>© 2025 KPop Pulls Collection</p>
      </footer>

      <IdolDetailModal
        idol={selectedIdol}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default function SharedCollectionPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-retro-brown"></div>
      </div>
    }>
      <SharedCollectionContent />
    </Suspense>
  );
}
