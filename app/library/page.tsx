"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Lock, Search, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/Button"; // <--- Toolkit
import { Input } from "../../components/ui/Input";   // <--- Toolkit

// --- MOCK USER DATA ---
const USER_EMAIL = "alex@example.com";

// --- MOCK LIBRARY DATA ---
const MY_BOOKS = [
  {
    id: "react-mastery",
    title: "React Mastery",
    author: "Sarah Jenkins",
    cover: "bg-gradient-to-br from-cyan-500 to-blue-600",
    progress: 45, // % read
    status: "unlocked"
  },
  {
    id: "modern-founder",
    title: "The Modern Founder",
    author: "Alex Rivera",
    cover: "bg-gradient-to-br from-blue-600 to-purple-700",
    progress: 10,
    status: "unlocked"
  },
  {
    id: "crypto-security",
    title: "Crypto Security 101",
    author: "Michael Chen",
    cover: "bg-gradient-to-br from-emerald-500 to-teal-600",
    progress: 0,
    status: "locked" // Example of a book they might want
  }
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-10 pb-20">
      
      {/* HEADER */}
      <div className="container px-4 mx-auto mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Secure Vault Active • {USER_EMAIL}</span>
            </div>
            <h1 className="text-4xl font-bold">My Collection</h1>
          </div>

          {/* Library Search using Toolkit Input */}
          <div className="relative w-full md:w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
              <Input 
                placeholder="Filter your books..." 
                className="pl-10 rounded-full border-white/20 bg-neutral-900" 
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOOK GRID */}
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MY_BOOKS.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {book.status === "unlocked" ? (
                // --- UNLOCKED CARD ---
                <Link href={`/reader/${book.id}`}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 border border-white/10 bg-neutral-900 shadow-lg group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    
                    {/* Cover Art */}
                    <div className={`absolute inset-0 ${book.cover} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-1 leading-tight">{book.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{book.author}</p>
                      
                      {/* Progress Bar */}
                      <div className="flex items-center gap-3 text-xs font-medium text-gray-300">
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div style={{ width: `${book.progress}%` }} className="h-full bg-blue-500" />
                        </div>
                        <span>{book.progress}%</span>
                      </div>
                    </div>

                    {/* Open Button (Toolkit Version) - Hover Only */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                      <Button variant="primary" className="shadow-xl">
                        <BookOpen className="w-4 h-4 mr-2" /> Open Reader
                      </Button>
                    </div>
                  </div>
                </Link>
              ) : (
                // --- LOCKED CARD ---
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                  <div className={`absolute inset-0 ${book.cover} opacity-20`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-4 border border-white/10">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="font-bold text-gray-300 mb-4">{book.title}</h3>
                    
                    <Link href={`/shop/${book.id}`}>
                      <Button variant="ghost" className="h-auto py-2 px-4 text-xs hover:bg-white/10 text-blue-400 hover:text-white border border-blue-500/30 hover:border-white/30">
                        Purchase to Unlock <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
