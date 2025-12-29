"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, UploadCloud } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Products", href: "/admin/products", icon: <Package className="w-4 h-4" /> },
    { name: "Upload", href: "/admin/upload", icon: <UploadCloud className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-20">
      
      {/* Admin Header */}
      <div className="border-b border-white/10 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-30 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Command Center</h1>
              <p className="text-gray-400 text-sm">Manage your digital empire</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
              ADMIN MODE
            </div>
          </div>

          {/* Admin Tabs */}
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link 
                  key={tab.name} 
                  href={tab.href}
                  className={`pb-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                    isActive 
                      ? "border-blue-500 text-blue-400" 
                      : "border-transparent text-gray-500 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
