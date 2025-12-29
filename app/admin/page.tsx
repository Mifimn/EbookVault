"use client";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
// FIX: Ensure correct import depth (../ instead of ../../)
import { Button } from "../../components/ui/Button"; 

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$12,450", icon: <DollarSign className="w-5 h-5 text-green-400" />, trend: "+12%" },
    { label: "Total Sales", value: "345", icon: <ShoppingBag className="w-5 h-5 text-blue-400" />, trend: "+5%" },
    { label: "Active Users", value: "1,200", icon: <Users className="w-5 h-5 text-purple-400" />, trend: "+18%" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back, Admin.</p>
        </div>
        <Button variant="primary">Download Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-neutral-900 border border-white/5 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-green-400 flex items-center bg-green-500/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" /> {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="p-8 rounded-2xl bg-neutral-900 border border-white/5 text-center py-20">
        <p className="text-gray-500">Activity chart will appear here.</p>
      </div>
    </div>
  );
}