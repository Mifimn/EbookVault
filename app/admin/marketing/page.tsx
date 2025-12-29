"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, Wand2, Plus, UploadCloud, X, 
  Trash2, Play, Image as ImageIcon, CheckCircle2, 
  LogOut, RefreshCw, MousePointer2, Eye, TrendingUp, Link as LinkIcon
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Button } from "../../../components/ui/Button";

// --- MOCK DATA TYPES ---
type TikTokAccount = {
  id: string;
  username: string;
  avatar: string;
  status: 'connected' | 'disconnected';
  stats: { views: string; spend: string; ctr: string };
};

type AdCampaign = {
  id: number;
  title: string;
  targetLink: string; // <--- NEW: Link to Ebook
  status: 'active' | 'paused' | 'ended';
  thumbnail: string;
  type: 'video' | 'image';
  // Detailed Analysis Data (Removed CPM)
  metrics: {
    impressions: number;
    views: number;
    clicks: number;
    ctr: number; 
    cost: number;
  };
  // Lifetime History for the Chart
  history: { date: string; views: number; clicks: number }[];
};

export default function MarketingPage() {
  // 1. ACCOUNT MANAGEMENT STATE
  const [accounts, setAccounts] = useState<TikTokAccount[]>([
    { 
      id: 'acc_1', 
      username: '@EbookVaultOfficial', 
      avatar: 'bg-red-500', 
      status: 'connected',
      stats: { views: '1.2M', spend: '$450', ctr: '2.4%' }
    },
    { 
      id: 'acc_2', 
      username: '@FounderDaily', 
      avatar: 'bg-blue-500', 
      status: 'disconnected',
      stats: { views: '85K', spend: '$120', ctr: '1.8%' }
    }
  ]);
  
  const [activeAccountId, setActiveAccountId] = useState<string>('acc_1');

  // 2. CAMPAIGN STATE (Mock Data)
  const [activeTab, setActiveTab] = useState<'overview' | 'create'>('overview');
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    { 
      id: 1, 
      title: "Summer Sale Promo", 
      targetLink: "/shop/modern-founder",
      status: "active", 
      thumbnail: "bg-purple-600", 
      type: "video", 
      metrics: { impressions: 45000, views: 38000, clicks: 1200, ctr: 2.6, cost: 450 },
      history: [
        { date: 'Jan 10', views: 4000, clicks: 240 },
        { date: 'Jan 11', views: 3000, clicks: 139 },
        { date: 'Jan 12', views: 2000, clicks: 980 },
        { date: 'Jan 13', views: 2780, clicks: 390 },
        { date: 'Jan 14', views: 1890, clicks: 480 },
        { date: 'Jan 15', views: 2390, clicks: 380 },
        { date: 'Jan 16', views: 3490, clicks: 430 },
      ]
    },
    { 
      id: 2, 
      title: "React Guide Teaser", 
      targetLink: "/shop/react-mastery",
      status: "paused", 
      thumbnail: "bg-blue-600", 
      type: "image", 
      metrics: { impressions: 12000, views: 8000, clicks: 340, ctr: 2.8, cost: 120 },
      history: [
        { date: 'Feb 01', views: 1000, clicks: 40 },
        { date: 'Feb 02', views: 1200, clicks: 50 },
        { date: 'Feb 03', views: 900, clicks: 30 },
        { date: 'Feb 04', views: 1500, clicks: 80 },
        { date: 'Feb 05', views: 1100, clicks: 45 },
        { date: 'Feb 06', views: 800, clicks: 20 },
        { date: 'Feb 07', views: 1300, clicks: 60 },
      ]
    },
  ]);

  // 3. AD CREATION STATE
  const [newAd, setNewAd] = useState({ 
    media: null as string | null, 
    targetLink: '', 
    hookMode: 'ai' as 'ai' | 'manual', 
    hookText: '' 
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAdForAnalysis, setSelectedAdForAnalysis] = useState<AdCampaign | null>(null);

  // --- ACTIONS ---
  const toggleAccountStatus = (id: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        return { ...acc, status: acc.status === 'connected' ? 'disconnected' : 'connected' };
      }
      return acc;
    }));
  };

  const handleGenerateHook = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setNewAd(prev => ({ ...prev, hookText: "POV: You stopped using generic UI kits and switched to this vault... 🤯 #coding #design" }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleDeleteCampaign = (id: number) => {
    if(confirm("Are you sure? This will delete all lifetime data for this campaign.")) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      setSelectedAdForAnalysis(null);
    }
  };

  const activeAccount = accounts.find(a => a.id === activeAccountId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* HEADER & ACCOUNT SWITCHER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Marketing Hub</h1>
          <p className="text-gray-400">Manage ads across multiple accounts.</p>
        </div>

        {/* Account Selector */}
        <div className="flex items-center gap-3 bg-neutral-900 p-2 rounded-xl border border-white/10">
          {accounts.map(acc => (
            <button
              key={acc.id}
              onClick={() => setActiveAccountId(acc.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                activeAccountId === acc.id 
                  ? "bg-white/10 text-white shadow-inner" 
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className={`w-6 h-6 rounded-full ${acc.avatar} flex items-center justify-center text-[10px] font-bold text-white`}>
                {acc.username[1].toUpperCase()}
              </div>
              <span className="text-xs font-medium truncate max-w-[100px]">{acc.username}</span>
              {acc.status === 'disconnected' && <div className="w-2 h-2 rounded-full bg-red-500" />}
              {acc.status === 'connected' && <div className="w-2 h-2 rounded-full bg-green-500" />}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-dashed border-white/20 text-gray-500 hover:text-white hover:border-white/50 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ACCOUNT STATUS CARD */}
      <AnimatePresence mode="wait">
        {activeAccount && (
          <motion.div 
            key={activeAccount.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-3xl bg-neutral-900 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
               <div className={`w-16 h-16 rounded-full ${activeAccount.avatar} flex items-center justify-center text-2xl font-bold text-white`}>
                 {activeAccount.username[1]}
               </div>
               <div>
                 <h2 className="text-xl font-bold text-white flex items-center gap-3">
                   {activeAccount.username}
                   <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                     activeAccount.status === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                   }`}>
                     {activeAccount.status}
                   </span>
                 </h2>
                 <p className="text-sm text-gray-400 mt-1">
                   {activeAccount.status === 'connected' 
                     ? "Syncing ad performance data via API." 
                     : "Reconnect to resume ad serving. Historical data is saved."}
                 </p>
               </div>
            </div>

            <Button 
              onClick={() => toggleAccountStatus(activeAccount.id)}
              variant={activeAccount.status === 'connected' ? 'secondary' : 'primary'}
            >
              {activeAccount.status === 'connected' ? <><LogOut className="w-4 h-4 mr-2"/> Disconnect</> : <><RefreshCw className="w-4 h-4 mr-2"/> Reconnect</>}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      {activeAccount?.status === 'connected' ? (
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: CAMPAIGN LIST (Takes 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Active Campaigns</h3>
              <Button onClick={() => setActiveTab(activeTab === 'create' ? 'overview' : 'create')} size="sm">
                {activeTab === 'create' ? "Cancel" : "New Ad"}
              </Button>
            </div>

            {activeTab === 'create' ? (
              // --- CREATE AD FORM ---
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-neutral-900 border border-white/10 space-y-6">
                <h3 className="font-bold text-white mb-4">Create New Advertisement</h3>
                
                {/* 1. Target Link Input (NEW) */}
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Target Ebook URL</label>
                   <div className="flex items-center bg-black border border-white/10 rounded-xl px-4 py-3">
                      <LinkIcon className="w-4 h-4 text-gray-500 mr-3" />
                      <input 
                        type="text" 
                        placeholder="/shop/product-slug"
                        className="bg-transparent border-none text-white focus:outline-none w-full text-sm"
                        value={newAd.targetLink}
                        onChange={(e) => setNewAd({...newAd, targetLink: e.target.value})}
                      />
                   </div>
                </div>

                {/* 2. Upload Creative */}
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors">
                  <UploadCloud className="w-10 h-10 text-blue-500 mb-4" />
                  <p className="text-white font-medium">Upload Video / Image</p>
                </div>

                {/* 3. Hooks */}
                <div className="space-y-3">
                  <div className="p-4 bg-black/50 border border-white/10 rounded-xl min-h-[60px] flex items-center justify-center text-gray-400 italic text-sm">
                    {newAd.hookText || "AI generated hook will appear here..."}
                  </div>
                  <Button onClick={handleGenerateHook} isLoading={isGenerating} variant="secondary" className="w-full">
                    <Wand2 className="w-4 h-4 mr-2" /> AI Generate Hook
                  </Button>
                </div>

                <Button variant="primary" className="w-full">Launch Campaign</Button>
              </motion.div>
            ) : (
              // --- CAMPAIGN LIST ---
              <div className="space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {campaigns.map(ad => (
                  <motion.div 
                    layout
                    key={ad.id} 
                    onClick={() => setSelectedAdForAnalysis(ad)}
                    className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                      selectedAdForAnalysis?.id === ad.id 
                        ? "bg-blue-900/10 border-blue-500" 
                        : "bg-neutral-900 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-lg ${ad.thumbnail} flex items-center justify-center flex-shrink-0`}>
                      {ad.type === 'video' ? <Play className="w-5 h-5 text-white" /> : <ImageIcon className="w-5 h-5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">{ad.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{ad.status}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white font-bold">{ad.metrics.views.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILED ANALYTICS (Takes 7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {selectedAdForAnalysis ? (
                <motion.div 
                  key={selectedAdForAnalysis.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 sticky top-24"
                >
                  {/* Title Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedAdForAnalysis.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                         <p className="text-sm text-gray-400">Lifetime Performance</p>
                         <span className="text-gray-600">•</span>
                         <a href="#" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                           <LinkIcon className="w-3 h-3" /> {selectedAdForAnalysis.targetLink}
                         </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => handleDeleteCampaign(selectedAdForAnalysis.id)} className="p-2 hover:bg-red-500/10 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                         <Trash2 className="w-5 h-5" />
                       </button>
                       <button onClick={() => setSelectedAdForAnalysis(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                         <X className="w-5 h-5" />
                       </button>
                    </div>
                  </div>

                  {/* 4 KEY METRICS GRID (Removed CPM) */}
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-900 rounded-xl border border-white/5">
                       <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold mb-2">
                         <Eye className="w-4 h-4" /> Impressions
                       </div>
                       <div className="text-2xl font-bold text-white">{selectedAdForAnalysis.metrics.impressions.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-neutral-900 rounded-xl border border-white/5">
                       <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold mb-2">
                         <MousePointer2 className="w-4 h-4" /> Clicks
                       </div>
                       <div className="text-2xl font-bold text-white">{selectedAdForAnalysis.metrics.clicks.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-neutral-900 rounded-xl border border-white/5">
                       <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold mb-2">
                         <TrendingUp className="w-4 h-4" /> CTR
                       </div>
                       <div className="text-2xl font-bold text-green-400">{selectedAdForAnalysis.metrics.ctr}%</div>
                    </div>
                    <div className="p-4 bg-neutral-900 rounded-xl border border-white/5">
                       <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold mb-2">
                         <Play className="w-4 h-4" /> Total Views
                       </div>
                       <div className="text-2xl font-bold text-white">{selectedAdForAnalysis.metrics.views.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* VISUAL CHART AREA */}
                  <div className="p-6 bg-neutral-900 rounded-2xl border border-white/5 h-[300px]">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Lifetime Growth Trend</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedAdForAnalysis.history}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                </motion.div>
              ) : (
                // EMPTY STATE
                <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/10 rounded-2xl text-gray-500">
                  <BarChart3 className="w-12 h-12 mb-4 opacity-30" />
                  <p className="text-lg font-medium text-white">No Campaign Selected</p>
                  <p className="text-sm">Select an active campaign from the list to view its full lifetime performance.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // --- DISCONNECTED STATE ---
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <LogOut className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Disconnected</h2>
          <Button onClick={() => toggleAccountStatus(activeAccount?.id || '')} variant="primary">
            Reconnect Account
          </Button>
        </div>
      )}
    </div>
  );
}