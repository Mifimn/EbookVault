"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Settings, Share2, Bookmark } from "lucide-react";
import { Button } from "../../../components/ui/Button"; 

export default function ReaderPage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-[#111] text-gray-300 flex flex-col">

      {/* READER TOOLBAR */}
      <header className="h-16 border-b border-white/10 bg-black flex items-center justify-between px-4 sticky top-0 z-50">
        <Link href="/library" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Now Reading</span>
          <h1 className="text-sm font-bold text-white">The Modern Founder</h1>
        </div>

        <div className="flex gap-4">
          <Settings className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <Share2 className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      {/* BOOK CONTENT (Mock) */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-8 md:p-16 leading-loose text-lg font-serif">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-sans font-bold text-white mb-8">Chapter 1: The Beginning</h2>

          <p className="mb-6">
            Starting a business is not about having the perfect idea; it is about having the resilience to execute an imperfect idea until it becomes perfect. Most founders fail not because they lack vision, but because they lack the stomach for the mundane.
          </p>
          <p className="mb-6">
            In the digital age, the barrier to entry is lower than ever, but the noise is louder than ever. To stand out, you don't need to shout louder; you need to speak clearer.
          </p>

          <div className="my-12 p-8 bg-neutral-900 border-l-4 border-blue-500 rounded-r-xl italic text-gray-400">
            "The market doesn't care about your passion. It cares about your value."
          </div>

          <p className="mb-6">
            We spent the first year building things nobody wanted. It was a painful lesson in ego. We thought we knew what the customer needed better than they did. We were wrong.
          </p>
          <p className="mb-6">
            [...This is a demo preview of the content. Buy the full version to continue reading...]
          </p>
        </motion.div>
      </main>

      {/* FOOTER PROGRESS */}
      <footer className="h-12 bg-black border-t border-white/10 flex items-center justify-between px-6 text-xs font-medium text-gray-500">
        <span>Page 14 of 240</span>
        <div className="flex items-center gap-2">
           <div className="w-32 h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div className="w-[15%] h-full bg-blue-500" />
           </div>
           <span>15%</span>
        </div>
      </footer>

    </div>
  );
}