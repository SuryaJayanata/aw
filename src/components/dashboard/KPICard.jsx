import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const KPICard = ({ title, value, icon: Icon, percentage, isPositive, accentColor }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`}></div>
    <div className="flex justify-between items-start mb-4 text-left">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-slate-600 transition-colors">
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {percentage}
      </div>
    </div>
    <div className="text-left">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
    </div>
  </div>
);