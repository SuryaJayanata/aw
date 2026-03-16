import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Truck, TrendingUp, Package, 
  DollarSign, Menu, X, ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when tab changes
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [activeTab, isMobile]);

  const menuItems = [
    { id: 'fleet', label: 'Fleet Management', icon: LayoutDashboard },
    { id: 'executive', label: 'Executive', icon: TrendingUp },
    { id: 'operations', label: 'Operations', icon: Truck },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'finance', label: 'Finance', icon: DollarSign },
  ];

  // Mobile Header with Hamburger - TANPA BACKGROUND
  if (isMobile) {
    return (
      <>
        {/* Mobile Header - Transparant */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#2D1B4E] hover:bg-purple-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-[#2D1B4E]"></span>
          </div>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Sidebar Drawer */}
        <div className={`
          lg:hidden fixed top-0 left-0 h-full w-64 bg-[#2D1B4E] text-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-10 px-2 font-black text-xl italic">
              <div className="w-8 h-8 bg-[#FF6B6B] rounded flex items-center justify-center not-italic">
                L
              </div>
              <span>LOGICORE</span>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      flex items-center justify-between p-3 rounded-xl cursor-pointer font-bold text-sm 
                      transition-all group
                      ${isActive 
                        ? 'bg-[#FF6B6B] text-white' 
                        : 'text-purple-300 hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {item.label}
                    </div>
                    {isActive && <ChevronRight size={16} />}
                  </div>
                );
              })}
            </nav>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="border-t border-purple-800/50 pt-6">
                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">
                  System v2.0
                </p>
                <p className="text-[8px] text-purple-600 mt-1">
                  © 2026 Logicore
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for mobile - lebih kecil karena header transparant */}
        <div className="h-[60px] lg:hidden" />
      </>
    );
  }

  // Desktop Sidebar (unchanged)
  return (
    <aside className="hidden lg:flex w-64 bg-[#2D1B4E] flex-col p-6 text-white sticky top-0 h-screen">
      <div className="flex items-center gap-3 mb-10 px-2 font-black text-xl italic">
        <div className="w-8 h-8 bg-[#FF6B6B] rounded flex items-center justify-center not-italic">
          L
        </div>
        <span>LOGICORE</span>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold text-sm transition-all ${
                isActive 
                  ? 'bg-[#FF6B6B] text-white' 
                  : 'text-purple-300 hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </div>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-10">
        <div className="border-t border-purple-800/50 pt-6">
          <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">
            System v2.0
          </p>
          <p className="text-[8px] text-purple-600 mt-1">
            © 2026 Logicore
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;