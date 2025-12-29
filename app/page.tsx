"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Lock, Smartphone, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/Button"; // <--- USING YOUR TOOLKIT

// --- DATA: RECENT UPLOADS (New Section) ---
const RECENT_BOOKS = [
  {
    id: "react-mastery",
    title: "React Mastery",
    author: "Sarah Jenkins",
    price: 49,
    category: "Dev",
    image: "bg-gradient-to-br from-cyan-500 to-blue-600"
  },
  {
    id: "modern-founder",
    title: "The Modern Founder",
    author: "Alex Rivera",
    price: 29,
    category: "Business",
    image: "bg-gradient-to-br from-blue-600 to-purple-700"
  },
  {
    id: "crypto-security",
    title: "Crypto Security 101",
    author: "Michael Chen",
    price: 35,
    category: "Finance",
    image: "bg-gradient-to-br from-emerald-500 to-teal-600"
  },
  {
    id: "minimalist-ui",
    title: "Minimalist UI Kit",
    author: "Davide Rossi",
    price: 19,
    category: "Design",
    image: "bg-gradient-to-br from-pink-500 to-rose-600"
  }
];

// --- DATA: FEATURES (Bento Grid) ---
const features = [
  {
    title: "Instant Delivery",
    desc: "Get your files immediately after purchase via email and dashboard.",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    colSpan: "md:col-span-2",
    bg: "bg-neutral-900"
  },
  {
    title: "Secure Vault",
    desc: "AES-256 encryption keeps your library safe forever.",
    icon: <Lock className="w-6 h-6 text-green-400" />,
    colSpan: "md:col-span-1",
    bg: "bg-neutral-800"
  },
  {
    title: "Mobile Ready",
    desc: "Read on any device. EPUB, PDF, and MOBI supported.",
    icon: <Smartphone className="w-6 h-6 text-blue-400" />,
    colSpan: "md:col-span-1",
    bg: "bg-neutral-800"
  },
  {
    title: "Lifetime Updates",
    desc: "If an author updates a book, you get the new version for free.",
    icon: <RefreshCw className="w-6 h-6 text-purple-400" />,
    colSpan: "md:col-span-2",
    bg: "bg-neutral-900"
  }
];

// --- DATA: TESTIMONIALS ---
const testimonials = [
  { name: "Alex R.", role: "Founder", text: "The quality of ebooks here is unmatched. A game changer." },
  { name: "Sarah K.", role: "Designer", text: "Finally, a store that cares about design and experience." },
  { name: "James L.", role: "Developer", text: "Instant access and clean code examples. Worth every penny." },
  { name: "Emily W.", role: "Writer", text: "I built my entire resource library from this site." },
];
const marqueeItems = [...testimonials, ...testimonials, ...testimonials]; 

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden">
      
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20">
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 rounded-[100%] blur-[120px]" />
        </div>

        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            v2.0 Store is Live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl xl:text-8xl text-white mb-6"
          >
            Unlock the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              Digital Vault.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed mb-10"
          >
            The world's most premium marketplace for digital assets. 
            Secure downloads, instant access, and a library that grows with you.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center"
          >
            {/* USING TOOLKIT BUTTONS */}
            <Link href="/shop">
              <Button variant="primary" className="h-14 px-8 text-lg rounded-full">
                Start Exploring <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="h-14 px-8 text-lg rounded-full border border-white/20">
                View Pricing
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: FRESH ARRIVALS (NEW!)
      ========================================= */}
      <section className="py-20 bg-black relative z-10 border-t border-white/5">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">
                <Sparkles className="w-4 h-4" /> Just Uploaded
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Fresh from the Vault</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center text-gray-400 hover:text-white transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECENT_BOOKS.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <Link href={`/shop/${book.id}`}>
                  {/* Card Container */}
                  <div className="bg-neutral-900 rounded-2xl p-4 border border-white/5 hover:border-white/20 transition-all shadow-xl">
                    
                    {/* Image Area */}
                    <div className={`relative aspect-[3/4] rounded-xl ${book.image} mb-4 flex items-center justify-center overflow-hidden`}>
                      <span className="font-bold text-white/20 text-xl rotate-12 uppercase tracking-widest">Cover</span>
                      
                      {/* "NEW" Badge */}
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> NEW
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex justify-between items-start mb-1">
                         <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider border border-blue-500/20 px-2 py-0.5 rounded-full bg-blue-500/10">{book.category}</span>
                         <span className="text-white font-bold">${book.price}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-blue-400 transition-colors">{book.title}</h3>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>

                    {/* Quick Add Button (Visible on Hover) */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop">
              <Button variant="secondary" className="w-full">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: BENTO GRID FEATURES
      ========================================= */}
      <section className="py-24 bg-neutral-900/30 text-white border-t border-white/5">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for <span className="text-blue-500">Collectors</span>.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We don't just sell files. We provide a premium reading ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`${f.colSpan} ${f.bg} p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all relative overflow-hidden group cursor-default`}
              >
                <div className="relative z-10">
                  <div className="mb-4 p-3 bg-white/10 w-fit rounded-xl backdrop-blur-sm">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: INFINITE TESTIMONIALS
      ========================================= */}
      <section className="py-24 bg-black overflow-hidden border-t border-white/5">
        <div className="container px-4 mx-auto mb-12 text-center">
          <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold uppercase tracking-wider text-xs mb-2">
             <Star className="w-4 h-4 fill-current" /> Wall of Love
          </div>
          <h2 className="text-3xl font-bold text-white">Trusted by Experts</h2>
        </div>

        <div className="relative w-full flex">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {marqueeItems.map((t, i) => (
              <div 
                key={i} 
                className="w-[350px] flex-shrink-0 p-8 bg-neutral-900 rounded-2xl border border-white/5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-white border border-white/10">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{t.text}"</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
