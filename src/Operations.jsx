import React from 'react';
import { 
  Truck, Users, Navigation, 
  MapPin, Search, Clock,
  AlertCircle, Package, Map as MapIcon, Calendar
} from 'lucide-react';

// --- DATA MOCKUP OPERATIONS ---
const STATUS_SUMMARY = [
  { status: 'Assigned', count: 12, color: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
  { status: 'Pickup', count: 8, color: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50' },
  { status: 'On Delivery', count: 24, color: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' },
  { status: 'Delivered', count: 45, color: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50' },
];

const TRIP_DATA = [
  { id: "TRP-9021", truck: "Hino Ranger (B 9012 UI)", driver: "Budi Santoso", route: "Jakarta → Surabaya", status: "On Delivery", update: "10 mins ago" },
  { id: "TRP-9022", truck: "Fuso Fighter (L 1122 AA)", driver: "Ahmad Rifai", route: "Semarang → Bandung", status: "Pickup", update: "2 mins ago" },
  { id: "TRP-9023", truck: "Volvo FH16 (B 4432 KLP)", driver: "Dani Setiawan", route: "Jakarta → Merak", status: "Assigned", update: "Just now" },
  { id: "TRP-9024", truck: "Isuzu Giga (D 8890 XY)", driver: "Eko Prasetyo", route: "Bandung → Solo", status: "Delivered", update: "1 hour ago" },
];

const STATUS_STYLE = {
  'Assigned': 'bg-blue-50 text-blue-700 border-blue-100',
  'Pickup': 'bg-amber-50 text-amber-700 border-amber-100',
  'On Delivery': 'bg-indigo-50 text-indigo-700 border-indigo-100',
  'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

// --- COMPONENTS ---
const KPICard = ({ title, value, icon: Icon, subValue, accentColor }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group text-left">
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`} />
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-slate-600 transition-colors">
        <Icon size={20} />
      </div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Live</div>
    </div>
    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-4xl font-black text-slate-800 mt-1">{value}</h3>
      {subValue && <span className="text-xs font-bold text-slate-400">/ {subValue}</span>}
    </div>
  </div>
);

export default function OperationsDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-10">
      {/* Header */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 gap-6 text-left">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Operations Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium">Daily Delivery Monitoring 2026</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-3 border-r border-slate-100">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shift:</span>
          </div>
          <span className="text-xs font-black text-slate-700 px-2">MORNING B (06:00 - 18:00)</span>
          <button className="bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-indigo-700 transition-all ml-2">
            Refresh Data
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KPICard title="Active Trips" value="44" icon={Navigation} accentColor="bg-indigo-500" />
        <KPICard title="Trips Today" value="89" icon={Package} accentColor="bg-blue-500" />
        <KPICard title="Available Trucks" value="12" subValue="50" icon={Truck} accentColor="bg-emerald-500" />
        <KPICard title="Available Drivers" value="7" subValue="45" icon={Users} accentColor="bg-amber-500" />
      </div>

      {/* Status Panel Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {STATUS_SUMMARY.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 text-left">
              <div className={`w-2 h-2 rounded-full ${s.color}`} />
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{s.status}</span>
            </div>
            <span className={`text-lg font-black ${s.text}`}>{s.count}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-left">
        {/* Trip Monitoring Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Trip Monitoring</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search Trip ID / Driver..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-64" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">Trip ID</th>
                  <th className="px-6 py-4 text-left">Truck & Driver</th>
                  <th className="px-6 py-4 text-left">Route</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Last Update</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50 font-medium">
                {TRIP_DATA.map((trip, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-indigo-600">{trip.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-bold">{trip.truck}</span>
                        <span className="text-[11px] text-slate-400 uppercase font-black tracking-tighter">{trip.driver}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-300" />
                        <span>{trip.route}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${STATUS_STYLE[trip.status]}`}>
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400 text-xs font-bold">
                      <div className="flex items-center justify-end gap-1">
                        <Clock size={12} />
                        {trip.update}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Optional Map / GPS Widget */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl p-1 shadow-lg aspect-square xl:aspect-auto xl:h-[400px] relative overflow-hidden group">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[#1e293b] flex items-center justify-center opacity-40">
              <MapIcon size={64} className="text-slate-700" />
            </div>
            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Live GPS Fleet</span>
              </div>
              
              {/* Float Card Map Info */}
              <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-bold text-xs">Active Tracking</p>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Moving</span>
                    <span className="text-[10px] text-white font-black">38 Units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Stopped</span>
                    <span className="text-[10px] text-white font-black">6 Units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Alert Widget */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle size={16} className="text-rose-500" />
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Urgent Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 items-start p-3 bg-rose-50 rounded-lg border border-rose-100">
                <div className="p-1.5 bg-rose-500 rounded text-white mt-0.5"><Clock size={12}/></div>
                <div>
                  <p className="text-[11px] font-black text-rose-700 uppercase">TRP-9021 Delay</p>
                  <p className="text-[10px] text-rose-600 font-medium leading-tight">Unit stuck at Cikampek toll gate (Accident ahead).</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}