"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, UploadCloud, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Upload", href: "/admin/upload", icon: UploadCloud },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-2">
            <div className="mb-6 px-4">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Admin Panel</h2>
            </div>

            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-white text-black shadow-lg shadow-white/10" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}

            {/* Logout Button */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link 
                href="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Link>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}