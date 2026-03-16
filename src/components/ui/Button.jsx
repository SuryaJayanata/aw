export const ActionButton = ({ icon: Icon, label, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200',
    outline: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm',
    ghost: 'text-slate-500 hover:text-indigo-600 transition-colors'
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {label && <span className="uppercase tracking-tight">{label}</span>}
    </button>
  );
};