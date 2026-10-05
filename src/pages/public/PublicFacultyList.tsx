import React, { useState, useEffect } from 'react';
import { Faculty, Department } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { Search, Building, Mail, MapPin, ExternalLink, Filter, BookOpen } from 'lucide-react';

interface PublicFacultyListProps {
  onSelectFaculty: (slug: string) => void;
}

export const PublicFacultyList: React.FC<PublicFacultyListProps> = ({ onSelectFaculty }) => {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  const designations = [
    'Professor & Dean (Academic)',
    'Professor',
    'Associate Professor & HoD ECE',
    'Associate Professor',
    'Assistant Professor (Grade I)',
    'Assistant Professor'
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedDept) params.append('department', selectedDept);
      if (selectedDesignation) params.append('designation', selectedDesignation);

      const [facData, deptData] = await Promise.all([
        api.get<Faculty[]>(`/api/public/faculty?${params.toString()}`),
        api.get<Department[]>('/api/public/departments')
      ]);

      setFacultyList(facData);
      setDepartments(deptData);
    } catch (err) {
      console.error('Error fetching public faculty data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDept, selectedDesignation]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0F2042] via-[#1E3A8A] to-[#1E40AF] text-white p-8 sm:p-12 shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/30">
            <span>IIIT Pune • Academic Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Distinguished Faculty & Scholars
          </h1>
          <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
            Discover the faculty members driving research, innovation, and technological leadership at the
            Indian Institute of Information Technology Pune.
          </p>

          {/* Quick Department Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setSelectedDept('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedDept === ''
                  ? 'bg-amber-400 text-slate-900 shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              All Departments ({facultyList.length})
            </button>
            {departments.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDept(d.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDept === d.slug
                    ? 'bg-amber-400 text-slate-900 shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {d.short_name} ({d.faculty_count || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty by name, specialization, research keywords, or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-slate-700"
            >
              <option value="">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.slug}>{d.name} ({d.short_name})</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-slate-700"
            >
              <option value="">All Designations</option>
              {designations.map(des => (
                <option key={des} value={des}>{des}</option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Faculty Cards Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
          <p className="text-slate-500 text-sm">Loading IIIT Pune faculty directory...</p>
        </div>
      ) : facultyList.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-slate-200 p-8">
          <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No faculty members found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            No published faculty profiles match the selected department, designation, or search criteria.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedDept(''); setSelectedDesignation(''); }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyList.map((fac) => {
            const keywords = fac.research_keywords
              ? fac.research_keywords.split(',').map(k => k.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={fac.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header with Photo */}
                  <div className="p-5 flex items-start gap-4">
                    <img
                      src={fac.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={fac.full_name}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-slate-100 shadow-xs shrink-0 group-hover:scale-102 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                        {fac.department_short_name}
                      </span>
                      <h3
                        onClick={() => onSelectFaculty(fac.profile_slug)}
                        className="text-base font-bold text-slate-900 truncate hover:text-blue-700 cursor-pointer"
                        title={fac.full_name}
                      >
                        {fac.full_name}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 leading-tight">
                        {fac.designation}
                      </p>
                      {fac.highest_qualification && (
                        <p className="text-[11px] text-slate-500 italic truncate">
                          {fac.highest_qualification}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Specialization & Research Interests */}
                  <div className="px-5 pb-3 space-y-2">
                    {fac.specialization && (
                      <p className="text-xs text-slate-600 line-clamp-2">
                        <span className="font-semibold text-slate-800">Specialization:</span> {fac.specialization}
                      </p>
                    )}

                    {/* Keywords pills */}
                    {keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {keywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                          >
                            {kw}
                          </span>
                        ))}
                        {keywords.length > 3 && (
                          <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                            +{keywords.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Contact and Button */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="space-y-0.5 text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate max-w-[150px]">{fac.email}</span>
                    </div>
                    {fac.office_location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate max-w-[150px]">{fac.office_location} {fac.office_room ? `(${fac.office_room})` : ''}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectFaculty(fac.profile_slug)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
