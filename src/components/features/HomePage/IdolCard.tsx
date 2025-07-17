import { Button } from "@/components/ui";
import { rarities, RarityType } from "@/data/rarities";
import { IdolCardProps } from "@/types";
import Image from "next/image";
import React from "react";

export const IdolCard: React.FC<IdolCardProps> = ({
  name,
  group,
  birthdate,
  birthplace,
  position,
  quote,
  imageSrc,
  rarity,
  onViewProfile,
}) => {
  const rarityStyles =
    rarity && rarities[rarity as RarityType]
      ? {
          borderColor: rarities[rarity as RarityType].borderColor,
          bgColor: rarities[rarity as RarityType].bgColor,
          textColor: rarities[rarity as RarityType].color,
        }
      : {
          borderColor: "border-retro-brown",
          bgColor: "bg-retro-teal",
          textColor: "text-retro-cream",
        };

  return (
    <div className="relative w-72">
      <div className="absolute -bottom-2 -right-2 w-full h-full bg-retro-yellow border-3 border-retro-brown rounded-lg"></div>
      <div className="relative bg-retro-cream border-3 border-retro-brown rounded-lg overflow-hidden">
      <div
          className="bg-retro-yellow h-8 flex items-center px-3 border-b-3 border-retro-brown justify-between"
        >
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-retro-coral border-2 border-retro-brown"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-retro-yellow border-2 border-retro-brown"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-retro-mint border-2 border-retro-brown"></div>
          </div>
          <div className="ml-2 text-retro-brown text-sm font-medium">
            {group}
          </div>
        </div>

        <div className="relative h-64 w-full">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${name} from ${group}`}
              fill
              className="object-cover max-w-[288px] max-h-[256px]"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQviwAAAABJRU5ErkJggg=="
            />
          ) : (
            <div className="bg-retro-sage h-64 flex items-center justify-center">
              <p className="text-retro-brown text-sm">Image not available</p>
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-bold text-retro-brown">
              {name}
            </h3>
            {rarity && (
              <div className={`flex items-center justify-center border-1 rounded-full ${rarityStyles.borderColor}`}>
                <div
                  className={`${rarityStyles.bgColor} px-2 py-0.5 rounded-full text-xs ${rarityStyles.textColor} font-medium`}
                >
                  {rarities[rarity as RarityType].name}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-retro-coral mr-1.5"></div>
            <p className="text-retro-navy text-xs">{birthdate}</p>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-retro-yellow mr-1.5"></div>
            <p className="text-retro-navy text-xs">{birthplace}</p>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-retro-mint mr-1.5"></div>
            <p className="text-retro-navy text-xs">{position}</p>
          </div>

          {quote && (
            <div className="mt-3 pt-3 border-t-1.5 border-dotted border-retro-brown">
              <p className="italic text-retro-navy text-xs">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          )}

          {onViewProfile && (
            <Button
              onClick={onViewProfile}
              className="mt-3 w-full bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-1.5 px-3 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-sm"
            >
              View Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
