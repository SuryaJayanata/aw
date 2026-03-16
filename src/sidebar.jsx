import React from "react";
import {
  LayoutDashboard,
  Truck,
  TrendingUp,
  Package,
  DollarSign,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "executive", label: "Executive", icon: TrendingUp },
    { id: "fleet", label: "Fleet Management", icon: LayoutDashboard },
    { id: "operations", label: "Operations", icon: Truck },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "finance", label: "Finance", icon: DollarSign },
  ];

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
                  ? "bg-[#FF6B6B] text-white"
                  : "text-purple-300 hover:bg-white/5"
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
          <p className="text-[8px] text-purple-600 mt-1">© 2026 Logicore</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
