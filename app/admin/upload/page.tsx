"use client";
import { useState } from "react";
import { UploadCloud, FileText, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";
// FIXED IMPORTS (Added one more '../' to all three lines)
import { Button } from "../../../components/ui/Button"; 
import { Input } from "../../../components/ui/Input";   
import { Modal } from "../../../components/ui/Modal";   

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  
  // Modal & Loading State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // --- HANDLERS ---
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handlePublishClick = () => {
    // Simple validation check
    if (!title || !price || !file) {
      alert("Please fill in the title, price, and upload a file.");
      return;
    }
    setIsConfirmOpen(true);
  };

  const confirmPublish = () => {
    setIsPublishing(true);
    // Simulate Upload Delay
    setTimeout(() => {
      setIsPublishing(false);
      setIsConfirmOpen(false);
      alert("Product Published Successfully!");
      // Reset Form
      setTitle("");
      setPrice("");
      setAuthor("");
      setFile(null);
    }, 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 relative">
      
      {/* LEFT COLUMN: ASSET UPLOAD ZONES */}
      <div className="space-y-6">
        
        {/* 1. PDF/File Upload Zone */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-white/5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-500" /> Upload Product File
          </h2>
          
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center text-center transition-all ${
              dragActive ? "border-blue-500 bg-blue-500/10" : "border-white/20 hover:border-white/40"
            }`}
          >
            {file ? (
              <div className="flex flex-col items-center animate-in fade-in zoom-in">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
                <p className="font-bold text-white">{file.name}</p>
                <p className="text-xs text-gray-500 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button onClick={() => setFile(null)} className="text-red-400 text-sm hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Remove File
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
                <p className="font-medium text-gray-300">Drag & Drop your PDF/ZIP here</p>
                <p className="text-xs text-gray-500 mt-2">or click to browse files</p>
              </>
            )}
            <input type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} /> 
          </div>
        </div>

        {/* 2. Cover Image Zone */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-white/5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-500" /> Cover Image
          </h2>
          <div className="aspect-video bg-black rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors group">
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-gray-600 group-hover:text-white mx-auto mb-2 transition-colors" />
              <span className="text-sm text-gray-500 group-hover:text-gray-300">Click to upload cover (1920x1080)</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: PRODUCT DETAILS FORM */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-white/5 h-fit">
        <h2 className="font-bold text-lg mb-6">Product Details</h2>
        <div className="space-y-4">
          
          <Input 
            label="Title" 
            placeholder="e.g. Advanced React Patterns" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input 
            label="Author Name" 
            placeholder="e.g. Sarah Jenkins"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Price ($)" 
              type="number"
              placeholder="49.00" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
              <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all">
                <option>Development</option>
                <option>Design</option>
                <option>Business</option>
                <option>Finance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
            <textarea 
              rows={4} 
              placeholder="Describe your product features and benefits..." 
              className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none transition-all" 
            />
          </div>

          <div className="pt-4">
            <Button 
              variant="primary" 
              className="w-full" 
              onClick={handlePublishClick}
            >
              Publish Product
            </Button>
          </div>
        </div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <Modal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        title="Confirm Publication"
      >
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 flex items-start gap-3">
             <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
             <div>
                <h4 className="font-bold text-blue-400 text-sm">Ready to Launch?</h4>
                <p className="text-xs text-gray-400 mt-1">This product will immediately be available in the public store.</p>
             </div>
          </div>

          <div className="py-2 space-y-2 text-sm text-gray-300">
             <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-bold text-white">{title}</span>
             </div>
             <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-bold text-white">${price}</span>
             </div>
             <div className="flex justify-between">
                <span>File:</span>
                <span className="font-bold text-white">{file ? file.name : "No file selected"}</span>
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmPublish} isLoading={isPublishing}>
              Confirm & Publish
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
