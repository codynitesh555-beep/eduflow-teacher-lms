import { forwardRef, useCallback } from 'react';
import { useRipple } from '../../hooks/useRipple';

export const RippleBtn = forwardRef(({ children, className = '', onClick, disabled, variant = 'primary', ...props }, ref) => {
  const [internalRef, trigger] = useRipple();
  
  // Base classes for the button
  const baseClasses = "relative overflow-hidden transition-all duration-300 font-semibold flex items-center justify-center gap-2 group outline-none active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100";
  
  // Size and shape classes
  const sizeClasses = "px-6 py-3 rounded-xl sm:px-8 sm:py-3.5 sm:rounded-2xl";
  
  // Theme variants mapped to Tailwind
  const variants = {
    primary: "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500",
    secondary: "bg-white text-slate-800 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md hover:text-orange-600",
    danger: "bg-red-500 text-white shadow-md shadow-red-500/20 hover:bg-red-600 hover:shadow-red-500/40",
  };

  const handleRipple = useCallback((e) => {
    if (!disabled) {
      trigger(e);
      if (onClick) onClick(e);
    }
  }, [disabled, trigger, onClick]);

  // Combine refs
  const buttonRef = (node) => {
    internalRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${sizeClasses} ${variants[variant]} ${className}`}
      onClick={handleRipple}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

RippleBtn.displayName = 'RippleBtn';
