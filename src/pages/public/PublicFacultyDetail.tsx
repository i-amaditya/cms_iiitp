import React, { useState, useEffect } from 'react';
import { Faculty } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  BookOpen,
  Award,
  Briefcase,
  GraduationCap,
  FileText,
  Share2,
  Clock
} from 'lucide-react';

interface PublicFacultyDetailProps {
  slug: string;
  onBack: () => void;
}

export const PublicFacultyDetail: React.FC<PublicFacultyDetailProps> = ({ slug, onBack }) => {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'education' | 'experience' | 'publications' | 'patents'>('overview');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const data = await api.get<Faculty>(`/api/public/faculty/${slug}`);
        setFaculty(data);
      } catch (err: any) {
        console.warn('Faculty detail not publicly visible or not found:', err?.message || err);
        setFaculty(null);
        setErrorMessage(err?.message || 'Faculty profile not found or is currently not publicly visible');
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchProfile();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
        <p className="text-slate-500 text-sm">Loading faculty profile...</p>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="py-16 text-center bg-white rounded-xl border border-slate-200 p-8 max-w-xl mx-auto shadow-sm">
        <h3 className="text-lg font-bold text-slate-800">Faculty Profile Not Found</h3>
        <p className="text-sm text-slate-500 mt-2">
          {errorMessage || 'The requested faculty profile could not be found or has not yet been published by the administration.'}
        </p>
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold hover:bg-blue-800 transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Faculty Directory
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Preview Notice for unapproved states */}
      {faculty.status && faculty.status !== 'PUBLISHED' && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Preview Mode ({faculty.status.replace('_', ' ')}):</strong> This profile is currently undergoing review and visible via administrative or faculty preview privileges.
            </span>
          </div>
          <span className="font-mono text-[10px] bg-amber-200/80 px-2 py-0.5 rounded font-bold uppercase">
            {faculty.status}
          </span>
        </div>
      )}

      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Faculty Directory
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Employee Code:</span>
          <span className="font-mono font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
            {faculty.employee_id}
          </span>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-32 bg-gradient-to-r from-[#0F2042] via-[#1E3A8A] to-[#2563EB] relative" />
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 mb-4">
            <img
              src={faculty.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={faculty.full_name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <div className="space-y-1 text-center sm:text-left min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                <span>{faculty.department_name}</span>
                <span>•</span>
                <span>{faculty.faculty_type}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {faculty.full_name}
              </h1>
              <p className="text-sm font-semibold text-blue-700">
                {faculty.designation}
              </p>
              {faculty.highest_qualification && (
                <p className="text-xs text-slate-500 italic">
                  {faculty.highest_qualification}
                </p>
              )}
            </div>
          </div>

          {/* Contact Details & Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <a href={`mailto:${faculty.email}`} className="hover:text-blue-700 truncate font-medium">
                {faculty.email}
              </a>
            </div>
            {faculty.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{faculty.phone}</span>
              </div>
            )}
            {faculty.office_location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-medium">
                  {faculty.office_location} {faculty.office_room ? `(Room: ${faculty.office_room})` : ''}
                </span>
              </div>
            )}
          </div>

          {/* External Research Profile Links */}
          <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-2">Research Profiles:</span>
            {faculty.google_scholar_url && (
              <a
                href={faculty.google_scholar_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                <span>Google Scholar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {faculty.orcid_url && (
              <a
                href={faculty.orcid_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <span>ORCID</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {faculty.scopus_url && (
              <a
                href={faculty.scopus_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-200 transition-colors"
              >
                <span>Scopus</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {faculty.vidwan_url && (
              <a
                href={faculty.vidwan_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 transition-colors"
              >
                <span>Vidwan INFLIBNET</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {faculty.researchgate_url && (
              <a
                href={faculty.researchgate_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors"
              >
                <span>ResearchGate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {faculty.linkedin_url && (
              <a
                href={faculty.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-slate-200 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Research
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'education'
                ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Education ({faculty.education?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'experience'
                ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Experience ({faculty.experience?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('publications')}
            className={`px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'publications'
                ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Publications ({faculty.publications?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('patents')}
            className={`px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'patents'
                ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Patents ({faculty.patents?.length || 0})
          </button>
        </div>

        <div className="p-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {faculty.biography && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Biography
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                    {faculty.biography}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {faculty.specialization && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-blue-700" />
                      Specialization & Core Disciplines
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {faculty.specialization}
                    </p>
                  </div>
                )}

                {faculty.research_interests && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-700" />
                      Research Interests
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {faculty.research_interests}
                    </p>
                  </div>
                )}
              </div>

              {faculty.research_keywords && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Research Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {faculty.research_keywords.split(',').map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200"
                      >
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              {!faculty.education || faculty.education.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No formal education records listed.</p>
              ) : (
                <div className="relative border-l-2 border-blue-200 ml-3 pl-6 space-y-6">
                  {faculty.education.map((edu, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{edu.degree}</span>
                          {edu.year && (
                            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                              {edu.year}
                            </span>
                          )}
                        </div>
                        {edu.specialization && (
                          <p className="text-xs font-medium text-slate-700">{edu.specialization}</p>
                        )}
                        <p className="text-xs text-slate-500">{edu.institution}</p>
                        {edu.description && (
                          <p className="text-xs text-slate-600 mt-1 italic">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              {!faculty.experience || faculty.experience.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No professional experience records listed.</p>
              ) : (
                <div className="relative border-l-2 border-emerald-200 ml-3 pl-6 space-y-6">
                  {faculty.experience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{exp.designation}</span>
                          {(exp.start_date || exp.end_date) && (
                            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                              {exp.start_date || 'Start'} - {exp.end_date || 'Present'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{exp.organization}</p>
                        {exp.description && (
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className="space-y-4">
              {!faculty.publications || faculty.publications.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No publications indexed yet.</p>
              ) : (
                <div className="space-y-3">
                  {faculty.publications.map((pub, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                          {pub.publication_type}
                        </span>
                        {pub.publication_year && (
                          <span className="text-[11px] font-semibold text-slate-600 font-mono">
                            {pub.publication_year}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {pub.title}
                      </h4>
                      <p className="text-xs text-slate-600 italic">
                        Authors: {pub.authors}
                      </p>
                      <p className="text-xs text-slate-700 font-medium">
                        {pub.journal_or_conference}
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-xs">
                        {pub.doi && (
                          <span className="text-slate-500 font-mono text-[11px]">
                            DOI: {pub.doi}
                          </span>
                        )}
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-blue-700 hover:underline font-semibold"
                          >
                            <span>Read Article</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PATENTS */}
          {activeTab === 'patents' && (
            <div className="space-y-4">
              {!faculty.patents || faculty.patents.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No patents registered.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faculty.patents.map((pat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pat.status === 'Granted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {pat.status}
                        </span>
                        {pat.patent_number && (
                          <span className="text-xs font-mono text-slate-700 font-bold">
                            {pat.patent_number}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {pat.title}
                      </h4>
                      {pat.inventors && (
                        <p className="text-xs text-slate-600">
                          <span className="font-semibold">Inventors:</span> {pat.inventors}
                        </p>
                      )}
                      <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-amber-200/50">
                        <span>Filed: {pat.filing_date || 'N/A'}</span>
                        <span>Published: {pat.publication_date || 'N/A'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
