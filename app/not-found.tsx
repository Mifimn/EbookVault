import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <FileQuestion className="w-10 h-10 text-gray-500" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-xl font-medium text-gray-400 mb-8">Page not found in the vault</h2>

      <Link 
        href="/"
        className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}