"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

// FIX: 
// 1. Add 'size' prop so the Marketing Page can use size="sm"
// 2. Use Omit<HTMLMotionProps...> to keep the 'onDrag' fix active
interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading, 
  className = "", 
  ...props 
}: ButtonProps) {
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    secondary: "bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      className={`rounded-full font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
