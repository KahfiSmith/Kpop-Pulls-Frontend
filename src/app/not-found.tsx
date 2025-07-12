import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-retro-cream">
      <h1 className="text-4xl font-bold mb-4 text-retro-brown">404 - Page Not Found</h1>
      <p className="mb-8 text-retro-brown">The page you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-retro-yellow text-retro-brown rounded-full hover:bg-retro-coral transition-colors font-medium border-2 border-retro-brown"
      >
        Return to Home
      </Link>
    </div>
  );
}
