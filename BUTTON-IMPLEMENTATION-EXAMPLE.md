// EXAMPLE: Implementasi data-cy pada GachaPull.tsx

// SEBELUM (Line ~139):
<Button
  onClick={handlePull}
  className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-2 px-6 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-lg"
>
  Pull Card
</Button>

// SESUDAH (Modified):
<Button
  data-cy="gacha-pull-button"  // ← ADD THIS LINE
  onClick={handlePull}
  className="bg-retro-yellow hover:bg-retro-orange text-retro-brown font-medium py-2 px-6 rounded-md border-2 border-retro-brown transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(71,42,14,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(71,42,14,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-lg"
>
  Pull Card
</Button>

// JUGA ADD: Animation states
{animation.step === "pulling" && (
  <div data-cy="gacha-pulling" className="animate-pulse flex flex-col items-center">
    <div className="w-24 h-24 bg-retro-yellow rounded-full animate-spin border-8 border-retro-brown border-t-transparent"></div>
    <p className="text-retro-cream mt-4 text-xl font-bold">
      Pulling...
    </p>
  </div>
)}

{animation.step === "reveal" && animation.result && (
  <div data-cy="gacha-reveal" className="animate-fadeIn">
    {/* Reveal animation content */}
  </div>
)}

{animation.step === "complete" && animation.result && (
  <div data-cy="gacha-complete" className="flex flex-col items-center animate-fadeIn">
    {/* Complete state content */}
  </div>
)}
