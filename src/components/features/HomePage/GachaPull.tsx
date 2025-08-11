import { OptimizedImage } from "@/components/common/OptimizedImage";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { pityConfig, rarities } from "@/data/rarities";
import { useGacha, useSoundEffects } from "@/hooks";
import { useEffect, useState } from "react";

export const GachaPull: React.FC = () => {
  const {
    pullIdol,
    animation,
    skipAnimation,
    pullHistory,
    pityCounter,
    stats,
  } = useGacha();
  const { playSound, isMuted, toggleMute } = useSoundEffects();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (animation.isPlaying && !isMuted) {
      switch (animation.step) {
        case "pulling":
          break;
        case "reveal":
          playSound("/sounds/anime-wow.mp3");
          break;
      }
    }
  }, [
    animation.isPlaying,
    animation.step,
    animation.result,
    isMuted,
    playSound,
  ]);

  const handlePull = () => {
    pullIdol();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-retro-cream border-3 border-retro-brown rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-retro-brown mb-4 text-center">
          Idol Gacha
        </h2>

        <div className="relative h-96 w-full bg-retro-navy border-3 border-retro-brown rounded-lg mb-6 overflow-hidden">
          {animation.isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {animation.step === "pulling" && (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-24 h-24 bg-retro-yellow rounded-full animate-spin border-8 border-retro-brown border-t-transparent"></div>
                  <p className="text-retro-cream mt-4 text-xl font-bold">
                    Pulling...
                  </p>
                </div>
              )}

              {animation.step === "reveal" && animation.result && (
                <div className="animate-fadeIn">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 ${
                        rarities[animation.result.idol.rarity].bgColor
                      } opacity-30`}
                    ></div>
                    <div className="transform scale-110 animate-scaleIn">
                      {animation.result.idol.image && (
                        <div className="relative">
                          <OptimizedImage
                            src={animation.result.idol.image}
                            alt={animation.result.idol.name}
                            width={300}
                            height={300}
                            className="rounded-lg border-4 border-retro-brown shadow-lg h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {animation.step === "complete" && animation.result && (
                <div className="flex flex-col items-center animate-fadeIn transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 ${
                        rarities[animation.result.idol.rarity].bgColor
                      } opacity-30`}
                    ></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center animate-slideUp">
                    <div className="text-center">
                      <p className="text-retro-cream text-xl font-bold mb-2">
                        {animation.result.pityPull
                          ? "Pity activated!"
                          : "Congratulations!"}
                      </p>
                      <p className="text-retro-yellow text-lg mb-4">
                        You pulled a{" "}
                        {rarities[animation.result.idol.rarity].name} card!
                      </p>
                      <Button
                        data-cy="continue-button"
                        onClick={() => skipAnimation()}
                        className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-2 px-6 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src="/images/gacha-machine.png"
                alt="Gacha Machine"
                width={170}
                height={170}
                className="mb-6"
                style={{ imageRendering: "crisp-edges" }}
              />
              <p className="text-retro-cream text-lg mb-6">
                Pull an idol card!
              </p>
              <Button
                data-cy="gacha-pull-button"
                onClick={handlePull}
                className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-2 px-6 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-lg"
              >
                Pull Card
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Button
                data-cy="toggle-mute-button"
                onClick={toggleMute}
                className="bg-retro-sage hover:bg-retro-teal text-retro-brown font-medium py-1 px-2 rounded-md border-2 border-retro-brown transition-all duration-200"
              >
                {isMuted ? "Unmute 🔇" : "Mute 🔊"}
              </Button>

              <Button
                data-cy="toggle-stats-button"
                onClick={() => setShowStats(!showStats)}
                className="bg-retro-mint hover:bg-retro-teal text-retro-brown font-medium py-1 px-2 rounded-md border-2 border-retro-brown transition-all duration-200"
              >
                {showStats ? "Hide Stats" : "Show Stats"}
              </Button>
            </div>
          </div>

          <div className="text-retro-brown">
            <p className="font-medium mb-1">Pity Progress:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="bg-blue-100 px-2 py-1 rounded border border-blue-400 text-blue-700">
                <span className="font-medium">Rising Star:</span>{" "}
                {pityCounter.rare}/{pityConfig.rare}
              </div>
              <div className="bg-purple-100 px-2 py-1 rounded border border-purple-400 text-purple-700">
                <span className="font-medium">Superstar:</span>{" "}
                {pityCounter.epic}/{pityConfig.epic}
              </div>
              <div className="bg-orange-100 px-2 py-1 rounded border border-orange-400 text-orange-700">
                <span className="font-medium">Idol Queen:</span>{" "}
                {pityCounter.legendary}/{pityConfig.legendary}
              </div>
              <div className="bg-pink-100 px-2 py-1 rounded border border-pink-400 text-pink-700">
                <span className="font-medium">Ultimate Bias:</span>{" "}
                {pityCounter.mythical}/{pityConfig.mythical}
              </div>
            </div>
          </div>
        </div>

        {showStats && (
          <div className="mt-6 p-4 bg-retro-sage border-2 border-retro-brown rounded-lg" data-cy="stats-panel">
            <h3 className="text-lg font-bold text-retro-brown mb-2">
              Pull Statistics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="bg-white p-2 rounded border-2 border-retro-brown">
                <p className="text-xs font-medium">Total Pulls</p>
                <p className="text-lg font-bold">{stats.totalPulls}</p>
              </div>

              <div className="bg-gray-200 p-2 rounded border-2 border-retro-brown">
                <p className="text-xs font-medium">Rookie</p>
                <p className="text-lg font-bold">
                  {stats.rarityDistribution.common}
                </p>
                <p className="text-xs">
                  {stats.totalPulls > 0
                    ? Math.round(
                        (stats.rarityDistribution.common / stats.totalPulls) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>

              <div className="bg-blue-200 p-2 rounded border-2 border-retro-brown">
                <p className="text-xs font-medium">Rising Star</p>
                <p className="text-lg font-bold">
                  {stats.rarityDistribution.rare}
                </p>
                <p className="text-xs">
                  {stats.totalPulls > 0
                    ? Math.round(
                        (stats.rarityDistribution.rare / stats.totalPulls) * 100
                      )
                    : 0}
                  %
                </p>
              </div>

              <div className="bg-purple-200 p-2 rounded border-2 border-retro-brown">
                <p className="text-xs font-medium">Superstar</p>
                <p className="text-lg font-bold">
                  {stats.rarityDistribution.epic}
                </p>
                <p className="text-xs">
                  {stats.totalPulls > 0
                    ? Math.round(
                        (stats.rarityDistribution.epic / stats.totalPulls) * 100
                      )
                    : 0}
                  %
                </p>
              </div>

              <div className="bg-orange-200 p-2 rounded border-2 border-retro-brown">
                <p className="text-xs font-medium">Idol Queen</p>
                <p className="text-lg font-bold">
                  {stats.rarityDistribution.legendary}
                </p>
                <p className="text-xs">
                  {stats.totalPulls > 0
                    ? Math.round(
                        (stats.rarityDistribution.legendary /
                          stats.totalPulls) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>

              <div className="bg-pink-200 p-2 rounded border-2 border-retro-brown">
                <p className="text-xs font-medium">Ultimate Bias</p>
                <p className="text-lg font-bold">
                  {stats.rarityDistribution.mythical}
                </p>
                <p className="text-xs">
                  {stats.totalPulls > 0
                    ? Math.round(
                        (stats.rarityDistribution.mythical / stats.totalPulls) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>

              <div className="bg-yellow-200 p-2 rounded border-2 border-retro-brown">
                <p className="text-xs font-medium">Pity Pulls</p>
                <p className="text-lg font-bold">{stats.pityPulls}</p>
                <p className="text-xs">
                  {stats.totalPulls > 0
                    ? Math.round((stats.pityPulls / stats.totalPulls) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>

            {pullHistory.pulls.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-bold text-retro-brown mb-2">
                  Recent Pulls
                </h4>
                <div className="rounded-md border-2 border-retro-brown overflow-hidden shadow-sm" data-cy="recent-pulls-table">
                  <div className="max-h-36 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-retro-cream to-retro-mint border-b-2 border-retro-brown">
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Time
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Idol
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Group
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Rarity
                          </TableHead>
                          <TableHead className="p-2 text-left text-xs font-bold text-retro-brown">
                            Pity
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pullHistory.pulls.slice(0, 10).map((pull, index) => (
                          <TableRow
                            key={index}
                            className={`
                              ${
                                index % 2 === 0
                                  ? "bg-white/70"
                                  : "bg-retro-cream/30"
                              } 
                              hover:bg-retro-yellow/20 transition-colors duration-150
                            `}
                          >
                            <TableCell className="p-2 text-xs">
                              {new Date(pull.timestamp).toLocaleTimeString()}
                            </TableCell>
                            <TableCell className="p-2 text-xs font-medium">
                              {pull.idol.name}
                            </TableCell>
                            <TableCell className="p-2 text-xs">
                              {pull.idol.group}
                            </TableCell>
                            <TableCell className="p-2 text-xs">
                              <span
                                className={`
                                font-medium
                                ${
                                  pull.idol.rarity === "common" &&
                                  "text-gray-700"
                                }
                                ${
                                  pull.idol.rarity === "rare" && "text-blue-700"
                                }
                                ${
                                  pull.idol.rarity === "epic" &&
                                  "text-purple-700"
                                }
                                ${
                                  pull.idol.rarity === "legendary" &&
                                  "text-orange-700"
                                }
                                ${
                                  pull.idol.rarity === "mythical" &&
                                  "text-pink-700"
                                }
                              `}
                              >
                                {rarities[pull.idol.rarity].name}
                              </span>
                            </TableCell>
                            <TableCell className="p-2 text-xs">
                              {pull.pityPull ? (
                                <span className="font-medium text-retro-brown">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-gray-500">No</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
