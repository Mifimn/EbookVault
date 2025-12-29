"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Used for redirection
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      setIsLoading(false);
      // For demo: Redirect to Home (or Admin if you prefer)
      router.push("/"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-black text-xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Enter your credentials to access your vault.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-4">
            <Input 
              type="email" 
              placeholder="name@example.com" 
              label="Email Address"
              required 
            />
            <Input 
              type="password" 
              placeholder="••••••••" 
              label="Password"
              required 
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white">
              <input type="checkbox" className="rounded bg-neutral-800 border-white/20" />
              Remember me
            </label>
            <Link href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</Link>
          </div>

          <Button variant="primary" className="w-full mt-6" isLoading={isLoading}>
            Sign In <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
          Don't have an account? <Link href="#" className="text-white font-bold hover:underline">Create one</Link>
        </div>
      </motion.div>
    </div>
  );
}