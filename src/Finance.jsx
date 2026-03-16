import React from 'react';
import { 
  DollarSign, Receipt, Clock, TrendingUp,
  Truck, MapPin, Calendar, Download, Search,
  ArrowUpRight, ArrowDownRight, Filter, Eye,
  FileText, Percent, ChevronRight, Plus,
  Clock as ClockIcon, CheckCircle, CreditCard,
  Wallet, Landmark, BarChart3, PieChart
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, LabelList
} from 'recharts';

// --- DATA MOCKUP ---

// KPI Data
const TOTAL_INVOICE = 2458000000;
const PAID_INVOICE = 1875000000;
const OUTSTANDING_INVOICE = 583000000;
const CASH_FLOW = 3240000000;

// Revenue per Route
const REVENUE_ROUTE_DATA = [
  { route: "Jakarta - Surabaya", revenue: 850000000, trips: 124 },
  { route: "Jakarta - Bandung", revenue: 420000000, trips: 89 },
  { route: "Surabaya - Bali", revenue: 380000000, trips: 62 },
  { route: "Jakarta - Semarang", revenue: 320000000, trips: 58 },
  { route: "Bandung - Surabaya", revenue: 290000000, trips: 45 },
  { route: "Jakarta - Merak", revenue: 180000000, trips: 42 },
];

// Revenue per Truck
const REVENUE_TRUCK_DATA = [
  { truck: "Hino PB 2016", revenue: 425000000 },
  { truck: "Fuso EO 0182", revenue: 398000000 },
  { truck: "Volvo FH16", revenue: 512000000 },
  { truck: "Isuzu Giga", revenue: 287000000 },
  { truck: "Hino AK 4605", revenue: 356000000 },
  { truck: "Mitsubishi Fuso", revenue: 298000000 },
];

// PNL per Truck (Table)
const PNL_TRUCK_TABLE = [
  { truck: "Hino PB 2016", plate: "B 9012 UI", revenue: "425.0M", cost: "298.0M", profit: "127.0M" },
  { truck: "Fuso EO 0182", plate: "L 1122 AA", revenue: "398.0M", cost: "281.0M", profit: "117.0M" },
  { truck: "Volvo FH16", plate: "B 4432 KLP", revenue: "512.0M", cost: "346.0M", profit: "166.0M" },
  { truck: "Isuzu Giga", plate: "D 8890 XY", revenue: "287.0M", cost: "201.0M", profit: "86.0M" },
  { truck: "Hino AK 4605", plate: "B 5678 CD", revenue: "356.0M", cost: "249.0M", profit: "107.0M" },
  { truck: "Mitsubishi Fuso", plate: "B 9012 XY", revenue: "298.0M", cost: "212.0M", profit: "86.0M" },
];

// Invoice Monitoring
const INVOICE_DATA = [
  { id: "INV-2026-001", customer: "PT. Global Logistik", amount: "125.5M", dueDate: "2026-03-15", status: "Paid" },
  { id: "INV-2026-002", customer: "Sinar Jaya Makmur", amount: "87.2M", dueDate: "2026-03-14", status: "Paid" },
  { id: "INV-2026-003", customer: "PT. Karya Logistik", amount: "42.5M", dueDate: "2026-03-19", status: "Pending" },
  { id: "INV-2026-004", customer: "CV. Cepat Express", amount: "28.3M", dueDate: "2026-03-06", status: "Overdue" },
  { id: "INV-2026-005", customer: "PT. Indah Kargo", amount: "56.8M", dueDate: "2026-03-22", status: "Pending" },
  { id: "INV-2026-006", customer: "PT. Mitra Transport", amount: "94.1M", dueDate: "2026-03-11", status: "Overdue" },
  { id: "INV-2026-007", customer: "CV. Bintang Logistik", amount: "33.7M", dueDate: "2026-03-16", status: "Pending" },
  { id: "INV-2026-008", customer: "PT. Sumber Rejeki", amount: "67.9M", dueDate: "2026-03-18", status: "Pending" },
];

// Status Colors
const INVOICE_STATUS_STYLE = {
  'Paid': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Pending': 'bg-amber-50 text-amber-600 border-amber-200',
  'Overdue': 'bg-rose-50 text-rose-600 border-rose-200',
};

// --- KPI CARD (style konsisten dengan dashboard lain) ---
const FinanceKPICard = ({ icon: Icon, title, value, trend, trendValue, accentColor, bgColor }) => {
  const formatValue = (val) => {
    if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}M`;
    return `Rp ${val.toLocaleString()}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColor}`} />
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${bgColor} text-white`}>
          <Icon size={22} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-slate-800">{formatValue(value)}</h3>
      </div>
    </div>
  );
};

const formatCurrency = (value) => {
  if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)}M`;
  return `Rp ${value.toLocaleString()}`;
};

export default function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-10">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <DollarSign className="text-emerald-500" size={28} />
            Finance & PNL Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium">Revenue, Profit & Invoice Monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Q1 2026</span>
          </div>
          <button className="bg-emerald-500 p-2 rounded-lg text-white hover:bg-emerald-600 transition-all">
            <Download size={18} />
          </button>
        </div>
      </header>

      {/* KPI Cards Row - 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <FinanceKPICard 
          icon={Receipt} 
          title="Total Invoice" 
          value={TOTAL_INVOICE}
          trend="up"
          trendValue="12.5%"
          accentColor="bg-indigo-500"
          bgColor="bg-indigo-500"
        />
        <FinanceKPICard 
          icon={CheckCircle} 
          title="Paid Invoice" 
          value={PAID_INVOICE}
          trend="up"
          trendValue="8.3%"
          accentColor="bg-emerald-500"
          bgColor="bg-emerald-500"
        />
        <FinanceKPICard 
          icon={ClockIcon} 
          title="Outstanding" 
          value={OUTSTANDING_INVOICE}
          trend="down"
          trendValue="5.2%"
          accentColor="bg-amber-500"
          bgColor="bg-amber-500"
        />
        <FinanceKPICard 
          icon={TrendingUp} 
          title="Cash Flow" 
          value={CASH_FLOW}
          trend="up"
          trendValue="15.3%"
          accentColor="bg-purple-500"
          bgColor="bg-purple-500"
        />
      </div>

      {/* FIRST ROW - KOMPOSISI BERBEDA: 7-5 split (bukan 6-6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Revenue per Route - Horizontal Bar (7 cols) - BENTUK BERBEDA */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-indigo-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Revenue per Route</h3>
            <span className="ml-auto text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-bold">
              Top 5 Routes
            </span>
          </div>
          
          {/* HORIZONTAL PROGRESS BARS - berbeda dari bar chart biasa */}
          <div className="space-y-5">
            {REVENUE_ROUTE_DATA.slice(0, 5).map((item, idx) => {
              const percentage = (item.revenue / 850000000) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{item.route}</span>
                    </div>
                    <span className="text-xs font-black text-indigo-600">{formatCurrency(item.revenue)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-400 w-16">{item.trips} trips</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue per Truck - Bar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-emerald-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Revenue per Truck</h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_TRUCK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="truck" axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8'}} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8'}} tickFormatter={(value) => `${value/1000000}M`} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16}>
                  <LabelList dataKey="revenue" position="top" formatter={(v) => `${(v/1000000).toFixed(0)}M`} style={{fontSize: 7, fill: '#475569'}} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECOND ROW - KOMPOSISI BERBEDA: 5-7 split (kebalikan dari row pertama) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* PNL per Truck Table - 5 cols */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
              <Percent size={16} className="text-emerald-500" />
              PNL per Truck
            </h3>
          </div>
          
          <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-white text-slate-400 font-black uppercase tracking-widest border-b border-slate-50 sticky top-0">
                <tr>
                  <th className="px-4 py-4 text-left">Truck</th>
                  <th className="px-4 py-4 text-left">Plate</th>
                  <th className="px-4 py-4 text-right">Revenue</th>
                  <th className="px-4 py-4 text-right">Cost</th>
                  <th className="px-4 py-4 text-right">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {PNL_TRUCK_TABLE.map((truck, i) => (
                  <tr key={i} className="hover:bg-emerald-50/20 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-700">{truck.truck}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{truck.plate}</td>
                    <td className="px-4 py-3 text-right font-black text-indigo-600">{truck.revenue}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-500">{truck.cost}</td>
                    <td className="px-4 py-3 text-right font-black text-emerald-600">{truck.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Monitoring Table - 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
              <FileText size={16} className="text-indigo-500" />
              Invoice Monitoring
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-indigo-50 hover:border-indigo-200 transition-all">
                All
              </button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-amber-50 hover:border-amber-200 transition-all">
                Pending
              </button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-rose-50 hover:border-rose-200 transition-all">
                Overdue
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-white text-slate-400 font-black uppercase tracking-widest border-b border-slate-50">
                <tr>
                  <th className="px-4 py-4 text-left">Customer</th>
                  <th className="px-4 py-4 text-left">Invoice</th>
                  <th className="px-4 py-4 text-left">Due Date</th>
                  <th className="px-4 py-4 text-center">Status</th>
                  <th className="px-4 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {INVOICE_DATA.map((inv, i) => (
                  <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700">{inv.customer}</td>
                    <td className="px-4 py-3 font-mono font-bold text-indigo-600">{inv.id}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${inv.status === 'Overdue' ? 'text-rose-600' : 'text-slate-500'}`}>
                        {inv.dueDate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[9px] font-black px-2 py-1 rounded-full border ${INVOICE_STATUS_STYLE[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-800">{inv.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-[10px]">
            <span className="text-slate-500">Showing 1-8 of 24 invoices</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">Prev</button>
              <button className="px-3 py-1 bg-indigo-500 text-white rounded">1</button>
              <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">2</button>
              <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">3</button>
              <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* THIRD ROW - SUMMARY CARDS (komposisi berbeda) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 to-white p-5 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <CreditCard size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">Avg Invoice</p>
              <p className="text-lg font-black text-indigo-600">Rp 102.4M</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Wallet size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Collection Rate</p>
              <p className="text-lg font-black text-emerald-600">76.3%</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-gradient-to-br from-amber-50 to-white p-5 rounded-xl border border-amber-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <ClockIcon size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">Avg Payment</p>
              <p className="text-lg font-black text-amber-600">18 days</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Landmark size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-purple-400 uppercase tracking-wider">Profit Margin</p>
              <p className="text-lg font-black text-purple-600">23.5%</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}