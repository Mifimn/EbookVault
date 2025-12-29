"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Star } from "lucide-react";
import { Button } from "../../../components/ui/Button"; 

// --- DATA ---
// (We use 'any' here to prevent strict typing issues with mock data)
const PRODUCTS: Record<string, any> = {
  "modern-founder": { 
    title: "The Modern Founder", 
    price: 29, 
    category: "Business", 
    rating: 4.8, 
    reviews: 124,
    desc: "A complete guide to bootstrapping your startup without VC funding. Learn the exact frameworks used to scale to $10M ARR.", 
    image: "from-blue-600 to-purple-700",
    author: {
      name: "Alex Rivera",
      role: "Serial Entrepreneur",
      bio: "Founder of 3 SaaS companies. Featured in Forbes & TechCrunch.",
      color: "bg-blue-500"
    }
  },
  "react-mastery": { 
    title: "React Mastery", 
    price: 49, 
    category: "Development", 
    rating: 4.9, 
    reviews: 850,
    desc: "Stop guessing with React. Master advanced patterns, performance optimization, and server components in Next.js 14.", 
    image: "from-cyan-500 to-blue-600",
    author: {
      name: "Sarah Jenkins",
      role: "Senior Staff Engineer",
      bio: "Core contributor to major open source libraries. 10y+ Exp.",
      color: "bg-cyan-500"
    }
  },
  "minimalist-ui": { 
    title: "Minimalist UI Kit", 
    price: 19, 
    category: "Design", 
    rating: 4.7, 
    reviews: 45,
    desc: "200+ clean, accessible components. Copy and paste into your next project to save 100+ hours of design time.", 
    image: "from-pink-500 to-rose-600",
    author: {
      name: "Davide Rossi",
      role: "Product Designer",
      bio: "Award-winning designer focusing on accessibility and motion.",
      color: "bg-pink-500"
    }
  },
  "crypto-security": { 
    title: "Crypto Security 101", 
    price: 35, 
    category: "Finance", 
    rating: 4.9, 
    reviews: 312,
    desc: "Don't lose your keys. The definitive guide to cold storage, multisig wallets, and avoiding phishing attacks.", 
    image: "from-emerald-500 to-teal-600",
    author: {
      name: "Michael Chen",
      role: "Cybersecurity Analyst",
      bio: "Audited smart contracts worth over $500M. Security First.",
      color: "bg-emerald-500"
    }
  },
  "social-growth": { 
    title: "Social Growth", 
    price: 25, 
    category: "Marketing", 
    rating: 4.6, 
    reviews: 89,
    desc: "No bots. No ads. Just pure organic growth strategies that actually work in the current algorithm era.", 
    image: "from-orange-400 to-red-500",
    author: {
      name: "Emily White",
      role: "Growth Hacker",
      bio: "Helped brands gain 1M+ followers organically in 2023.",
      color: "bg-orange-500"
    }
  }
};

// --- FIXED ANIMATION VARIANTS ---
// We use 'any' type here to bypass the strict TypeScript check on "easeOut"
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = PRODUCTS[slug];

  // 404 View
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white bg-black">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link href="/shop">
           <Button variant="secondary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-8 pb-24 overflow-hidden">
      
      {/* 1. BACK NAVIGATION */}
      <div className="container px-4 mx-auto mb-8">
        <Link href="/shop" className="group inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all">
             <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to Collection</span>
        </Link>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* 2. LEFT: PRODUCT IMAGE */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className={`aspect-[3/4] rounded-3xl bg-gradient-to-br ${product.image} relative flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 border border-white/10`}
            >
              <div className="absolute left-4 top-4 bottom-4 w-2 bg-black/20 blur-sm rounded-full" />
              <div className="text-center relative z-10">
                <span className="block text-white/40 font-black text-6xl lg:text-7xl tracking-widest opacity-60 rotate-90 lg:rotate-0 mix-blend-overlay">
                  EBOOK
                </span>
                <div className="mt-8 px-4 py-2 bg-black/30 backdrop-blur-md rounded-lg inline-block border border-white/10">
                  <span className="text-xs font-bold tracking-widest uppercase">Premium Edition</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-3xl pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* 3. RIGHT: DETAILS & AUTHOR */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full ${product.author.color} bg-opacity-20 text-white text-xs font-bold uppercase tracking-wider border border-white/20`}>
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {product.rating} <span className="text-gray-400 font-normal">({product.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                {product.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                {product.desc}
              </p>
            </motion.div>

            {/* Price & Buy Block */}
            <motion.div variants={itemVariants} className="p-1 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900">
              <div className="bg-black rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">Instant Access</p>
                  <div className="text-4xl font-bold text-white">${product.price}</div>
                </div>
                <Button variant="primary" className="h-14 px-10 text-lg w-full sm:w-auto">
                  <Zap className="w-5 h-5 mr-2 fill-black" /> Buy Now
                </Button>
              </div>
            </motion.div>

            {/* AUTHOR CARD */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">About the Author</h3>
              <div className="group p-6 rounded-2xl bg-neutral-900 border border-white/10 hover:border-white/30 transition-colors flex items-start gap-4 cursor-default">
                <div className={`w-14 h-14 rounded-full ${product.author.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                  {product.author.name[0]}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {product.author.name}
                  </h4>
                  <p className="text-sm text-blue-400 font-medium mb-2">{product.author.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {product.author.bio}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-4">
               {["Instant PDF, EPUB, MOBI", "Lifetime Free Updates", "High-Res Diagrams", "30-Day Money Back"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
