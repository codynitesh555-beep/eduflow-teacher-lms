import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/slices/uiSlice';
import { useEffect } from 'react';

export function ToastStack() {
  const toasts = useSelector(state => state.ui.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    toasts.forEach(t => {
      setTimeout(() => {
        dispatch(removeToast(t.id));
      }, 4500);
    });
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {toasts.map(t => (
        <div 
          key={t.id} 
          className={`px-5 py-3.5 rounded-xl shadow-lg font-medium text-[15px] flex items-center gap-2.5 max-w-sm pointer-events-auto transform transition-all duration-300 animate-[slideUp_0.4s_ease-out]
            ${t.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-800 text-white shadow-slate-800/30'}
          `}
        >
          {t.type === 'error' ? '⚠' : '✓'}
          {t.msg}
        </div>
      ))}
    </div>
  );
}
