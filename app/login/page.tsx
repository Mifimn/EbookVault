"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    alert("Redirecting to Google OAuth...");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      setIsLoading(false);
      router.push("/"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-4 hover:scale-105 transition-transform">
            <span className="text-black font-black text-xl">E</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Enter your credentials to access your vault.</p>
        </div>

        {/* --- NEW: GOOGLE LOGIN BUTTON --- */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full h-12 bg-white text-black font-bold rounded-full flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] bg-white/10 flex-1" />
          <span className="text-xs text-gray-500 uppercase font-bold">Or</span>
          <div className="h-[1px] bg-white/10 flex-1" />
        </div>
        {/* -------------------------------- */}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="rounded bg-neutral-800 border-white/20 accent-blue-500" />
              Remember me
            </label>
            <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</Link>
          </div>

          <Button variant="primary" className="w-full mt-6" isLoading={isLoading}>
            Sign In <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
          Don't have an account? <Link href="/signup" className="text-white font-bold hover:underline">Create one</Link>
        </div>
      </motion.div>
    </div>
  );
}
