"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Store, Library, User, ShoppingBag, Shield, Menu } from "lucide-react";

// --- CONFIGURATION ---
// THE FIX: We explicitly tell TypeScript this can be one of three specific values.
// This stops the "no overlap" error.
const MOCK_ROLE: 'guest' | 'user' | 'admin' = 'admin'; 

export default function Navbar() {
  const pathname = usePathname(); 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Bottom Tabs Configuration
  const mobileTabs = [
    { name: "Home", href: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Shop", href: "/shop", icon: <Store className="w-6 h-6" /> },
    { name: "Library", href: "/library", icon: <Library className="w-6 h-6" /> },
    // Logic: If user, go to Settings. If guest, go to Login.
    { name: "Profile", href: MOCK_ROLE === 'user' ? "/settings" : "/login", icon: <User className="w-6 h-6" /> },
  ];

  return (
    <>
      {/* =======================================
          1. TOP BAR (Desktop & Mobile Header)
      ======================================= */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
               <span className="text-black font-black text-lg">E</span>
            </div>
            EbookVault
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Shop</Link>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
            
            {MOCK_ROLE === 'user' && (
              <Link href="/library" className="text-sm font-medium text-white hover:text-blue-400">My Library</Link>
            )}

            {MOCK_ROLE === 'admin' && (
               <Link href="/admin" className="text-red-400 text-sm font-bold border border-red-500/20 px-3 py-1 rounded-full hover:bg-red-500/10">
                 Admin
               </Link>
            )}

            {/* 2. CART ICON (Now a Link, not a Button) */}
            <Link href="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </Link>

            {/* 3. PROFILE / LOGIN BUTTON */}
            {MOCK_ROLE === 'guest' ? (
               <Link href="/login" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200">
                 Login
               </Link>
            ) : (
               // Wrapper Link added here for Settings
               <Link href="/settings"> 
                 <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center hover:border-white transition-colors cursor-pointer">
                    <span className="font-bold text-xs text-white">JD</span>
                 </div>
               </Link>
            )}
          </div>

          {/* --- MOBILE TOP RIGHT (Cart Only) --- */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Cart Link */}
             <Link href="/cart" className="relative text-white">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full text-[8px] flex items-center justify-center font-bold">2</span>
             </Link>
          </div>
        </div>
      </motion.nav>

      {/* =======================================
          2. MOBILE BOTTOM FLOATING DOCK
      ======================================= */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 py-4 flex justify-between items-center">
          
          {mobileTabs.map((tab) => {
            const isActive = pathname === tab.href;
            
            return (
              <Link 
                key={tab.name} 
                href={tab.href}
                className="relative flex flex-col items-center justify-center w-12"
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md" 
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className={`relative z-10 transition-all duration-300 ${
                  isActive ? "text-blue-400 scale-110" : "text-gray-500 hover:text-gray-300"
                }`}>
                  {tab.icon}
                </div>

                {isActive && (
                  <motion.div 
                    layoutId="nav-dot"
                    className="absolute -bottom-2 w-1 h-1 bg-blue-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}

        </div>
      </div>
    </>
  );
}