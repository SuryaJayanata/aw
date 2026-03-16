import React, { useState } from 'react';
import { 
  DollarSign, Receipt, Clock, TrendingUp, Truck, MapPin, Calendar, 
  Download, Search, ArrowUpRight, ArrowDownRight, Filter, FileText, 
  Percent, ChevronRight, Plus, CheckCircle, CreditCard, Wallet, 
  Landmark, BarChart3, PieChart, MoreHorizontal, AlertCircle, Layers
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, AreaChart, Area, Legend
} from 'recharts';

// --- ADVANCED DATA MOCKUP ---
const MONTHLY_TREND = [
  { name: 'Jan', revenue: 4200, target: 4000, cost: 3100 },
  { name: 'Feb', revenue: 4800, target: 4500, cost: 3400 },
  { name: 'Mar', revenue: 5100, target: 4800, cost: 3800 },
  { name: 'Apr', revenue: 4700, target: 5000, cost: 3600 },
];

const REVENUE_ROUTE_DATA = [
  { route: "JKT-SBY", revenue: 850, margin: "+12%", load: "92%" },
  { route: "JKT-BDG", revenue: 620, margin: "+8%", load: "85%" },
  { route: "SBY-BALI", revenue: 480, margin: "-2%", load: "70%" },
  { route: "JKT-SMG", revenue: 420, margin: "+5%", load: "88%" },
];

const INVOICE_LIFECYCLE = [
  { stage: 'Draft', count: 12, value: 'Rp 450M', color: 'bg-slate-400' },
  { stage: 'Sent', count: 8, value: 'Rp 280M', color: 'bg-blue-500' },
  { stage: 'Overdue', count: 5, value: 'Rp 120M', color: 'bg-rose-500' },
  { stage: 'Paid', count: 42, value: 'Rp 1.8B', color: 'bg-emerald-500' },
];

// --- COMPONENTS ---

const StatBadge = ({ label, value, trend, isPositive }) => (
  <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-sm">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-end gap-2">
      <h4 className="text-xl font-black text-slate-800">{value}</h4>
      <span className={`text-[10px] font-bold flex items-center mb-1 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend}
      </span>
    </div>
  </div>
);

export default function EnterpriseFinanceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 lg:p-8 font-sans text-slate-900">
      
      {/* TOP NAVIGATION BAR */}
      <nav className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
            <Layers className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">LogiControl <span className="text-indigo-600">Pro</span></h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase italic">Enterprise Finance Engine</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl">
          {['overview', 'invoices', 'fleet_pnl'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-tighter ${
                activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-700">Admin Central</p>
            <p className="text-[10px] text-emerald-500 font-bold">System Online</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" />
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT PANEL (4 COLS): TREND & SUMMARY */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Main Trend Chart */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-black text-slate-800 text-sm uppercase">Revenue vs Target</h3>
              <select className="bg-slate-50 border-none text-[10px] font-bold rounded-lg px-2">
                <option>Q1 2026</option>
              </select>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_TREND}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="target" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <StatBadge label="Efficiency" value="84.2%" trend="1.2%" isPositive={true} />
              <StatBadge label="Burn Rate" value="Rp 42M" trend="0.5%" isPositive={false} />
            </div>
          </div>

          {/* Invoice Lifecycle */}
          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white overflow-hidden relative">
            <h3 className="font-bold text-xs uppercase tracking-widest mb-6 opacity-60">Invoice Pipeline</h3>
            <div className="space-y-4 relative z-10">
              {INVOICE_LIFECYCLE.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs font-bold text-slate-300">{item.stage}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black">{item.value}</p>
                    <p className="text-[9px] opacity-40">{item.count} items</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <PieChart size={200} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (8 COLS): TABLES & LISTS */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Top Row: Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-500 p-6 rounded-[2rem] text-white shadow-lg shadow-emerald-100">
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-xl"><Wallet size={20}/></div>
                <ArrowUpRight size={20} className="opacity-50"/>
              </div>
              <p className="text-[10px] font-bold uppercase opacity-80">Cash in Bank</p>
              <h3 className="text-2xl font-black">Rp 2.4B</h3>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500"><Clock size={20}/></div>
                <AlertCircle size={20} className="text-rose-400 animate-pulse"/>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Avg. Collection</p>
              <h3 className="text-2xl font-black text-slate-800">22 <span className="text-xs font-medium text-slate-400 italic">Days</span></h3>
            </div>
            <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-lg shadow-indigo-100">
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-xl"><BarChart3 size={20}/></div>
                <Percent size={20} className="opacity-50"/>
              </div>
              <p className="text-[10px] font-bold uppercase opacity-80">Tax Provision</p>
              <h3 className="text-2xl font-black">Rp 184M</h3>
            </div>
          </div>

          {/* Route Profitability Table */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-800 text-sm uppercase">Route Profitability</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Performance by geographical sector</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <Filter size={18} className="text-slate-400"/>
              </button>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Main Route</th>
                    <th className="px-6 py-4">Revenue Contribution</th>
                    <th className="px-6 py-4">Margin Δ</th>
                    <th className="px-6 py-4">Load Factor</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {REVENUE_ROUTE_DATA.map((item, i) => (
                    <tr key={i} className="group hover:bg-slate-50/80 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px]">
                            {item.route.split('-')[0]}
                          </div>
                          <span className="font-bold text-sm text-slate-700">{item.route}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
                            <div className="h-full bg-indigo-500" style={{width: `${(item.revenue/850)*100}%`}} />
                          </div>
                          <span className="text-xs font-black text-slate-600">Rp {item.revenue}M</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-xs font-bold ${item.margin.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {item.margin}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-slate-400 font-bold">{item.load}</td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                          <ChevronRight size={20}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 rounded-2xl text-white shadow-2xl shadow-indigo-300 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50">
        <Plus size={28} strokeWidth={3} />
      </button>

    </div>
  );
}