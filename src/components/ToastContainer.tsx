import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-[#E1E7EF] rounded-xl p-3.5 shadow-lg flex items-start space-x-3 animate-slideUp transition-all"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#35A879] flex-shrink-0 mt-0.5" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-[#E3A33B] flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-[#1678A8] flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-[#172033]">{toast.title}</h5>
              {toast.description && (
                <p className="text-[11px] text-[#667085] mt-0.5">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#98A2B3] hover:text-[#172033] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
