import React, { useEffect, useMemo, useState } from 'react';
import { Faculty, Department } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { ChevronRight, Home, Search } from 'lucide-react';

interface PublicFacultyListProps {
  onSelectFaculty: (slug: string) => void;
}

export const PublicFacultyList: React.FC<PublicFacultyListProps> = ({ onSelectFaculty }) => {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('cse');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const [faculty, departmentList] = await Promise.all([
          api.get<Faculty[]>('/api/public/faculty'),
          api.get<Department[]>('/api/public/departments')
        ]);
        setFacultyList(faculty);
        setDepartments(departmentList.filter(department =>
          ['cse', 'ece', 'ash'].includes(department.slug.toLowerCase())
        ));
      } catch (error) {
        console.error('Error fetching public faculty data', error);
        setLoadError(error instanceof Error ? error.message : 'Unable to load faculty data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredFaculty = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return facultyList.filter(faculty => {
      if (faculty.department_slug !== selectedDept) return false;
      if (!normalizedSearch) return true;

      return [
        faculty.full_name,
        faculty.designation,
        faculty.specialization,
        faculty.research_interests,
        faculty.areas_of_expertise,
        faculty.research_keywords
      ].some(value => value?.toLocaleLowerCase().includes(normalizedSearch));
    });
  }, [facultyList, search, selectedDept]);

  const selectedDepartment = departments.find(department => department.slug === selectedDept);

  return (
    <div className="min-h-[70vh] bg-[#e8eef6]">
      <section className="bg-gradient-to-r from-[#17345f] via-[#1d416f] to-[#1c3d69] text-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Faculty Members</h1>
          <p className="mt-2 text-sm text-blue-100 sm:text-base">Meet the distinguished faculty of IIIT Pune</p>
          <nav aria-label="Breadcrumb" className="mt-5 flex items-center gap-2 text-sm text-blue-100">
            <a href="https://iiitp.ac.in" className="inline-flex items-center gap-1 hover:text-white">
              <Home className="h-4 w-4" />
              Home
            </a>
            <ChevronRight className="h-3.5 w-3.5 text-blue-200/70" />
            <a href="https://iiitp.ac.in/people" className="hover:text-white">People</a>
            <ChevronRight className="h-3.5 w-3.5 text-blue-200/70" />
            <span className="font-semibold text-white">Faculty</span>
          </nav>
        </div>
      </section>

      <section className="min-h-[480px] bg-[radial-gradient(#cbd5e1_0.8px,transparent_0.8px)] [background-size:24px_24px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/70 bg-white px-5 py-6 shadow-[0_12px_45px_rgba(30,58,95,0.08)] sm:px-10 sm:py-9">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex h-11 w-full max-w-[320px] items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 text-slate-400 shadow-inner focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search faculty..."
                aria-label="Search faculty"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="inline-flex w-fit rounded-full bg-slate-100 p-1.5" role="tablist" aria-label="Faculty departments">
              {departments.map(department => {
                const isSelected = selectedDept === department.slug;
                return (
                  <button
                    key={department.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedDept(department.slug)}
                    className={`min-w-[68px] rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      isSelected
                        ? 'bg-[#d92732] text-white shadow-md shadow-red-900/15'
                        : 'text-slate-600 hover:bg-white hover:text-[#19395f]'
                    }`}
                  >
                    {department.short_name}
                  </button>
                );
              })}
            </div>
          </div>

          {loadError ? (
            <div role="alert" className="my-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
              <strong>Faculty directory could not be loaded.</strong>
              <p className="mt-1">{loadError}</p>
            </div>
          ) : loading ? (
            <div className="py-16 text-center text-sm text-slate-500" role="status">
              Loading faculty members…
            </div>
          ) : (
            <section className="pt-7">
              <div className="mb-7 flex items-end justify-between gap-3">
                <h2 className="font-serif text-2xl font-bold tracking-tight text-[#19395f] sm:text-3xl">
                  {selectedDepartment?.name || 'Faculty'}
                </h2>
                {search && (
                  <span className="shrink-0 pb-1 text-xs text-slate-500">
                    {filteredFaculty.length} {filteredFaculty.length === 1 ? 'result' : 'results'}
                  </span>
                )}
              </div>

              {filteredFaculty.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-12 text-center text-sm text-slate-600">
                  No faculty members match this search.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredFaculty.map(faculty => {
                    const expertise = faculty.specialization || faculty.areas_of_expertise || faculty.research_interests;
                    return (
                      <button
                        key={faculty.id}
                        type="button"
                        onClick={() => onSelectFaculty(faculty.profile_slug)}
                        className="group flex min-h-40 items-center gap-5 rounded-2xl bg-[#f0f6ff] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:bg-[#e8f1ff] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#dbe6f4] ring-4 ring-white shadow-sm sm:h-28 sm:w-28">
                          <span className="flex h-full w-full items-center justify-center font-serif text-2xl font-bold text-[#19395f]" aria-hidden="true">
                            {faculty.full_name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')}
                          </span>
                          {faculty.profile_photo && (
                            <img
                              src={faculty.profile_photo}
                              alt={faculty.full_name}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover"
                              onError={event => {
                                event.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg font-bold leading-snug text-[#19395f] group-hover:text-[#d92732]">
                            {faculty.full_name}
                          </h3>
                          <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                            {faculty.designation}
                          </p>
                          {expertise && (
                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                              <span className="font-semibold text-slate-700">Expertise:</span> {expertise}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </div>
  );
};
