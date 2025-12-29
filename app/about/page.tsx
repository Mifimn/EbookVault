"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      <div className="container px-4 mx-auto max-w-3xl text-center">
        
        {/* HERO SECTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold mb-6">We empower digital creators.</h1>
          <p className="text-xl text-gray-400 mb-16">
            EbookVault was built to solve a simple problem: Premium digital assets are scattered everywhere. We built a secure, centralized vault for the best resources in tech.
          </p>
        </motion.div>

        {/* DETAILS GRID */}
        <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
          <div className="p-8 rounded-3xl bg-neutral-900 border border-white/5">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To provide a frictionless marketplace where developers and designers can share their knowledge and tools, ensuring 100% secure delivery and fair compensation.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-900 border border-white/5">
            <h3 className="text-2xl font-bold mb-4">The Vault Standard</h3>
            <p className="text-gray-400 leading-relaxed">
              Every item in our store is vetted for quality. We don't allow generic content. If it's on EbookVault, it's worth your time.
            </p>
          </div>
        </div>

        {/* NEW CONTACT SUPPORT SECTION */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold mb-8">Contact Support</h2>
          <div className="p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex flex-col items-center">
            <Mail className="w-10 h-10 text-blue-400 mb-4" />
            <p className="text-gray-300 mb-6 max-w-md">
              Having trouble with a download or need a refund? Our support team is available 24/7 to assist you.
            </p>
            <a 
              href="mailto:support@ebookvault.com" 
              className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> support@ebookvault.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
