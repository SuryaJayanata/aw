import React from 'react';
import { 
  Disc, Package, AlertTriangle, Truck,
  Calendar, Clock, Download, Search,
  TrendingDown, Activity, Layers, GitBranch,
  Wrench, Gauge, Filter, Eye, MapPin,
  Circle, Plus, ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, LabelList,
  PieChart, Pie, Cell, LineChart, Line,
  AreaChart, Area
} from 'recharts';

// --- DATA MOCKUP ---

// KPI Data
const INVENTORY_KPI = {
  totalTires: 245,
  tiresInstalled: 186,
  tiresInStock: 59,
  lowStockItems: 12,
  sparepartItems: 187
};

// Tire Usage by Position
const TIRE_POSITION_USAGE = [
  { position: 'Front Left', count: 42, treadAvg: 8.2 },
  { position: 'Front Right', count: 42, treadAvg: 8.1 },
  { position: 'Rear Left Outer', count: 38, treadAvg: 6.4 },
  { position: 'Rear Left Inner', count: 38, treadAvg: 6.8 },
  { position: 'Rear Right Outer', count: 38, treadAvg: 6.3 },
  { position: 'Rear Right Inner', count: 38, treadAvg: 6.7 },
  { position: 'Spare', count: 24, treadAvg: 12.5 },
];

// Sparepart Categories Stock
const SPAREPART_STOCK = [
  { category: 'Oil Filters', stock: 45, minStock: 20, unit: 'pcs' },
  { category: 'Fuel Filters', stock: 32, minStock: 15, unit: 'pcs' },
  { category: 'Air Filters', stock: 28, minStock: 12, unit: 'pcs' },
  { category: 'Brake Pads', stock: 24, minStock: 15, unit: 'sets' },
  { category: 'Brake Shoes', stock: 18, minStock: 10, unit: 'sets' },
  { category: 'Belts', stock: 35, minStock: 20, unit: 'pcs' },
  { category: 'Oil (Ltr)', stock: 120, minStock: 60, unit: 'ltr' },
  { category: 'Coolant', stock: 85, minStock: 40, unit: 'ltr' },
];

// Tire Replacement Forecast
const TIRE_FORECAST = [
  { month: 'Jan', replacements: 8 },
  { month: 'Feb', replacements: 12 },
  { month: 'Mar', replacements: 15 },
  { month: 'Apr', replacements: 10 },
  { month: 'May', replacements: 18 },
  { month: 'Jun', replacements: 22 },
  { month: 'Jul', replacements: 16 },
  { month: 'Aug', replacements: 14 },
];

// Tire Position Tracking (Simplified for table)
const TIRE_TRACKING = [
  { code: "TR-215/75-001", truck: "Hino PB 2016", pos: "FL", status: "Good", wear: "25%", age: "62 days" },
  { code: "TR-215/75-002", truck: "Hino PB 2016", pos: "FR", status: "Good", wear: "25%", age: "62 days" },
  { code: "TR-215/75-003", truck: "Hino PB 2016", pos: "RLO", status: "Good", wear: "28%", age: "62 days" },
  { code: "TR-215/75-004", truck: "Hino PB 2016", pos: "RLI", status: "Good", wear: "27%", age: "62 days" },
  { code: "BR-315/80-089", truck: "Fuso EO 0182", pos: "FL", status: "Worn", wear: "72%", age: "132 days" },
  { code: "BR-315/80-090", truck: "Fuso EO 0182", pos: "FR", status: "Worn", wear: "73%", age: "132 days" },
  { code: "BR-315/80-091", truck: "Fuso EO 0182", pos: "RLO", status: "Critical", wear: "92%", age: "132 days" },
  { code: "BR-315/80-092", truck: "Fuso EO 0182", pos: "RLI", status: "Critical", wear: "91%", age: "132 days" },
];

// Low Stock Alerts
const LOW_STOCK = [
  { item: "Brake Pad (Front)", stock: 3, min: 8, reorder: "Urgent" },
  { item: "Oil Filter", stock: 5, min: 12, reorder: "Soon" },
  { item: "Fuel Filter", stock: 4, min: 10, reorder: "Soon" },
  { item: "Air Filter", stock: 6, min: 15, reorder: "Normal" },
];

// Status Colors
const STATUS_COLOR = {
  'Good': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Worn': 'bg-amber-50 text-amber-600 border-amber-200',
  'Critical': 'bg-rose-50 text-rose-600 border-rose-200',
};

const REORDER_COLOR = {
  'Urgent': 'bg-rose-100 text-rose-700',
  'Soon': 'bg-amber-100 text-amber-700',
  'Normal': 'bg-blue-100 text-blue-700',
};

// --- COMPONENTS ---

const KPICard = ({ icon: Icon, title, value, subValue, color, bgColor }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-lg ${bgColor} text-white`}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-bold text-slate-400">Updated</span>
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

const StockBar = ({ label, value, min, max = 100 }) => {
  const percentage = (value / max) * 100;
  const isLow = value < min;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="font-bold text-slate-600">{label}</span>
        <span className={`font-black ${isLow ? 'text-rose-600' : 'text-slate-700'}`}>
          {value} {isLow && '⚠️'}
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-indigo-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function InventoryDashboard() {
  // Pie chart colors
  const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6'];
  
  // Data for tire status pie
  const tireStatusData = [
    { name: 'Good', value: 142 },
    { name: 'Worn', value: 35 },
    { name: 'Critical', value: 9 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-10">
      
      {/* Header - Consistent with other dashboards */}
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

      {/* KPI Cards Row - 4 cards but different metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KPICard 
          icon={Disc} 
          title="Total Tires" 
          value="245" 
          color="indigo"
          bgColor="bg-indigo-500"
        />
        <KPICard 
          icon={Layers} 
          title="Installed Tires" 
          value="186" 
          subValue="245"
          color="emerald"
          bgColor="bg-emerald-500"
        />
        <KPICard 
          icon={Package} 
          title="Sparepart Items" 
          value="187" 
          color="amber"
          bgColor="bg-amber-500"
        />
        <KPICard 
          icon={AlertTriangle} 
          title="Low Stock Items" 
          value="12" 
          color="rose"
          bgColor="bg-rose-500"
        />
      </div>

      {/* First Row - Different composition: 8-4 split instead of 9-3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Tire Position Usage - Horizontal bars (different from other dashboards) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-indigo-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Tire Usage by Position</h3>
          </div>
          
          <div className="space-y-4">
            {TIRE_POSITION_USAGE.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-24 text-[10px] font-bold text-slate-500">{item.position}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full"
                        style={{ width: `${(item.count / 50) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black w-12">{item.count} tires</span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 w-16">Ø {item.treadAvg}mm</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tire Status Distribution - Pie Chart (different from Fleet's bar chart) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Tire Health Status</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tireStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tireStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tires`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {tireStatusData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }} />
                <span className="text-[9px] font-bold">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row - Sparepart Stock & Tire Forecast (different layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Sparepart Stock Levels - Table style (different from other tables) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Sparepart Stock Levels</h3>
            </div>
            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">Min Stock • Max Stock</span>
          </div>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {SPAREPART_STOCK.map((item, idx) => (
              <div key={idx} className="border-b border-slate-50 pb-3 last:border-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">{item.category}</span>
                  <span className="text-[9px] font-mono text-slate-400">{item.unit}</span>
                </div>
                <StockBar 
                  label="Stock" 
                  value={item.stock} 
                  min={item.minStock} 
                  max={item.minStock * 3}
                />
                <div className="flex justify-between text-[8px] text-slate-400 mt-1">
                  <span>Min: {item.minStock}</span>
                  <span>Max: {item.minStock * 3}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Two stacked widgets */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Tire Replacement Forecast */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Tire Replacement Forecast</h3>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIRE_FORECAST} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8'}} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="replacements" stroke="#6366f1" fill="#818cf8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs font-black text-indigo-600">132 tires need replacement this year</span>
            </div>
          </div>

          {/* Low Stock Alert - Compact */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-amber-500" />
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Low Stock Alerts</h3>
            </div>
            
            <div className="space-y-3">
              {LOW_STOCK.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-700">{item.item}</p>
                    <p className="text-[9px] text-slate-400">Stock: {item.stock} / Min: {item.min}</p>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-1 rounded-full ${REORDER_COLOR[item.reorder]}`}>
                    {item.reorder}
                  </span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-[10px] font-black text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
              View All
            </button>
          </div>
        </div>
      </div>

      {/* Third Row - Tire Tracking Table (similar but with different columns) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
            <MapPin size={16} className="text-indigo-500" />
            Tire Position Tracking
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tire code..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-60" 
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              <Filter size={14} className="text-slate-500" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-white text-slate-400 font-black uppercase tracking-widest border-b border-slate-50">
              <tr>
                <th className="px-4 py-4 text-left">Tire Code</th>
                <th className="px-4 py-4 text-left">Truck</th>
                <th className="px-4 py-4 text-center">Pos</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-right">Wear %</th>
                <th className="px-4 py-4 text-right">Age</th>
                <th className="px-4 py-4 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TIRE_TRACKING.map((tire, i) => (
                <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">{tire.code}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{tire.truck}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-[9px] font-bold bg-slate-100 px-2 py-1 rounded">{tire.pos}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full border ${STATUS_COLOR[tire.status]}`}>
                      {tire.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-black">
                    <div className="flex items-center justify-end gap-2">
                      <span>{tire.wear}</span>
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            parseInt(tire.wear) > 80 ? 'bg-rose-500' : 
                            parseInt(tire.wear) > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: tire.wear }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500">{tire.age}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-1 hover:bg-indigo-100 rounded">
                      <Eye size={14} className="text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-[10px]">
          <span className="text-slate-500">Showing 1-8 of 245 tires</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all text-[9px] font-bold">Previous</button>
            <button className="px-3 py-1 bg-indigo-500 text-white rounded text-[9px] font-bold">1</button>
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all text-[9px] font-bold">2</button>
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all text-[9px] font-bold">3</button>
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all text-[9px] font-bold">Next</button>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer - Different from others */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center gap-2">
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