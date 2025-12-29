interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>}
      
      <input
        className={`w-full bg-black border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 transition-all ${
          error 
            ? "border-red-500 focus:ring-red-500/20" 
            : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
        } ${className}`}
        {...props}
      />
      
      {error && <p className="text-red-400 text-xs font-medium animate-pulse">{error}</p>}
    </div>
  );
}