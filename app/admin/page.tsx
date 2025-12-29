"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, Zap, Clock, TrendingUp, BarChart3, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- MOCK DATA: LIVE TRAFFIC ---
const TRAFFIC_DATA = {
  "5m": [
    { time: '10:00', visitors: 12 }, { time: '10:01', visitors: 18 },
    { time: '10:02', visitors: 15 }, { time: '10:03', visitors: 25 },
    { time: '10:04', visitors: 32 }, { time: '10:05', visitors: 28 },
  ],
  "30m": [
    { time: '09:30', visitors: 120 }, { time: '09:40', visitors: 145 },
    { time: '09:50', visitors: 132 }, { time: '10:00', visitors: 180 },
  ],
  "24h": [
    { time: '00:00', visitors: 450 }, { time: '06:00', visitors: 200 },
    { time: '12:00', visitors: 890 }, { time: '18:00', visitors: 1200 },
  ]
};

// --- MOCK DATA: ALL TIME SALES (Monthly) ---
const SALES_DATA = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 16000 },
  { month: 'May', revenue: 21000 },
  { month: 'Jun', revenue: 25000 },
  { month: 'Jul', revenue: 29000 },
  { month: 'Aug', revenue: 34000 },
  { month: 'Sep', revenue: 42000 },
  { month: 'Oct', revenue: 48000 },
  { month: 'Nov', revenue: 52000 },
  { month: 'Dec', revenue: 61000 },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<"5m" | "30m" | "24h">("24h");

  return (
    <div className="space-y-8">
      
      {/* 1. USER METRICS CARDS (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-neutral-900 border border-white/5 border-l-4 border-l-green-500">
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg"><Zap className="w-5 h-5 text-green-400" /></div>
              <span className="text-xs font-bold text-green-400 animate-pulse">● LIVE</span>
           </div>
           <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Active Users Now</p>
           <h3 className="text-3xl font-bold text-white mt-1">42</h3>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900 border border-white/5 border-l-4 border-l-blue-500">
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg"><Users className="w-5 h-5 text-blue-400" /></div>
              <span className="text-xs font-bold text-green-400">+12 today</span>
           </div>
           <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total Signups</p>
           <h3 className="text-3xl font-bold text-white mt-1">1,248</h3>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900 border border-white/5 border-l-4 border-l-purple-500">
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg"><DollarSign className="w-5 h-5 text-purple-400" /></div>
              <span className="text-xs font-bold text-green-400">+8%</span>
           </div>
           <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total Revenue</p>
           <h3 className="text-3xl font-bold text-white mt-1">$373,000</h3>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900 border border-white/5 border-l-4 border-l-orange-500">
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-orange-500/10 rounded-lg"><Clock className="w-5 h-5 text-orange-400" /></div>
           </div>
           <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Avg. Session</p>
           <h3 className="text-3xl font-bold text-white mt-1">4m 12s</h3>
        </div>
      </div>

      {/* 2. DUAL CHART ANALYSIS ROW */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* LEFT CHART: Site Traffic */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-neutral-900 border border-white/5 h-[400px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Traffic Analysis
            </h3>
            <div className="flex bg-black rounded-lg p-1 border border-white/10">
              {(["5m", "30m", "24h"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    timeRange === t ? "bg-blue-600 text-white" : "text-gray-500 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={TRAFFIC_DATA[timeRange]}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* RIGHT CHART: Sales - All Time (Replaced the Product list) */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
           className="p-6 rounded-2xl bg-neutral-900 border border-white/5 h-[400px]"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                Sales Performance
              </h3>
              <p className="text-xs text-gray-500">All-time revenue growth</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
               +124% YTD
            </div>
          </div>
          <ResponsiveContainer width="100%" height="85%">
             <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
             </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
}