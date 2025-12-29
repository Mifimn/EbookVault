"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation"; // <--- Add useSearchParams
import { motion } from "framer-motion";
import { ArrowLeft, Settings, Share2, Lock } from "lucide-react";
import { Button } from "../../../components/ui/Button"; 

export default function ReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true'; // <--- Check for Preview Mode

  return (
    <div className="min-h-screen bg-[#111] text-gray-300 flex flex-col">
      
      {/* HEADER */}
      <header className="h-16 border-b border-white/10 bg-black flex items-center justify-between px-4 sticky top-0 z-50">
        <Link href={isPreview ? "/shop" : "/library"} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">{isPreview ? "Free Preview" : "Now Reading"}</span>
          <h1 className="text-sm font-bold text-white">The Modern Founder</h1>
        </div>
        <div className="flex gap-4">
          <Settings className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <Share2 className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-8 md:p-16 leading-loose text-lg font-serif relative">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
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
          
          {/* --- LOCKED CONTENT OVERLAY --- */}
          {isPreview && (
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black to-transparent flex flex-col items-center justify-end pb-20 z-20">
               <Lock className="w-12 h-12 text-blue-500 mb-4" />
               <h3 className="text-2xl font-bold text-white mb-2">Keep Reading?</h3>
               <p className="text-gray-400 mb-8 text-center max-w-sm">
                 You've reached the end of the free preview. Unlock the full 240-page guide instantly.
               </p>
               <Link href="/shop/modern-founder">
                 <Button variant="primary" className="h-12 px-8">Unlock Full Version - $29</Button>
               </Link>
            </div>
          )}
          
          {!isPreview && (
             <p className="mb-6">
                [...This is a demo preview of the content. Buy the full version to continue reading...]
             </p>
          )}

        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="h-12 bg-black border-t border-white/10 flex items-center justify-between px-6 text-xs font-medium text-gray-500">
        <span>{isPreview ? "Page 1 of 240 (Preview)" : "Page 14 of 240"}</span>
        <div className="flex items-center gap-2">
           <div className="w-32 h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div className={`h-full bg-blue-500 ${isPreview ? "w-[5%]" : "w-[15%]"}`} />
           </div>
           <span>{isPreview ? "5%" : "15%"}</span>
        </div>
      </footer>

    </div>
  );
}
