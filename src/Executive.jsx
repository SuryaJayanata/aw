import React from 'react';
import { 
  DollarSign, Truck, TrendingUp, Briefcase, 
  ArrowUpRight, ArrowDownRight, Download, 
  MapPin, Search, Calendar
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, LabelList
} from 'recharts';

// --- DATA MOCKUP ---
const REVENUE_DATA = [
  { month: 'Jan', revenue: 1800 }, { month: 'Feb', revenue: 2100 },
  { month: 'Mar', revenue: 1950 }, { month: 'Apr', revenue: 2300 },
  { month: 'May', revenue: 2200 }, { month: 'Jun', revenue: 2450 },
  { month: 'Jul', revenue: 2150 }, { month: 'Aug', revenue: 2600 },
  { month: 'Sep', revenue: 2350 }, { month: 'Oct', revenue: 2750 },
  { month: 'Nov', revenue: 2650 }, { month: 'Dec', revenue: 3000 },
];

const UTILIZATION_DATA = [
  { month: 'Jan', active: 38, available: 8, maintenance: 4 },
  { month: 'Feb', active: 40, available: 7, maintenance: 3 },
  { month: 'Mar', active: 35, available: 10, maintenance: 5 },
  { month: 'Apr', active: 45, available: 3, maintenance: 2 },
  { month: 'May', active: 42, available: 5, maintenance: 3 },
  { month: 'Jun', active: 48, available: 1, maintenance: 1 },
  { month: 'Jul', active: 41, available: 6, maintenance: 3 },
  { month: 'Aug', active: 46, available: 2, maintenance: 2 },
  { month: 'Sep', active: 43, available: 4, maintenance: 3 },
  { month: 'Oct', active: 48, available: 1, maintenance: 1 },
  { month: 'Nov', active: 45, available: 3, maintenance: 2 },
  { month: 'Dec', active: 49, available: 0, maintenance: 1 },
];

const TABLE_DATA = [
  { id: "TRK-001 (Hino Ranger)", rev: "120000000", profit: "42000000" },
  { id: "TRK-024 (Fuso Fighter)", rev: "115400000", profit: "39800000" },
  { id: "TRK-015 (Volvo FH16)", rev: "108900000", profit: "37500000" },
];

// --- HELPER: EXPORT TO CSV ---
const exportToCSV = () => {
  const headers = "Unit ID,Revenue,Profit\n";
  const rows = TABLE_DATA.map(d => `${d.id},${d.rev},${d.profit}`).join("\n");
  const blob = new Blob([headers + rows], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'top_trucks_performance.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const KPICard = ({ title, value, icon: Icon, percentage, isPositive, accentColor }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group text-left">
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`} />
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-slate-600 transition-colors">
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {percentage}
      </div>
    </div>
    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
    <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
  </div>
);

export default function ExecutiveDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-10">
      {/* Header */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 gap-6 text-left">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Executive Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium">Performance Analysis 2026</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-3 border-r border-slate-100">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Range:</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="date" className="text-xs font-bold text-slate-700 bg-slate-50 border-none rounded-lg p-1.5 outline-none cursor-pointer" defaultValue="2026-01-01" />
            <span className="text-slate-300 text-xs font-bold">to</span>
            <input type="date" className="text-xs font-bold text-slate-700 bg-slate-50 border-none rounded-lg p-1.5 outline-none cursor-pointer" defaultValue="2026-12-31" />
          </div>
          <button className="bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-indigo-700 transition-all ml-2">
            Apply Filter
          </button>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KPICard title="Total Revenue" value="Rp 2.45B" icon={DollarSign} percentage="11.2%" isPositive={true} accentColor="bg-indigo-500" />
        <KPICard title="Total Trips" value="1,240" icon={TrendingUp} percentage="4.5%" isPositive={true} accentColor="bg-blue-500" />
        <KPICard title="Active Trucks" value="48 / 50" icon={Truck} percentage="2.1%" isPositive={false} accentColor="bg-slate-400" />
        <KPICard title="Total Profit" value="Rp 857.5M" icon={Briefcase} percentage="14.8%" isPositive={true} accentColor="bg-emerald-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8 text-left">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-4 bg-indigo-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Revenue Trend (M)</h3>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={22}>
                  <LabelList dataKey="revenue" position="top" offset={10} style={{ fill: '#475569', fontSize: 9, fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Truck Utilization */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Truck Utilization</h3>
            </div>
            <div className="bg-slate-50 px-3 py-1 rounded-md border border-slate-100 text-[10px] font-black text-slate-400 uppercase">U = Unit Status</div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UTILIZATION_DATA} barSize={28} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "11px", fontWeight: "bold" }} />
                <Bar dataKey="active" stackId="a" fill="#10b981" name="On Trip">
                  <LabelList dataKey="active" position="center" style={{ fill: "#fff", fontSize: 9, fontWeight: "900" }} formatter={(v) => v > 10 ? `${((v / 50) * 100).toFixed(0)}%` : ""} />
                </Bar>
                <Bar dataKey="available" stackId="a" fill="#3b82f6" name="Available" />
                <Bar dataKey="maintenance" stackId="a" fill="#f43f5e" name="Maintenance" radius={[4, 4, 0, 0]}>
                  <LabelList position="top" offset={10} style={{ fill: "#475569", fontSize: 10, fontWeight: "bold" }} formatter={(value, entry) => {
                    const d = entry?.payload;
                    if (!d) return "";
                    return `${((d.active / (d.active + d.available + d.maintenance)) * 100).toFixed(0)}% U`;
                  }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: TABLE + WIDGETS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-left">
        
        {/* Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Top Performing Trucks</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search ID..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-40" />
              </div>
              <button onClick={exportToCSV} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
                <Download size={14} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Export CSV</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">Unit ID</th>
                  <th className="px-6 py-4 text-left">Revenue</th>
                  <th className="px-6 py-4 text-right">Net Profit</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50 font-medium">
                {TABLE_DATA.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{item.id}</td>
                    <td className="px-6 py-4 text-slate-500">Rp {(parseInt(item.rev)/1000000).toFixed(1)}M</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-black text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg">Rp {(parseInt(item.profit)/1000000).toFixed(1)}M</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Widgets */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-6 text-left">Top Customers</h3>
            <div className="space-y-4">
              {[{ n: "PT. Global Logistik", v: "Rp 850M" }, { n: "Sinar Jaya Makmur", v: "Rp 620M" }].map((c, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer text-left">
                  <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">{c.n}</span>
                  <span className="text-xs font-black text-slate-900 bg-slate-50 px-2 py-1 rounded">{c.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-6 text-left">Top Routes</h3>
            {[{ r: "Jakarta - Surabaya", t: "124 Trips" }, { r: "Surabaya - Bali", t: "89 Trips" }].map((r, i) => (
              <div key={i} className="flex justify-between items-center mb-4 last:mb-0 text-left">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-indigo-500" />
                  <span className="text-sm font-bold text-slate-600">{r.r}</span>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">{r.t}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}