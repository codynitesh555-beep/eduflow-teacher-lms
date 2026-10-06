import React, { useState, useEffect } from 'react';
import {
  Calendar,
  UserCheck,
  UserX,
  Search,
  ShieldCheck,
} from 'lucide-react';

import { AttDonut } from '../components/cards/AttDonut';
import {
  getAttendance,
  getAttendanceSummary,
} from '../services/attendanceService';

const AttendanceSection = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [summary, setSummary] = useState({
    total_records: 0,
    present_pct: 0,
  });

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // apiRequest() already converts the response to JSON,
        // so we don't need .json() here.
        const [attData, summaryData] = await Promise.all([
          getAttendance(),
          getAttendanceSummary(),
        ]);

        setAttendanceRecords(attData);

        setSummary({
          total_records: summaryData.total_attendance_records,
          present_pct: summaryData.overall_attendance_pct,
        });
      } catch (error) {
        console.error('Failed to load attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRecords = attendanceRecords.filter((record) => {
    const search = searchTerm.toLowerCase();

    return (
      record.student_name?.toLowerCase().includes(search) ||
      record.class_name?.toLowerCase().includes(search) ||
      record.student_id?.toString().includes(search)
    );
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck
              className="text-indigo-600"
              size={24}
            />

            <h1 className="text-2xl font-bold text-slate-800">
              Attendance Management
            </h1>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">

          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Attendance Rate
            </p>

            <p className="text-2xl font-black text-indigo-600">
              {summary.present_pct}%
            </p>
          </div>

          <div className="w-14 h-14">
            <AttDonut />
          </div>

        </div>

      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Search */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">

          <div className="relative">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4"
            />

            <input
              type="text"
              placeholder="Filter students, IDs, or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none w-64"
            />

          </div>

          <span className="text-xs font-medium text-slate-400">
            Total Records: {summary.total_records}
          </span>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">

              <tr>
                <th className="px-6 py-4">
                  Student ID
                </th>

                <th className="px-6 py-4">
                  Student Name
                </th>

                <th className="px-6 py-4">
                  Subject / Class
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Status
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">

              {loading ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-20 animate-pulse text-slate-400"
                  >
                    Loading data...
                  </td>
                </tr>

              ) : filteredRecords.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-20 text-slate-400"
                  >
                    No attendance records found.
                  </td>
                </tr>

              ) : (

                filteredRecords.map((record) => (

                  <tr
                    key={record.id}
                    className="hover:bg-indigo-50/30 transition-colors cursor-default"
                  >

                    <td className="px-6 py-4 font-bold text-slate-700">
                      #STU-{record.student_id}
                    </td>

                    <td className="px-6 py-4 text-slate-900 font-semibold">
                      {record.student_name}
                    </td>

                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {record.class_name}
                    </td>

                    <td className="px-6 py-4 text-slate-500">

                      <div className="flex items-center gap-2">

                        <Calendar
                          size={13}
                          className="text-slate-400"
                        />

                        {new Date(record.date).toLocaleDateString(
                          undefined,
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      {record.is_present ? (

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-black uppercase tracking-tighter">

                          <UserCheck size={12} />

                          Present

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-100 text-rose-700 rounded-md text-[10px] font-black uppercase tracking-tighter">

                          <UserX size={12} />

                          Absent

                        </span>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AttendanceSection;