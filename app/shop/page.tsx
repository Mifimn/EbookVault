"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // <--- NEW IMPORT
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Star } from "lucide-react";
import { Button } from "../../components/ui/Button"; 
import { Input } from "../../components/ui/Input";   

// --- MOCK DATA ---
const PRODUCTS = [
  { id: 1, slug: "modern-founder", title: "The Modern Founder", category: "Business", price: 29, image: "bg-gradient-to-br from-blue-600 to-purple-700", rating: 4.8, desc: "A complete guide to bootstrapping your startup in 2024." },
  { id: 2, slug: "react-mastery", title: "React Mastery", category: "Development", price: 49, image: "bg-gradient-to-br from-cyan-500 to-blue-600", rating: 4.9, desc: "Advanced patterns for building scalable applications." },
  { id: 3, slug: "minimalist-ui", title: "Minimalist UI Kit", category: "Design", price: 19, image: "bg-gradient-to-br from-pink-500 to-rose-600", rating: 4.7, desc: "200+ components for your next project." },
  { id: 4, slug: "crypto-security", title: "Crypto Security 101", category: "Finance", price: 35, image: "bg-gradient-to-br from-emerald-500 to-teal-600", rating: 4.9, desc: "How to secure your digital assets forever." },
  { id: 5, slug: "social-growth", title: "Social Growth", category: "Marketing", price: 25, image: "bg-gradient-to-br from-orange-400 to-red-500", rating: 4.6, desc: "Organic strategies for Instagram and Twitter." }
];

const CATEGORIES = ["All", "Business", "Development", "Design", "Finance", "Marketing"];

function ShopContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  // --- THE MAGIC: FILTER FROM URL ---
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Filter Logic
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-10 pb-20">
      
      {/* HEADER & CONTROLS */}
      <div className="container px-4 mx-auto mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Explore the <span className="text-blue-500">Collection</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                variant={activeCategory === cat ? "primary" : "secondary"}
                className={`h-10 px-4 text-xs ${activeCategory === cat ? "shadow-none" : "bg-neutral-900 border-white/5"}`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                <Input 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full border-white/20 bg-neutral-900" 
                />
             </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="container px-4 mx-auto">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/shop/${product.slug}`} className="group block h-full">
                  <div className="relative h-full bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl">
                    
                    <div className={`aspect-[4/3] w-full ${product.image} relative p-6 flex items-center justify-center`}>
                      <span className="font-bold text-white/20 text-4xl uppercase tracking-widest rotate-12">Cover Art</span>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold text-sm border border-white/10">
                        ${product.price}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{product.title}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          {product.rating}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{product.desc}</p>
                      
                      <div className="flex items-center text-white font-medium text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                        View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
            <Button variant="ghost" onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrap in Suspense for Next.js 14+ SearchParams
export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ShopContent />
    </Suspense>
  );
}
