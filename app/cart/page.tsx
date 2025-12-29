"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Calendar, CreditCard, Download, ArrowRight, Search, Clock } from "lucide-react";
import { Button } from "../../components/ui/Button"; // <--- Toolkit
import { Input } from "../../components/ui/Input";   // <--- Toolkit

// --- MOCK HISTORY DATA ---
const PAST_ORDERS = [
  {
    id: "ORD-2024-001",
    title: "React Mastery",
    author: "Sarah Jenkins",
    date: "Oct 24, 2024",
    price: 49,
    image: "bg-gradient-to-br from-cyan-500 to-blue-600",
    status: "Completed"
  },
  {
    id: "ORD-2024-002",
    title: "Minimalist UI Kit",
    author: "Davide Rossi",
    date: "Sep 12, 2024",
    price: 19,
    image: "bg-gradient-to-br from-pink-500 to-rose-600",
    status: "Completed"
  },
  {
    id: "ORD-2023-089",
    title: "The Modern Founder",
    author: "Alex Rivera",
    date: "Dec 05, 2023",
    price: 29,
    image: "bg-gradient-to-br from-blue-600 to-purple-700",
    status: "Refunded"
  }
];

export default function OrderHistoryPage() {
  const [search, setSearch] = useState("");

  // Calculate Total Spent
  const totalSpent = PAST_ORDERS
    .filter(o => o.status === "Completed")
    .reduce((acc, item) => acc + item.price, 0);

  const filteredOrders = PAST_ORDERS.filter(order => 
    order.title.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pt-10 pb-20">
      <div className="container px-4 mx-auto max-w-4xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order History</h1>
            <p className="text-gray-400 text-sm">Track your purchases and downloads.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="flex gap-4">
            <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 min-w-[140px]">
              <div className="text-xs text-gray-500 uppercase font-bold mb-1">Total Spent</div>
              <div className="text-2xl font-bold text-white">${totalSpent}</div>
            </div>
            <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 min-w-[140px]">
              <div className="text-xs text-gray-500 uppercase font-bold mb-1">Total Orders</div>
              <div className="text-2xl font-bold text-white">{PAST_ORDERS.length}</div>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
           <Input 
             placeholder="Search by book title or Order ID..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="pl-10 bg-neutral-900 border-white/10 rounded-full"
           />
        </div>

        {/* ORDER LIST */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-neutral-900 rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center hover:border-white/20 transition-all"
              >
                {/* Image */}
                <div className={`w-full sm:w-20 h-40 sm:h-24 rounded-lg ${order.image} flex-shrink-0 shadow-lg`} />

                {/* Info */}
                <div className="flex-grow text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
                    <h3 className="font-bold text-lg text-white">{order.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      order.status === "Completed" 
                        ? "bg-green-500/10 text-green-400 border-green-500/20" 
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-400 mb-4 sm:mb-0">
                    <span className="flex items-center justify-center sm:justify-start gap-1">
                       <FileText className="w-3 h-3" /> {order.id}
                    </span>
                    <span className="flex items-center justify-center sm:justify-start gap-1">
                       <Calendar className="w-3 h-3" /> {order.date}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                   <div className="text-xl font-bold text-white text-center sm:text-right mb-2">
                     ${order.price}
                   </div>
                   <div className="flex gap-2">
                     <Button variant="secondary" className="h-9 px-3 text-xs flex-1 sm:flex-none">
                        <Download className="w-3 h-3 mr-2" /> Receipt
                     </Button>
                     {order.status === "Completed" && (
                       <Link href="/library" className="flex-1 sm:flex-none">
                         <Button variant="primary" className="h-9 px-3 text-xs w-full">
                            View <ArrowRight className="w-3 h-3 ml-1" />
                         </Button>
                       </Link>
                     )}
                   </div>
                </div>

              </motion.div>
            ))
          ) : (
             <div className="text-center py-20 bg-neutral-900/50 rounded-2xl border border-dashed border-white/10">
                <Clock className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">No orders found</h3>
                <p className="text-gray-500">You haven't made any purchases yet.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
