import React from 'react';
import { Faculty } from '../types/index.ts';

interface DiffViewerProps {
  oldData: Faculty | null;
  newData: Faculty | null;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ oldData, newData }) => {
  if (!oldData && !newData) {
    return <p className="text-sm text-slate-500">No snapshot comparison available.</p>;
  }

  // Key fields to compare
  const fieldsToCompare: Array<{ key: keyof Faculty; label: string }> = [
    { key: 'full_name', label: 'Full Name' },
    { key: 'title', label: 'Title' },
    { key: 'designation', label: 'Designation' },
    { key: 'department_name', label: 'Department' },
    { key: 'faculty_type', label: 'Faculty Type' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'office_location', label: 'Office Location' },
    { key: 'office_room', label: 'Office Room' },
    { key: 'highest_qualification', label: 'Highest Qualification' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'research_interests', label: 'Research Interests' },
    { key: 'biography', label: 'Biography' },
    { key: 'academic_experience', label: 'Academic Experience' },
    { key: 'industry_experience', label: 'Industry Experience' },
    { key: 'google_scholar_url', label: 'Google Scholar URL' },
    { key: 'orcid_url', label: 'ORCID URL' },
    { key: 'linkedin_url', label: 'LinkedIn URL' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <div>Original / Approved Profile</div>
        <div>Updated / Submitted Changes</div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {fieldsToCompare.map(({ key, label }) => {
          const oldVal = oldData ? String(oldData[key] || '') : '';
          const newVal = newData ? String(newData[key] || '') : '';
          const isChanged = oldVal !== newVal;

          return (
            <div
              key={key as string}
              className={`p-3 rounded-lg border text-xs sm:text-sm ${
                isChanged
                  ? 'border-amber-300 bg-amber-50/50'
                  : 'border-slate-100 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-medium text-slate-700">
                <span>{label}</span>
                {isChanged && (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Modified
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className={`p-2 rounded bg-white border ${isChanged ? 'border-rose-200 text-rose-800 line-through' : 'border-slate-200 text-slate-600'}`}>
                  {oldVal || <span className="italic text-slate-400">Empty</span>}
                </div>
                <div className={`p-2 rounded bg-white border ${isChanged ? 'border-emerald-300 text-emerald-900 font-medium bg-emerald-50/40' : 'border-slate-200 text-slate-600'}`}>
                  {newVal || <span className="italic text-slate-400">Empty</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publications / Patents Summary comparison */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 text-xs text-slate-600">
        <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
          <p className="font-semibold text-slate-700">Previous Collections:</p>
          <p>Publications: {oldData?.publications?.length || 0}</p>
          <p>Patents: {oldData?.patents?.length || 0}</p>
          <p>Education records: {oldData?.education?.length || 0}</p>
          <p>Experience records: {oldData?.experience?.length || 0}</p>
        </div>
        <div className="bg-emerald-50/60 p-2.5 rounded border border-emerald-200">
          <p className="font-semibold text-emerald-900">New Collections:</p>
          <p>Publications: {newData?.publications?.length || 0}</p>
          <p>Patents: {newData?.patents?.length || 0}</p>
          <p>Education records: {newData?.education?.length || 0}</p>
          <p>Experience records: {newData?.experience?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};
