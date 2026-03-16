import React from 'react';
import { 
  DollarSign, Receipt, Clock, TrendingUp,
  Truck, MapPin, Calendar, Download, Search,
  ArrowUpRight, ArrowDownRight, Filter, Eye,
  CreditCard, FileText, Percent, PieChart as PieChartIcon,
  ChevronRight, Plus, AlertCircle, CheckCircle,
  Clock as ClockIcon, Ban
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, LabelList,
  LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell
} from 'recharts';

// --- DATA MOCKUP ---

// KPI Data
const FINANCE_KPI = {
  totalInvoice: 2458000000,
  paidInvoice: 1875000000,
  outstandingInvoice: 583000000,
  cashFlow: 3240000000,
  avgPaymentDays: 18,
  profitMargin: 23.5
};

// Revenue per Route
const REVENUE_ROUTE_DATA = [
  { route: "Jakarta - Surabaya", revenue: 850000000, trips: 124, avgPerTrip: 6855000 },
  { route: "Jakarta - Bandung", revenue: 420000000, trips: 89, avgPerTrip: 4719000 },
  { route: "Surabaya - Bali", revenue: 380000000, trips: 62, avgPerTrip: 6129000 },
  { route: "Jakarta - Semarang", revenue: 320000000, trips: 58, avgPerTrip: 5517000 },
  { route: "Bandung - Surabaya", revenue: 290000000, trips: 45, avgPerTrip: 6444000 },
  { route: "Jakarta - Merak", revenue: 180000000, trips: 42, avgPerTrip: 4286000 },
];

// Revenue per Truck
const REVENUE_TRUCK_DATA = [
  { truck: "Hino PB 2016", revenue: 425000000, cost: 298000000, profit: 127000000, margin: 29.9 },
  { truck: "Fuso EO 0182", revenue: 398000000, cost: 281000000, profit: 117000000, margin: 29.4 },
  { truck: "Volvo FH16", revenue: 512000000, cost: 346000000, profit: 166000000, margin: 32.4 },
  { truck: "Isuzu Giga", revenue: 287000000, cost: 201000000, profit: 86000000, margin: 30.0 },
  { truck: "Hino AK 4605", revenue: 356000000, cost: 249000000, profit: 107000000, margin: 30.1 },
  { truck: "Mitsubishi Fuso", revenue: 298000000, cost: 212000000, profit: 86000000, margin: 28.9 },
];

// Monthly Revenue & Cost
const MONTHLY_PNL = [
  { month: 'Jan', revenue: 285000000, cost: 198000000, profit: 87000000 },
  { month: 'Feb', revenue: 312000000, cost: 215000000, profit: 97000000 },
  { month: 'Mar', revenue: 298000000, cost: 206000000, profit: 92000000 },
  { month: 'Apr', revenue: 335000000, cost: 228000000, profit: 107000000 },
  { month: 'May', revenue: 352000000, cost: 238000000, profit: 114000000 },
  { month: 'Jun', revenue: 378000000, cost: 252000000, profit: 126000000 },
  { month: 'Jul', revenue: 365000000, cost: 245000000, profit: 120000000 },
  { month: 'Aug', revenue: 392000000, cost: 259000000, profit: 133000000 },
];

// PNL per Truck (Table)
const PNL_TRUCK_TABLE = [
  { id: "TRK-001", truck: "Hino PB 2016", plate: "B 9012 UI", revenue: "425.0M", cost: "298.0M", profit: "127.0M", margin: "29.9%", trips: 42 },
  { id: "TRK-002", truck: "Fuso EO 0182", plate: "L 1122 AA", revenue: "398.0M", cost: "281.0M", profit: "117.0M", margin: "29.4%", trips: 38 },
  { id: "TRK-003", truck: "Volvo FH16", plate: "B 4432 KLP", revenue: "512.0M", cost: "346.0M", profit: "166.0M", margin: "32.4%", trips: 45 },
  { id: "TRK-004", truck: "Isuzu Giga", plate: "D 8890 XY", revenue: "287.0M", cost: "201.0M", profit: "86.0M", margin: "30.0%", trips: 28 },
  { id: "TRK-005", truck: "Hino AK 4605", plate: "B 5678 CD", revenue: "356.0M", cost: "249.0M", profit: "107.0M", margin: "30.1%", trips: 35 },
  { id: "TRK-006", truck: "Mitsubishi Fuso", plate: "B 9012 XY", revenue: "298.0M", cost: "212.0M", profit: "86.0M", margin: "28.9%", trips: 32 },
];

// Invoice Monitoring
const INVOICE_DATA = [
  { id: "INV-2026-001", customer: "PT. Global Logistik", amount: "125.5M", date: "2026-03-01", dueDate: "2026-03-15", status: "Paid", daysOverdue: 0 },
  { id: "INV-2026-002", customer: "Sinar Jaya Makmur", amount: "87.2M", date: "2026-02-28", dueDate: "2026-03-14", status: "Paid", daysOverdue: 0 },
  { id: "INV-2026-003", customer: "PT. Karya Logistik", amount: "42.5M", date: "2026-03-05", dueDate: "2026-03-19", status: "Pending", daysOverdue: 0 },
  { id: "INV-2026-004", customer: "CV. Cepat Express", amount: "28.3M", date: "2026-02-20", dueDate: "2026-03-06", status: "Overdue", daysOverdue: 10 },
  { id: "INV-2026-005", customer: "PT. Indah Kargo", amount: "56.8M", date: "2026-03-08", dueDate: "2026-03-22", status: "Pending", daysOverdue: 0 },
  { id: "INV-2026-006", customer: "PT. Mitra Transport", amount: "94.1M", date: "2026-02-25", dueDate: "2026-03-11", status: "Overdue", daysOverdue: 5 },
  { id: "INV-2026-007", customer: "CV. Bintang Logistik", amount: "33.7M", date: "2026-03-02", dueDate: "2026-03-16", status: "Pending", daysOverdue: 0 },
  { id: "INV-2026-008", customer: "PT. Sumber Rejeki", amount: "67.9M", date: "2026-03-04", dueDate: "2026-03-18", status: "Pending", daysOverdue: 0 },
];

// Customer Payment History
const CUSTOMER_PAYMENT = [
  { name: "PT. Global Logistik", paid: 8, pending: 1, overdue: 0, total: 9 },
  { name: "Sinar Jaya Makmur", paid: 6, pending: 2, overdue: 1, total: 9 },
  { name: "PT. Karya Logistik", paid: 4, pending: 1, overdue: 2, total: 7 },
  { name: "CV. Cepat Express", paid: 3, pending: 0, overdue: 3, total: 6 },
];

// Status Colors
const INVOICE_STATUS_STYLE = {
  'Paid': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Pending': 'bg-amber-50 text-amber-600 border-amber-200',
  'Overdue': 'bg-rose-50 text-rose-600 border-rose-200',
};

// --- COMPONENTS ---

const FinanceKPICard = ({ icon: Icon, title, value, subValue, trend, trendValue, accentColor, bgColor, formatter = 'currency' }) => {
  const formatValue = (val) => {
    if (formatter === 'currency') {
      if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1)}B`;
      if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}M`;
      return `Rp ${val.toLocaleString()}`;
    }
    return val;
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
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-slate-800">{formatValue(value)}</h3>
          {subValue && <span className="text-xs text-slate-400">/ {formatValue(subValue)}</span>}
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ percentage, color = 'bg-indigo-500', showLabel = false }) => (
  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
    <div className={`${color} h-full rounded-full`} style={{ width: `${percentage}%` }} />
  </div>
);

const formatCurrency = (value) => {
  if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)}M`;
  return `Rp ${value.toLocaleString()}`;
};

export default function FinanceDashboard() {
  // Colors for mini pie
  const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  // Data for invoice status pie
  const invoiceStatusData = [
    { name: 'Paid', value: 1875000000 },
    { name: 'Pending', value: 345000000 },
    { name: 'Overdue', value: 238000000 },
  ];

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

      {/* KPI Cards Row - Different composition: 4 main cards + 2 mini cards */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 mb-8">
        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-5">
          <FinanceKPICard 
            icon={Receipt} 
            title="Total Invoice" 
            value={2458000000}
            trend="up"
            trendValue="12.5%"
            accentColor="bg-indigo-500"
            bgColor="bg-indigo-500"
          />
          <FinanceKPICard 
            icon={CheckCircle} 
            title="Paid Invoice" 
            value={1875000000}
            subValue={2458000000}
            accentColor="bg-emerald-500"
            bgColor="bg-emerald-500"
          />
          <FinanceKPICard 
            icon={ClockIcon} 
            title="Outstanding" 
            value={583000000}
            trend="down"
            trendValue="8.2%"
            accentColor="bg-amber-500"
            bgColor="bg-amber-500"
          />
          <FinanceKPICard 
            icon={TrendingUp} 
            title="Cash Flow" 
            value={3240000000}
            trend="up"
            trendValue="15.3%"
            accentColor="bg-purple-500"
            bgColor="bg-purple-500"
          />
        </div>
        
        {/* Mini KPI Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-5">
          <div className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-xl border border-indigo-100">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Avg. Payment</p>
            <p className="text-xl font-black text-indigo-600 mt-1">{FINANCE_KPI.avgPaymentDays} days</p>
            <p className="text-[8px] text-indigo-400 mt-2">↓ 2 days from last month</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Profit Margin</p>
            <p className="text-xl font-black text-emerald-600 mt-1">{FINANCE_KPI.profitMargin}%</p>
            <p className="text-[8px] text-emerald-400 mt-2">↑ 1.2% from last month</p>
          </div>
        </div>
      </div>

      {/* First Row - Different composition: 7-5 split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Revenue per Route - Horizontal Bar (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-indigo-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Revenue per Route</h3>
          </div>
          
          <div className="space-y-5">
            {REVENUE_ROUTE_DATA.slice(0, 5).map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">{item.route}</span>
                  </div>
                  <span className="text-xs font-black text-indigo-600">{formatCurrency(item.revenue)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar 
                      percentage={(item.revenue / 850000000) * 100} 
                      color="bg-indigo-500"
                    />
                  </div>
                  <span className="text-[9px] text-slate-400 w-16">{item.trips} trips</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-5 pt-3 text-[10px] font-bold text-indigo-600 border-t border-slate-100 flex items-center justify-center gap-1 hover:text-indigo-700">
            View All Routes <ChevronRight size={12} />
          </button>
        </div>

        {/* Right Column - Invoice Status & Payment Trends (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Invoice Status - Pie Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Invoice Status</h3>
            <div className="flex items-center">
              <div className="w-1/2 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-2">
                {invoiceStatusData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }} />
                      {item.name}
                    </span>
                    <span className="font-black">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Profit Trend - Mini Line Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Profit Trend</h3>
              <span className="text-[9px] font-bold text-emerald-600">↑ 8.3% vs last month</span>
            </div>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_PNL.slice(-6)} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="profit" fill="#10b981" fillOpacity={0.1} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Revenue per Truck & Customer Payment (different composition) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Revenue per Truck - Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 bg-emerald-500 rounded-full" />
            <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Revenue per Truck</h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_TRUCK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="truck" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8'}} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8'}} tickFormatter={(value) => `${value/1000000}M`} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20}>
                  <LabelList dataKey="revenue" position="top" formatter={(v) => `${(v/1000000).toFixed(0)}M`} style={{fontSize: 8, fill: '#475569'}} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Payment Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Customer Payment Summary</h3>
          <div className="space-y-4">
            {CUSTOMER_PAYMENT.map((customer, idx) => (
              <div key={idx} className="border-b border-slate-50 pb-3 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700">{customer.name}</span>
                  <span className="text-[9px] font-black">{customer.total} invoices</span>
                </div>
                <div className="flex h-2 gap-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(customer.paid / customer.total) * 100}%` }} />
                  <div className="bg-amber-500 h-full" style={{ width: `${(customer.pending / customer.total) * 100}%` }} />
                  <div className="bg-rose-500 h-full" style={{ width: `${(customer.overdue / customer.total) * 100}%` }} />
                </div>
                <div className="flex gap-3 mt-1 text-[8px]">
                  <span className="text-emerald-600">Paid: {customer.paid}</span>
                  <span className="text-amber-600">Pending: {customer.pending}</span>
                  <span className="text-rose-600">Overdue: {customer.overdue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row - PNL per Truck Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
            <Percent size={16} className="text-emerald-500" />
            PNL per Truck
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search truck..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 w-60" 
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
                <th className="px-4 py-4 text-left">Truck</th>
                <th className="px-4 py-4 text-left">Plate</th>
                <th className="px-4 py-4 text-right">Revenue</th>
                <th className="px-4 py-4 text-right">Cost</th>
                <th className="px-4 py-4 text-right">Profit</th>
                <th className="px-4 py-4 text-right">Margin</th>
                <th className="px-4 py-4 text-right">Trips</th>
                <th className="px-4 py-4 text-center">ROI</th>
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
                  <td className="px-4 py-3 text-right">
                    <span className="font-black text-slate-700">{truck.margin}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500">{truck.trips}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: truck.margin }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fourth Row - Invoice Monitoring Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} className="text-indigo-500" />
            Invoice Monitoring
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-indigo-50 hover:border-indigo-200 transition-all">
              All Invoices
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
                <th className="px-4 py-4 text-left">Invoice #</th>
                <th className="px-4 py-4 text-left">Customer</th>
                <th className="px-4 py-4 text-right">Amount</th>
                <th className="px-4 py-4 text-left">Issue Date</th>
                <th className="px-4 py-4 text-left">Due Date</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-right">Days Left</th>
                <th className="px-4 py-4 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {INVOICE_DATA.map((inv, i) => (
                <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">{inv.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{inv.customer}</td>
                  <td className="px-4 py-3 text-right font-black text-slate-800">{inv.amount}</td>
                  <td className="px-4 py-3 text-slate-500">{inv.date}</td>
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
                  <td className="px-4 py-3 text-right">
                    {inv.status === 'Overdue' ? (
                      <span className="text-rose-600 font-black">{inv.daysOverdue} days overdue</span>
                    ) : inv.status === 'Paid' ? (
                      <span className="text-emerald-600">Paid</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
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
          <span className="text-slate-500">Showing 1-8 of 24 invoices</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">Previous</button>
            <button className="px-3 py-1 bg-indigo-500 text-white rounded">1</button>
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">2</button>
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">3</button>
            <button className="px-3 py-1 bg-white rounded border border-slate-200 hover:bg-indigo-500 hover:text-white transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center gap-2">
          <Plus size={14} />
          New Invoice
        </button>
        <button className="px-4 py-2 bg-emerald-500 rounded-lg text-xs font-bold text-white hover:bg-emerald-600 transition-all flex items-center gap-2">
          Export PNL Report
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}