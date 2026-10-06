import { useRef, useCallback } from 'react';

export function useRipple() {
  const ref = useRef(null);
  const trigger = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const d = Math.max(el.clientWidth, el.clientHeight) * 2;
    const s = document.createElement("span");
    s.className = "absolute rounded-full bg-white/30 animate-[ripple_0.6s_linear]";
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px;pointer-events:none;`;
    el.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }, []);
  return [ref, trigger];
}
