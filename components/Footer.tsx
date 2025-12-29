import Link from "next/link";
import { Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* BRAND */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                 <span className="text-black font-black text-lg">E</span>
              </div>
              EbookVault
            </Link>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              The premium marketplace for digital assets, developer resources, and business guides. Secure, instant, and forever yours.
            </p>
          </div>

          {/* SHOP CATEGORIES */}
          <div>
            <h3 className="font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/shop?category=Development" className="hover:text-blue-400 transition-colors">Development</Link></li>
              <li><Link href="/shop?category=Design" className="hover:text-blue-400 transition-colors">Design</Link></li>
              <li><Link href="/shop?category=Business" className="hover:text-blue-400 transition-colors">Business</Link></li>
              <li><Link href="/shop?category=Finance" className="hover:text-blue-400 transition-colors">Finance</Link></li>
              <li><Link href="/shop?category=Marketing" className="hover:text-blue-400 transition-colors">Marketing</Link></li>
            </ul>
          </div>

          {/* COMPANY PAGES - Updated Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              {/* Linked to About page for contact info */}
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* LEGAL PAGES */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/license" className="hover:text-blue-400 transition-colors">License Agreement</Link></li>
              <li><Link href="/license" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/license" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {currentYear} EbookVault Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
