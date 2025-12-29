"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, LogOut, Camera } from "lucide-react";
import { Button } from "../../components/ui/Button"; // <--- Toolkit
import { Input } from "../../components/ui/Input";   // <--- Toolkit

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API update
    setTimeout(() => {
      setIsLoading(false);
      alert("Profile updated successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-10 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        {/* 1. PROFILE PICTURE SECTION */}
        <div className="flex items-center gap-6 mb-12 p-6 rounded-2xl bg-neutral-900 border border-white/5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-neutral-800 border-2 border-white/10 flex items-center justify-center text-3xl font-bold">
              JD
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-gray-400">john.doe@example.com</p>
            <p className="text-xs text-blue-400 mt-1 uppercase font-bold tracking-wider">Premium Member</p>
          </div>
        </div>

        {/* 2. FORMS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Personal Info */}
          <form onSubmit={handleUpdate} className="p-6 rounded-2xl bg-neutral-900 border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-lg font-bold mb-2">
              <User className="w-5 h-5 text-blue-500" /> Personal Information
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="First Name" defaultValue="John" />
              <Input label="Last Name" defaultValue="Doe" />
            </div>
            <Input label="Email" defaultValue="john.doe@example.com" disabled className="opacity-50 cursor-not-allowed" />
            
            <div className="flex justify-end">
              <Button variant="primary" isLoading={isLoading}>Save Changes</Button>
            </div>
          </form>

          {/* Security */}
          <form className="p-6 rounded-2xl bg-neutral-900 border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-lg font-bold mb-2">
              <Lock className="w-5 h-5 text-purple-500" /> Security
            </div>
            
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            
            <div className="flex justify-end">
              <Button variant="secondary">Update Password</Button>
            </div>
          </form>

          {/* Danger Zone */}
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-red-400">Sign Out</h3>
              <p className="text-sm text-red-500/60">Securely log out of your account on this device.</p>
            </div>
            <Button variant="danger">
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </Button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}