import React from 'react';
import { 
  Truck, Wrench, AlertCircle, ShieldAlert, Clock,
  ArrowUpRight, Droplets, Disc, ClipboardCheck
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, LabelList
} from 'recharts';

// --- DATA MOCKUP ---
const MAINTENANCE_COST_DATA = [
  { month: '01/21', cost: 4500 }, { month: '02/21', cost: 5200 },
  { month: '03/21', cost: 4800 }, { month: '04/21', cost: 6100 },
  { month: '05/21', cost: 5500 }, { month: '06/21', cost: 6700 },
  { month: '07/21', cost: 5800 }, { month: '08/21', cost: 6300 },
];

const UTILIZATION_DATA_INITIAL = [
  { month: 'Jan', active: 38, available: 8, maintenance: 4 },
  { month: 'Feb', active: 40, available: 7, maintenance: 3 },
  { month: 'Mar', active: 35, available: 10, maintenance: 5 },
  { month: 'Apr', active: 45, available: 3, maintenance: 2 },
  { month: 'May', active: 42, available: 5, maintenance: 3 },
  { month: 'Jun', active: 48, available: 1, maintenance: 1 },
  { month: 'Jul', active: 40, available: 6, maintenance: 4 },
  { month: 'Aug', active: 44, available: 4, maintenance: 2 },
];

const TABLE_DATA = [
  { id: "S : PB 2016", last: "12 Jan", next: "12 Jul", km: "42,500 km", status: "Active" },
  { id: "S : EO 0182", last: "05 Nov", next: "05 May", km: "88,200 km", status: "Maintenance" },
  { id: "S : AK 7018", last: "20 Feb", next: "20 Aug", km: "12,100 km", status: "Active" },
  { id: "S : PE 0711", last: "15 Dec", next: "15 Jun", km: "95,400 km", status: "Available" },
];

const STATUS_STYLE = {
  'Active': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Available': 'bg-blue-50 text-blue-600 border-blue-100',
  'Maintenance': 'bg-rose-50 text-rose-600 border-rose-100',
};

const TOTAL_UNITS = 50;

// --- KPI CARD COMPONENT ---
const KPIProgressCard = ({ icon: Icon, title, value, available, service, progress }) => (
  <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm text-left">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-full bg-purple-50 text-[#2D1B4E] border border-purple-100">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-2xl font-black text-[#2D1B4E] leading-none">{value}</h3>
        <p className="text-[10px] text-purple-400 mt-1 uppercase font-bold tracking-widest">{title}</p>
      </div>
    </div>
    <div className="w-full bg-purple-50 h-1.5 mb-2 rounded-full overflow-hidden">
      <div className="bg-[#FF6B6B] h-full" style={{ width: `${progress}%` }} />
    </div>
    <div className="flex justify-between text-[9px] text-purple-500 font-black uppercase">
      <span>Available: {available}</span>
      <span>Service: {service}</span>
    </div>
  </div>
);

export default function FleetDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F0FF] p-8 overflow-y-auto">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex-1 text-center">
          <h1 className="text-xl font-black text-[#2D1B4E] tracking-tight uppercase">Fleet Management</h1>
        </div>
        <div className="text-right leading-tight">
          <p className="text-lg font-black text-[#2D1B4E]">12:15 PM</p>
          <p className="text-[10px] text-purple-400 font-bold uppercase">03/16/2026</p>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        
        {/* LEFT CONTENT (9 Columns) */}
        <div className="col-span-12 xl:col-span-9 space-y-6">
          
          {/* 1. KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPIProgressCard icon={Truck} title="Total Trucks" value="50" available={42} service={3} progress={84} />
            <KPIProgressCard icon={ArrowUpRight} title="Trucks On Trip" value="42" available={5} service={3} progress={70} />
            <KPIProgressCard icon={Wrench} title="In Maintenance" value="3" available={1} service={2} progress={30} />
            <KPIProgressCard icon={AlertCircle} title="Maintenance Due" value="8" available={0} service={8} progress={15} />
          </div>

          {/* 2. Charts & Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Maintenance Cost Bar Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <h3 className="font-black text-[#2D1B4E] text-xs uppercase mb-1 flex items-center gap-2">
                <div className="w-1 h-3 bg-[#FF6B6B] rounded-full" /> Maintenance Cost
              </h3>
              <p className="text-[10px] text-purple-400 font-bold mb-6 italic">in USD ($)</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MAINTENANCE_COST_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="cost" fill="#FF6B6B" radius={[4, 4, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Widgets */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-purple-100 border-l-4 border-[#FF6B6B] shadow-sm h-[95px] flex flex-col justify-center">
                <p className="text-[10px] text-purple-400 uppercase font-black tracking-widest mb-1">Total Fuel Cost</p>
                <p className="text-2xl font-black text-[#2D1B4E]">$172,854</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-purple-100 border-l-4 border-purple-500 shadow-sm h-[95px] flex flex-col justify-center">
                <p className="text-[10px] text-purple-400 uppercase font-black tracking-widest mb-1">Total Service</p>
                <p className="text-2xl font-black text-[#2D1B4E]">$24,895</p>
              </div>
              <div className="bg-[#2D1B4E] p-6 rounded-2xl shadow-lg h-[95px] flex flex-col justify-center">
                <p className="text-[10px] text-purple-300 uppercase font-black tracking-widest mb-1">Total Insurance</p>
                <p className="text-2xl font-black text-white">$13,610</p>
              </div>
            </div>

            {/* Truck Utilization Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3 bg-[#2D1B4E] rounded-full" />
                  <h3 className="font-black text-[#2D1B4E] text-xs uppercase tracking-widest">Truck Utilization</h3>
                </div>
                <div className="bg-purple-50 px-3 py-1 rounded-md border border-purple-100">
                  <span className="text-[10px] font-black text-[#2D1B4E]">Total Units: 50</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={UTILIZATION_DATA_INITIAL} barSize={20} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} formatter={(value) => [`${value} Units`]} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "11px", fontWeight: "bold" }} />
                    <Bar dataKey="active" stackId="a" fill="#FF6B6B" name="On Trip">
                      <LabelList 
                        dataKey="active" 
                        position="center" 
                        style={{ fill: "#fff", fontSize: 8, fontWeight: "900" }} 
                        formatter={(v) => `${((v / TOTAL_UNITS) * 100).toFixed(0)}%`} 
                      />
                    </Bar>
                    <Bar dataKey="available" stackId="a" fill="#9F7AEA" name="Available" />
                    <Bar dataKey="maintenance" stackId="a" fill="#2D1B4E" name="Maintenance" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Total Summary Distance */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-center border-l-4 border-[#2D1B4E]">
              <div className="w-10 h-1 bg-[#FF6B6B] mb-3 rounded-full" />
              <p className="text-[10px] text-purple-400 uppercase font-black tracking-widest mb-1">Total Travels</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-black text-[#2D1B4E]">725,428</p>
                <span className="text-xs font-bold text-purple-400 uppercase">km</span>
              </div>
            </div>
          </div>

          {/* 3. Truck Service Status Table */}
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden mt-6">
            <div className="p-5 border-b border-purple-50 flex justify-between items-center bg-purple-50/20">
              <h3 className="font-black text-[#2D1B4E] text-xs uppercase tracking-widest flex items-center gap-2">
                <Clock size={16} className="text-[#FF6B6B]" /> Truck Service Status
              </h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-white text-purple-400 font-black uppercase tracking-tighter border-b border-purple-50">
                <tr>
                  <th className="px-6 py-4">Unit ID</th>
                  <th className="px-6 py-4">Last Service</th>
                  <th className="px-6 py-4">Next Service</th>
                  <th className="px-6 py-4">Mileage</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {TABLE_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#2D1B4E]">{row.id}</td>
                    <td className="px-6 py-4 text-purple-500">{row.last}</td>
                    <td className="px-6 py-4 text-[#FF6B6B] font-black">{row.next}</td>
                    <td className="px-6 py-4 font-black">{row.km}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${STATUS_STYLE[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDEBAR - Alert Panel */}
        <div className="col-span-12 xl:col-span-3 space-y-6">
          <div className="bg-white/60 p-6 rounded-2xl border border-purple-100 shadow-sm h-full backdrop-blur-sm">
            <h3 className="text-[#2D1B4E] font-black text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
              <ShieldAlert size={16} className="text-[#FF6B6B]" /> Alert Panel
            </h3>
            
            <div className="space-y-6">
              {/* Breakdown Alert */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-rose-100 text-rose-600"><AlertCircle size={16}/></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] font-black text-rose-600 uppercase">Breakdown</p>
                    <span className="text-[8px] font-bold text-purple-300">10m ago</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#2D1B4E] leading-tight">TRK-001: Engine Overheat at KM 102 Cipali.</p>
                </div>
              </div>

              {/* Service Due Alerts */}
              {[
                { date: '03/16', task: 'Oil Change', icon: Droplets, color: 'text-[#FF6B6B]', id: 'S : EO 0182' },
                { date: '03/17', task: 'Tire Change', icon: Disc, color: 'text-purple-400', id: 'S : AK 4605' },
                { date: '03/18', task: 'General Check', icon: ClipboardCheck, color: 'text-purple-400', id: 'S : PB 2016' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group border-b border-purple-50 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-purple-300 w-8">{item.date}</span>
                    <item.icon size={14} className={item.color} />
                    <span className="text-[11px] text-[#2D1B4E] font-bold group-hover:text-[#FF6B6B] transition-colors">{item.task}</span>
                  </div>
                  <span className="text-[8px] bg-purple-50 px-1 rounded text-purple-500 font-mono">{item.id}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-12 py-3 bg-[#2D1B4E] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6B6B] transition-all shadow-lg">
              View All Schedule
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}