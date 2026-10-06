import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rescheduleClass } from '../store/slices/classesSlice';
import { addNotification, addToast, setRescheduleTarget } from '../store/slices/uiSlice';
import { RippleBtn } from './ui/RippleBtn';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function RescheduleModal({ cls }) {
  const dispatch = useDispatch();
  const today = new Date();
  
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selDate, setSelDate] = useState(null);
  const [hour, setHour] = useState("09");
  const [min, setMin] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [step, setStep] = useState(1);

  const yr = viewDate.getFullYear(), mo = viewDate.getMonth();
  const daysInMo = new Date(yr, mo + 1, 0).getDate();
  const firstDay = new Date(yr, mo, 1).getDay();

  const isPast = (d) => new Date(yr, mo, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isToday = (d) => today.getDate() === d && today.getMonth() === mo && today.getFullYear() === yr;
  const isSel = (d) => selDate && selDate.getDate() === d && selDate.getMonth() === mo && selDate.getFullYear() === yr;

  const grid = [];
  for (let i = 0; i < firstDay; i++) grid.push(null);
  for (let d = 1; d <= daysInMo; d++) grid.push(d);
  while (grid.length % 7 !== 0) grid.push(null);

  const handleConfirm = () => {
    if (!selDate) return;
    const yy = selDate.getFullYear();
    const mm = String(selDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selDate.getDate()).padStart(2, "0");
    let h = parseInt(hour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    const timeStr = `${String(h).padStart(2, "0")}:${min}`;
    
    const d = new Date(`${yy}-${mm}-${dd}`);
    const fmt = d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
    const hr12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const p = h >= 12 ? 'PM' : 'AM';
    const timeFmt = `${hr12}:${min} ${p}`;

    const newDateRaw = `${yy}-${mm}-${dd}`;
    
    dispatch(rescheduleClass({ id: cls.id, date: fmt, rawDate: newDateRaw, time: timeStr }));
    dispatch(addNotification({ text: `${cls.name} ${cls.grade} rescheduled to ${fmt} at ${timeFmt}`, type: "success", time: "Just now" }));
    dispatch(addToast({ msg: `✓ ${cls.name} rescheduled to ${fmt} at ${timeFmt}`, type: 'success' }));
    dispatch(setRescheduleTarget(null));
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 opacity-100 transition-opacity duration-300" onClick={() => dispatch(setRescheduleTarget(null))}>
      <div 
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-full animate-[slideUp_0.4s_out_back]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-50 px-6 sm:px-8 py-6 border-b border-slate-100 flex justify-between items-start relative">
          <div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 text-2xl flex items-center justify-center mb-4">{cls.icon}</div>
            <div className="font-bold text-slate-500 mb-1">{cls.name} — {cls.grade}</div>
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Reschedule Class</h3>
          </div>
          <button 
            className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors shrink-0 outline-none"
            onClick={() => dispatch(setRescheduleTarget(null))}
          >
            ✕
          </button>
        </div>

        <div className="bg-white px-6 sm:px-8 py-4 border-b border-slate-100 flex items-center gap-2 sm:gap-4 overflow-x-auto">
          {["Choose Date", "Set Time", "Confirm"].map((s, i) => {
            const isDone = step > i + 1;
            const isActive = step === i + 1;
            return (
              <div 
                key={i} 
                className={`flex items-center gap-3 font-bold text-sm tracking-wide shrink-0 transition-all cursor-pointer ${isActive ? 'text-orange-600' : isDone ? 'text-slate-700' : 'text-slate-300'} ${(i === 0 || (i === 1 && selDate) || (i === 2 && selDate)) ? 'pointer-events-auto' : 'pointer-events-none'}`}
                onClick={() => { if (i === 0 || (i === 1 && selDate) || (i === 2 && selDate)) setStep(i + 1); }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-orange-600 bg-orange-50 text-orange-600' : isDone ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
                  {isDone ? "✓" : i + 1}
                </div>
                <span>{s}</span>
              </div>
            );
          })}
        </div>

        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="animate-[slideUp_0.4s_ease-out]">
              <div className="flex justify-between items-center mb-6">
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold" onClick={() => setViewDate(new Date(yr, mo - 1, 1))}>‹</button>
                <span className="font-extrabold text-lg text-slate-800">{MONTHS[mo]} {yr}</span>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold" onClick={() => setViewDate(new Date(yr, mo + 1, 1))}>›</button>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
                {DAYS.map(d => <span key={d}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {grid.map((d, i) => {
                  const past = d && isPast(d);
                  const todayFlag = d && isToday(d);
                  const selected = d && isSel(d);
                  if (!d) return <button key={i} className="aspect-square bg-transparent border border-dashed border-slate-100 rounded-xl" disabled />;
                  return (
                    <button 
                      key={i}
                      className={`aspect-square rounded-xl font-bold text-sm transition-all relative ${past ? 'text-slate-300 bg-slate-50 cursor-not-allowed' : selected ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 -translate-y-1' : todayFlag ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-white border border-slate-200 text-slate-700 hover:border-orange-400 hover:text-orange-600'}`}
                      disabled={past}
                      onClick={() => !past && (setSelDate(new Date(yr, mo, d)), setStep(2))}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-[slideUp_0.4s_ease-out]">
              <div className="text-5xl font-black text-center mb-10 text-slate-800 tracking-tight">{hour}:{min} <span className="text-orange-500">{period}</span></div>
              <div className="flex justify-center gap-6 sm:gap-12 text-center">
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hour</div>
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto px-2">
                    {hours.map(h => <button key={h} className={`py-3 rounded-xl font-bold transition-all ${hour === h ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} onClick={() => setHour(h)}>{h}</button>)}
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-300 mt-12">:</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Minute</div>
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto px-2">
                    {minutes.map(m => <button key={m} className={`py-3 rounded-xl font-bold transition-all ${min === m ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} onClick={() => setMin(m)}>{m}</button>)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Period</div>
                  <div className="flex flex-col gap-2 relative h-full">
                    {["AM", "PM"].map(p => <button key={p} className={`py-4 rounded-xl font-bold transition-all flex-1 ${period === p ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} onClick={() => setPeriod(p)}>{p}</button>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && selDate && (
            <div className="animate-[slideUp_0.4s_ease-out]">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply opacity-50 blur-xl"></div>
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl shadow-sm text-3xl flex items-center justify-center shrink-0">📅</div>
                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Class</div>
                    <div className="font-bold text-slate-800">{cls.name} — {cls.grade}</div>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">New Date</div>
                    <div className="font-bold text-slate-800">{selDate.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">New Time</div>
                    <div className="font-bold text-slate-800">{hour}:{min} {period}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 text-sm font-semibold">
                <span className="text-lg">⚠</span>
                <p>This will mark the original session as rescheduled and notify all students.</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <button 
            className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition-colors"
            onClick={() => step > 1 ? setStep(step - 1) : dispatch(setRescheduleTarget(null))}
          >
            {step === 1 ? "Cancel" : "← Back"}
          </button>
          
          {step < 3 ? (
            <RippleBtn onClick={() => { if (step === 1 && selDate) setStep(2); if (step === 2) setStep(3); }} disabled={step === 1 && !selDate}>
              Next Step →
            </RippleBtn>
          ) : (
            <RippleBtn onClick={handleConfirm} variant="primary" className="!bg-gradient-to-r !from-emerald-500 !to-emerald-600 shadow-emerald-500/30 hover:shadow-emerald-500/50">
              ✓ Confirm Reschedule
            </RippleBtn>
          )}
        </div>
      </div>
    </div>
  );
}
