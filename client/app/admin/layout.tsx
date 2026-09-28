'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Package, PlusCircle, ShoppingCart, 
  Star, BarChart3, Settings, Sparkles, ArrowLeft, ShieldCheck, Menu, X, LogOut 
} from 'lucide-react';
import { useStore } from '../../lib/context/StoreContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Skip layout wrap & auth check if currently on login route
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    try {
      const auth = localStorage.getItem('sheestuff_admin_auth');
      if (auth === 'authenticated_admin_session_token') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    } catch (e) {
      setIsAuthenticated(false);
      router.push('/admin/login');
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('sheestuff_admin_auth');
    showToast('Logged out of Admin Portal');
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#00030E] text-[#F3E9EC] font-serif">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[#B47A9A] animate-spin" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', href: '/admin/products', icon: Package },
    { name: 'Add New Product', href: '/admin/products/new', icon: PlusCircle },
    { name: 'Orders Manager', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customer Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Sales Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3E9EC] text-[#00030E]">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#00030E] text-[#F3E9EC] border-r border-[#2C1B2F] p-6 justify-between flex-shrink-0">
        
        <div className="space-y-8">
          {/* Admin Brand Logo */}
          <div className="flex items-center gap-3 border-b border-[#2C1B2F] pb-5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2C1B2F] via-[#5E3A5C] to-[#B47A9A] flex items-center justify-center text-white shadow border border-[#B47A9A]/30">
              <Sparkles className="w-5 h-5 text-[#F3E9EC]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight block text-white leading-tight">
                SheeStuff
              </span>
              <span className="text-[10px] text-[#B47A9A] tracking-wider uppercase font-semibold block">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-[#2C1B2F] text-white shadow-md border border-[#B47A9A]/30 font-bold'
                      : 'text-[#F3E9EC]/70 hover:bg-[#0B0E1A] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#B47A9A]' : 'text-[#5E3A5C]'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#2C1B2F] space-y-3 text-xs">
          <div className="flex items-center justify-between text-[#B47A9A] font-semibold bg-[#0B0E1A] p-3 rounded-2xl border border-[#2C1B2F]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Active</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-rose-400 hover:text-rose-300"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-2 text-[#F3E9EC]/70 hover:text-white transition px-2 py-1 font-medium"
          >
            <ArrowLeft className="w-4 h-4 text-[#B47A9A]" />
            <span>View Storefront</span>
          </Link>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-[#0B0E1A] text-white p-4 px-6 border-b border-[#2C1B2F] flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#2C1B2F] text-white"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-serif font-bold text-base text-[#F3E9EC]">
              SheeStuff Store Management Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-[#B47A9A] hover:text-white font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#5E3A5C] text-white font-serif font-bold text-xs flex items-center justify-center border border-[#B47A9A]">
              SD
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden bg-[#00030E] text-white p-4 border-b border-[#2C1B2F] space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#2C1B2F] text-xs font-semibold"
                >
                  <Icon className="w-4 h-4 text-[#B47A9A]" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
