"use client";
import { motion, HTMLMotionProps } from "framer-motion";

// FIX: Extend HTMLMotionProps to prevent TypeScript conflicts
interface InputProps extends HTMLMotionProps<"input"> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>}
      <motion.input
        whileFocus={{ scale: 1.01, borderColor: "rgba(59, 130, 246, 0.5)" }}
        className={`w-full h-12 px-4 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
}