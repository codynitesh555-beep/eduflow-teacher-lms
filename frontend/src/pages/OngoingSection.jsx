import React, { useState, useEffect } from 'react';
import { getStudents, markAttendance } from '../services/attendanceService';
import { Play, UserCheck, CheckCircle, ArrowLeft, Users, Clock, MapPin } from 'lucide-react';

const OngoingSection = () => {
  const [activeClass, setActiveClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const classData = [
    { name: 'Mathematics', grade: 'Grade 10A', time: '10:00 – 11:30 AM', room: 'Room 204', count: 10, color: 'orange', progress: 45 },
    { name: 'Physics', grade: 'Grade 11B', time: '11:45 AM – 1:15 PM', room: 'Lab 3', count: 10, color: 'indigo', progress: 20 }
  ];

  useEffect(() => {
    if (activeClass) {
      getStudents().then(data => {
        setStudents(data);
        const initial = {};
        data.forEach(s => initial[s.id] = true);
        setAttendanceMap(initial);
      });
    }
  }, [activeClass]);

  const submitAttendance = async () => {
    setSubmitting(true);
    const payload = students.map(s => ({
      student_id: s.id, teacher_id: 1, class_name: activeClass.name, is_present: attendanceMap[s.id]
    }));
    try {
      await markAttendance(payload);
      alert("Attendance synced!");
      setActiveClass(null);
    } finally { setSubmitting(false); }
  };

  if (activeClass) {
    return (
      <div className="p-8 space-y-6">
        <button onClick={() => setActiveClass(null)} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-medium">
          <ArrowLeft size={18} /> Back to Overview
        </button>
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div><h2 className="text-2xl font-black text-slate-800">{activeClass.name}</h2><p className="text-slate-500">Live Attendance Tracking</p></div>
            <button onClick={submitAttendance} disabled={submitting} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2">
              <CheckCircle size={20} /> {submitting ? 'Syncing...' : 'Sync to Database'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
            {students.map(s => (
              <div key={s.id} onClick={() => setAttendanceMap(p => ({...p, [s.id]: !p[s.id]}))} className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${attendanceMap[s.id] ? 'border-emerald-500 bg-white' : 'border-slate-100 bg-slate-50 opacity-50'}`}>
                <div className="flex justify-between items-center">
                  <div><p className="font-black text-slate-700">{s.name}</p><p className="text-[10px] text-slate-400">ID: #{s.id}</p></div>
                  {attendanceMap[s.id] ? <UserCheck className="text-emerald-600" size={18} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-4xl font-black text-slate-800 tracking-tight">Ongoing Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {classData.map((item) => (
          <div key={item.name} className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div><h2 className="text-3xl font-black text-slate-800">{item.name}</h2><p className="text-indigo-500 font-bold uppercase text-xs">{item.grade}</p></div>
                <span className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>Live Now</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-500"><Clock size={18}/><span>{item.time}</span></div>
                <div className="flex items-center gap-3 text-slate-500"><MapPin size={18}/><span>{item.room}</span></div>
                <div className="flex items-center gap-3 text-slate-500"><Users size={18}/><span>{item.count} students</span></div>
              </div>
              <div className="mb-8 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${item.progress}%` }}></div></div>
              <button onClick={() => setActiveClass(item)} className="w-full bg-orange-500 text-white py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl shadow-orange-100"><Play size={20} fill="currentColor" /> Start Class</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingSection;