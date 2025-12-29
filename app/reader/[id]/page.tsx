"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertTriangle } from "lucide-react";

// --- MOCK BOOK CONTENT (Pages) ---
// In a real app, this would fetch secure encrypted JSON
const BOOK_PAGES = [
  "CHAPTER 1: THE FOUNDATION\n\nTo build a legacy, one must first understand the ground upon which they stand. The digital economy is not merely a marketplace; it is a battlefield of attention. \n\nThose who control the narrative control the capital.",
  "THE ARCHITECTURE OF VALUE\n\nValue is not created in a vacuum. It is the result of relentless iteration and the courage to ship before you feel ready. \n\nConsider the masters of industry: they did not wait for permission.",
  "SCALE AND LEVERAGE\n\nCode and media are the two forms of leverage that allow you to separate your inputs from your outputs. \n\nOnce you write the software, or write the book, it works for you while you sleep."
];

export default function SecureReader() {
  const router = useRouter();
  const params = useParams();
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Dynamic Watermark Position
  const [watermarkPos, setWatermarkPos] = useState({ x: 100, y: 100 });

  // --- 1. SECURITY: DISABLE RIGHT CLICK ---
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Try to block print screen or copy shortcuts (limited support)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'p' || e.key === 's')) {
        e.preventDefault();
        alert("Protected Content: Copying and Printing is disabled.");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // --- 2. SECURITY: CANVAS RENDERING (No Selectable Text) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear Canvas
    ctx.fillStyle = "#111"; // Reader Background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text Settings
    ctx.font = `${20 * zoom}px Georgia`; // Font size scales with zoom
    ctx.fillStyle = "#e5e5e5"; // Text Color
    ctx.textBaseline = "top";

    const text = BOOK_PAGES[pageIndex];
    const maxWidth = canvas.width - 100; // Padding
    const lineHeight = 35 * zoom;
    let x = 50;
    let y = 80;

    // Word Wrap Logic for Canvas
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);

  }, [pageIndex, zoom]);

  // --- 3. SECURITY: DYNAMIC WATERMARK ---
  useEffect(() => {
    // Move watermark randomly every 5 seconds
    const interval = setInterval(() => {
      setWatermarkPos({
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 100)
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // FULL SCREEN OVERLAY (Covers Navbar/Footer)
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col h-screen w-screen overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-white/10 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/library")} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div>
            <h2 className="font-bold text-sm">Secure Reader</h2>
            <p className="text-xs text-gray-500">Page {pageIndex + 1} of {BOOK_PAGES.length}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => Math.max(0.8, z - 0.1))} className="p-2 hover:bg-white/10 rounded-full">
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 hover:bg-white/10 rounded-full">
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* READER AREA */}
      <div className="flex-1 relative flex items-center justify-center bg-[#111] overflow-hidden">
        
        {/* Navigation - Left */}
        <button 
          onClick={() => setPageIndex(i => Math.max(0, i - 1))}
          disabled={pageIndex === 0}
          className="absolute left-4 z-20 p-4 rounded-full bg-black/50 hover:bg-blue-500 text-white disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* SECURE CANVAS LAYER */}
        {/* We use width/height of standard screen, in real app this listens to resize */}
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={1000}
          className="bg-[#111] shadow-2xl max-w-full max-h-full"
        />

        {/* WATERMARK LAYER (Pointer events none allows clicking through it) */}
        <div 
          style={{ top: watermarkPos.y, left: watermarkPos.x }}
          className="absolute pointer-events-none opacity-10 z-10 select-none"
        >
          <div className="transform -rotate-12 text-xl font-black text-white/50 whitespace-nowrap">
            Licensed to: alex@example.com
            <br />
            ID: 884-292-SECURE
          </div>
        </div>

        {/* Navigation - Right */}
        <button 
          onClick={() => setPageIndex(i => Math.min(BOOK_PAGES.length - 1, i + 1))}
          disabled={pageIndex === BOOK_PAGES.length - 1}
          className="absolute right-4 z-20 p-4 rounded-full bg-black/50 hover:bg-blue-500 text-white disabled:opacity-30 transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* SECURITY WARNING BANNER */}
      <div className="bg-red-900/20 text-red-400 text-xs text-center py-1 border-t border-red-500/20 select-none">
        <span className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-3 h-3" />
          Protected Content. Screenshots and copying are monitored.
        </span>
      </div>

    </div>
  );
}
