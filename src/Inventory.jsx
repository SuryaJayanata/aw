import React from 'react';
import { 
  Disc, Package, AlertTriangle, Truck,
  Calendar, Clock, Download, Search,
  Layers, GitBranch, MapPin,
  Plus, ChevronRight, Filter, Eye
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';

// --- DATA MOCKUP ---

// KPI Data
const TOTAL_TIRES = 245;
const TIRES_INSTALLED = 186;
const TIRES_IN_STOCK = 59;
const LOW_STOCK_SPAREPARTS = 12;

// Tire Usage per Truck
const TIRE_USAGE_PER_TRUCK = [
  { truck: "Hino PB 2016", front: 2, rear: 8, spare: 1, total: 11 },
  { truck: "Fuso EO 0182", front: 2, rear: 8, spare: 1, total: 11 },
  { truck: "Volvo AK 7018", front: 2, rear: 10, spare: 1, total: 13 },
  { truck: "Isuzu PE 0711", front: 2, rear: 8, spare: 1, total: 11 },
  { truck: "Hino AK 4605", front: 2, rear: 8, spare: 1, total: 11 },
  { truck: "Mitsubishi Fuso", front: 2, rear: 8, spare: 1, total: 11 },
];

// Sparepart Consumption per Month
const SPAREPART_CONSUMPTION = [
  { month: 'Jan', filters: 45, brakes: 38, tires: 28 },
  { month: 'Feb', filters: 52, brakes: 42, tires: 32 },
  { month: 'Mar', filters: 48, brakes: 45, tires: 35 },
  { month: 'Apr', filters: 55, brakes: 48, tires: 38 },
  { month: 'May', filters: 58, brakes: 52, tires: 42 },
  { month: 'Jun', filters: 62, brakes: 55, tires: 45 },
  { month: 'Jul', filters: 65, brakes: 58, tires: 48 },
  { month: 'Aug', filters: 68, brakes: 62, tires: 52 },
];

// Tire Position Tracking
const TIRE_TRACKING = [
  { code: "TR-215/75-001", truck: "Hino PB 2016", position: "Front Left", installDate: "2026-01-15", usage: "18,450 km" },
  { code: "TR-215/75-002", truck: "Hino PB 2016", position: "Front Right", installDate: "2026-01-15", usage: "18,450 km" },
  { code: "TR-215/75-003", truck: "Hino PB 2016", position: "Rear Left Outer", installDate: "2026-01-15", usage: "18,450 km" },
  { code: "TR-215/75-004", truck: "Hino PB 2016", position: "Rear Left Inner", installDate: "2026-01-15", usage: "18,450 km" },
  { code: "TR-215/75-005", truck: "Hino PB 2016", position: "Rear Right Outer", installDate: "2026-01-15", usage: "18,450 km" },
  { code: "TR-215/75-006", truck: "Hino PB 2016", position: "Rear Right Inner", installDate: "2026-01-15", usage: "18,450 km" },
  { code: "TR-215/75-007", truck: "Hino PB 2016", position: "Spare", installDate: "2026-01-15", usage: "0 km" },
  { code: "BR-315/80-089", truck: "Fuso EO 0182", position: "Front Left", installDate: "2025-11-05", usage: "42,800 km" },
  { code: "BR-315/80-090", truck: "Fuso EO 0182", position: "Front Right", installDate: "2025-11-05", usage: "42,800 km" },
  { code: "BR-315/80-091", truck: "Fuso EO 0182", position: "Rear Left Outer", installDate: "2025-11-05", usage: "42,800 km" },
  { code: "BR-315/80-092", truck: "Fuso EO 0182", position: "Rear Left Inner", installDate: "2025-11-05", usage: "42,800 km" },
  { code: "BR-315/80-093", truck: "Fuso EO 0182", position: "Rear Right Outer", installDate: "2025-11-05", usage: "42,800 km" },
  { code: "BR-315/80-094", truck: "Fuso EO 0182", position: "Rear Right Inner", installDate: "2025-11-05", usage: "42,800 km" },
];

// Low Stock Tire Alerts
const LOW_STOCK_TIRES = [
  { size: "215/75 R17.5", current: 8, min: 15, status: "Low" },
  { size: "315/80 R22.5", current: 6, min: 12, status: "Low" },
  { size: "295/75 R22.5", current: 4, min: 10, status: "Critical" },
];

// Tire Replacement Due
const TIRE_REPLACEMENT_DUE = [
  { code: "BR-315/80-091", truck: "Fuso EO 0182", position: "Rear Left Outer", usage: "42,800 km", threshold: "45,000 km", dueIn: "5 days" },
  { code: "BR-315/80-092", truck: "Fuso EO 0182", position: "Rear Left Inner", usage: "42,800 km", threshold: "45,000 km", dueIn: "5 days" },
  { code: "BR-315/80-093", truck: "Fuso EO 0182", position: "Rear Right Outer", usage: "42,800 km", threshold: "45,000 km", dueIn: "5 days" },
  { code: "TR-215/75-003", truck: "Hino PB 2016", position: "Rear Left Outer", usage: "38,450 km", threshold: "40,000 km", dueIn: "12 days" },
];

// --- COMPONENTS ---

const KPICard = ({ icon: Icon, title, value, subValue, bgColor }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-lg ${bgColor} text-white`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="mt-3">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        {subValue && <span className="text-xs text-slate-400">/ {subValue}</span>}
      </div>
    </div>
  </div>
);

const AlertBadge = ({ type, children }) => {
  const styles = {
    low: 'bg-amber-50 text-amber-700 border-amber-200',
    critical: 'bg-rose-50 text-rose-700 border-rose-200',
    due: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  };
  return (
    <span className={`text-[9px] font-black px-2 py-1 rounded-full border ${styles[type]}`}>
      {children}
    </span>
  );
};

export default function InventoryDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-10">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Disc className="text-indigo-500" size={28} />
            Inventory Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium">Tires & Spareparts Management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-600">March 2026</span>
          </div>
          <button className="bg-indigo-500 p-2 rounded-lg text-white hover:bg-indigo-600 transition-all">
            <Download size={18} />
          </button>
        </div>
      </header>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KPICard 
          icon={Disc} 
          title="Total Tires" 
          value={TOTAL_TIRES}
          bgColor="bg-indigo-500"
        />
        <KPICard 
          icon={Layers} 
          title="Tires Installed" 
          value={TIRES_INSTALLED}
          subValue={TOTAL_TIRES}
          bgColor="bg-emerald-500"
        />
        <KPICard 
          icon={Package} 
          title="Tires in Stock" 
          value={TIRES_IN_STOCK}
          bgColor="bg-amber-500"
        />
        <KPICard 
          icon={AlertTriangle} 
          title="Low Stock Spareparts" 
          value={LOW_STOCK_SPAREPARTS}
          bgColor="bg-rose-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Tire Usage per Truck - Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-indigo-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Tire Usage per Truck</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TIRE_USAGE_PER_TRUCK} layout="vertical" margin={{ left: 80, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="truck" axisLine={false} tickLine={false} width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="front" stackId="a" fill="#818cf8" name="Front" />
                <Bar dataKey="rear" stackId="a" fill="#fbbf24" name="Rear" />
                <Bar dataKey="spare" stackId="a" fill="#34d399" name="Spare" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sparepart Consumption - Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Sparepart Consumption</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SPAREPART_CONSUMPTION}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="filters" stroke="#818cf8" strokeWidth={2} />
                <Line type="monotone" dataKey="brakes" stroke="#fbbf24" strokeWidth={2} />
                <Line type="monotone" dataKey="tires" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Table & Alert Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tire Position Tracking Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
              <MapPin size={16} className="text-indigo-500" />
              Tire Position Tracking
            </h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tire code..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-60" 
              />
            </div>
          </div>
          
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-white text-slate-400 font-black uppercase tracking-widest border-b border-slate-50 sticky top-0">
                <tr>
                  <th className="px-4 py-4 text-left">Tire Code</th>
                  <th className="px-4 py-4 text-left">Truck</th>
                  <th className="px-4 py-4 text-left">Position</th>
                  <th className="px-4 py-4 text-left">Install Date</th>
                  <th className="px-4 py-4 text-right">Usage (KM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TIRE_TRACKING.map((tire, i) => (
                  <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-indigo-600">{tire.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{tire.truck}</td>
                    <td className="px-4 py-3 text-slate-600">{tire.position}</td>
                    <td className="px-4 py-3 text-slate-500">{tire.installDate}</td>
                    <td className="px-4 py-3 text-right font-black">{tire.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert Panel */}
        <div className="space-y-6">
          
          {/* Low Stock Tire Alert */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-amber-500" />
              <h3 className="font-bold text-sm text-slate-700">Low Stock Tire</h3>
            </div>
            
            <div className="space-y-4">
              {LOW_STOCK_TIRES.map((tire, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0">
                  <div>
                    <p className="text-xs font-bold text-slate-700">{tire.size}</p>
                    <p className="text-[9px] text-slate-400">Stock: {tire.current} / Min: {tire.min}</p>
                  </div>
                  <AlertBadge type={tire.status === 'Critical' ? 'critical' : 'low'}>
                    {tire.status}
                  </AlertBadge>
                </div>
              ))}
            </div>
          </div>

          {/* Tire Replacement Due */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-indigo-500" />
              <h3 className="font-bold text-sm text-slate-700">Tire Replacement Due</h3>
            </div>
            
            <div className="space-y-4">
              {TIRE_REPLACEMENT_DUE.map((tire, idx) => (
                <div key={idx} className="border-b border-slate-50 pb-3 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-xs font-bold text-indigo-600">{tire.code}</span>
                    <AlertBadge type="due">{tire.dueIn}</AlertBadge>
                  </div>
                  <p className="text-[10px] text-slate-600 mb-1">{tire.truck} - {tire.position}</p>
                  <div className="flex justify-between text-[9px]">
                    <span className="text-slate-400">Usage: {tire.usage}</span>
                    <span className="font-bold text-slate-500">Max: {tire.threshold}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 mt-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full" 
                      style={{ width: `${(parseInt(tire.usage.replace(/[^0-9]/g, '')) / 45000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-2">
          <Plus size={14} />
          Add Stock
        </button>
        <button className="px-4 py-2 bg-indigo-500 rounded-lg text-xs font-bold text-white hover:bg-indigo-600 transition-all flex items-center gap-2">
          Generate Report
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}