import { Download } from 'lucide-react';
import { ActionButton } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';

export const DataTable = ({ title, columns, data, onSearch, onExport }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider text-left">{title}</h3>
      <div className="flex items-center gap-2">
        <SearchInput placeholder={`Search ${title}...`} onChange={onSearch} />
        <ActionButton 
          icon={Download} 
          label="Export Table" 
          variant="outline" 
          onClick={onExport}
          className="!py-1.5 !px-3 !text-[10px]" 
        />
      </div>
    </div>
    <div className="overflow-x-auto text-left">
      <table className="w-full border-collapse">
        <thead className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-slate-50">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-50 transition-colors group">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);