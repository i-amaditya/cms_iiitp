import React, { useState, useEffect } from 'react';
import { Faculty, Department, EducationItem, ExperienceItem, PublicationItem, PatentItem } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import {
  Save,
  Send,
  Upload,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';

interface FacultyProfileEditorProps {
  onBack: () => void;
  facultyId?: number; // Optional for admin editing arbitrary faculty
  isAdminMode?: boolean;
}

export const FacultyProfileEditor: React.FC<FacultyProfileEditorProps> = ({
  onBack,
  facultyId,
  isAdminMode = false
}) => {
  const [formData, setFormData] = useState<Partial<Faculty>>({
    title: 'Dr.',
    first_name: '',
    middle_name: '',
    last_name: '',
    full_name: '',
    designation: '',
    department_id: 1,
    faculty_type: 'Regular',
    email: '',
    alternate_email: '',
    phone: '',
    office_location: '',
    office_room: '',
    profile_photo: '',
    profile_slug: '',
    highest_qualification: '',
    specialization: '',
    research_interests: '',
    areas_of_expertise: '',
    biography: '',
    academic_experience: '',
    industry_experience: '',
    research_keywords: '',
    google_scholar_url: '',
    orcid_url: '',
    scopus_url: '',
    researchgate_url: '',
    vidwan_url: '',
    linkedin_url: '',
    education: [],
    experience: [],
    publications: [],
    patents: []
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [activeTab, setActiveTab] = useState<'basic' | 'photo' | 'academic' | 'education' | 'experience' | 'publications' | 'patents' | 'links'>('basic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [depts, profile] = await Promise.all([
          api.get<Department[]>('/api/public/departments'),
          isAdminMode && facultyId
            ? api.get<Faculty>(`/api/admin/faculty/${facultyId}`)
            : api.get<Faculty>('/api/faculty/me')
        ]);

        setDepartments(depts);
        if (profile) {
          setFormData({
            ...profile,
            education: profile.education || [],
            experience: profile.experience || [],
            publications: profile.publications || [],
            patents: profile.patents || []
          });
        }
      } catch (err: any) {
        setNotification({ type: 'error', message: err.message || 'Failed to load profile data' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [facultyId, isAdminMode]);

  const handleChange = (field: keyof Faculty, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-construct full name when name parts change
      if (['title', 'first_name', 'middle_name', 'last_name'].includes(field as string)) {
        const parts = [
          field === 'title' ? value : updated.title,
          field === 'first_name' ? value : updated.first_name,
          field === 'middle_name' ? value : updated.middle_name,
          field === 'last_name' ? value : updated.last_name
        ].filter(Boolean);
        updated.full_name = parts.join(' ');
      }
      // Auto-construct slug if slug is empty
      if (field === 'last_name' && !updated.profile_slug && updated.first_name) {
        updated.profile_slug = `${(updated.first_name || '').toLowerCase()}-${(value || '').toLowerCase()}`.replace(/[^a-z0-9-]/g, '');
      }
      return updated;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);
      const res = await api.uploadPhoto(file);
      handleChange('profile_photo', res.url);
      setNotification({ type: 'success', message: 'Photo uploaded successfully!' });
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Photo upload failed' });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async (submitForApprovalImmediately: boolean = false) => {
    try {
      setSaving(true);
      setNotification(null);

      const endpoint = isAdminMode && facultyId
        ? `/api/admin/faculty/${facultyId}`
        : '/api/faculty/me';

      const payload = {
        ...formData,
        submitForApprovalImmediately
      };

      const method = isAdminMode && facultyId ? api.put : api.put;
      const res = await method<Faculty>(endpoint, payload);

      setFormData(prev => ({
        ...prev,
        ...res,
        education: res.education || [],
        experience: res.experience || [],
        publications: res.publications || [],
        patents: res.patents || []
      }));

      const msg = submitForApprovalImmediately
        ? 'Profile changes saved and submitted for administrator approval!'
        : 'Draft saved successfully.';

      setNotification({ type: 'success', message: msg });
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  // Education Helpers
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...(prev.education || []), { degree: '', institution: '', specialization: '', year: '', description: '' }]
    }));
  };
  const updateEducation = (idx: number, field: keyof EducationItem, val: string) => {
    setFormData(prev => {
      const list = [...(prev.education || [])];
      list[idx] = { ...list[idx], [field]: val };
      return { ...prev, education: list };
    });
  };
  const removeEducation = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== idx)
    }));
  };

  // Experience Helpers
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), { organization: '', designation: '', start_date: '', end_date: '', description: '' }]
    }));
  };
  const updateExperience = (idx: number, field: keyof ExperienceItem, val: string) => {
    setFormData(prev => {
      const list = [...(prev.experience || [])];
      list[idx] = { ...list[idx], [field]: val };
      return { ...prev, experience: list };
    });
  };
  const removeExperience = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      experience: (prev.experience || []).filter((_, i) => i !== idx)
    }));
  };

  // Publication Helpers
  const addPublication = () => {
    setFormData(prev => ({
      ...prev,
      publications: [...(prev.publications || []), { title: '', authors: '', journal_or_conference: '', publication_year: new Date().getFullYear(), publication_type: 'Journal' }]
    }));
  };
  const updatePublication = (idx: number, field: keyof PublicationItem, val: any) => {
    setFormData(prev => {
      const list = [...(prev.publications || [])];
      list[idx] = { ...list[idx], [field]: val };
      return { ...prev, publications: list };
    });
  };
  const removePublication = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      publications: (prev.publications || []).filter((_, i) => i !== idx)
    }));
  };

  // Patent Helpers
  const addPatent = () => {
    setFormData(prev => ({
      ...prev,
      patents: [...(prev.patents || []), { title: '', patent_number: '', status: 'Published', inventors: '', filing_date: '', publication_date: '' }]
    }));
  };
  const updatePatent = (idx: number, field: keyof PatentItem, val: any) => {
    setFormData(prev => {
      const list = [...(prev.patents || [])];
      list[idx] = { ...list[idx], [field]: val };
      return { ...prev, patents: list };
    });
  };
  const removePatent = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      patents: (prev.patents || []).filter((_, i) => i !== idx)
    }));
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent mb-3" />
        <p className="text-slate-500 text-sm">Loading faculty editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isAdminMode ? `Editing: ${formData.full_name || 'Faculty Profile'}` : 'Faculty Profile Editor'}
          </h1>
          <p className="text-xs text-slate-500">
            {isAdminMode
              ? 'Administrator editing mode with direct publish rights'
              : 'Updates saved here will create a version snapshot and can be submitted for admin approval.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors shadow-xs flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-slate-600" />
            {saving ? 'Saving...' : 'Save Draft'}
          </button>

          {!isAdminMode ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs transition-colors shadow-xs flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {saving ? 'Processing...' : 'Submit for Approval'}
            </button>
          ) : (
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(false)}
              className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Save & Apply
            </button>
          )}
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl border text-xs font-semibold flex items-center gap-2 shadow-xs ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Editor Tab Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-slate-200 overflow-x-auto text-xs font-bold uppercase tracking-wider bg-slate-50/70">
          {[
            { id: 'basic', label: '1. Basic Info' },
            { id: 'photo', label: '2. Profile Photo' },
            { id: 'academic', label: '3. Academic Bio' },
            { id: 'education', label: `4. Education (${formData.education?.length || 0})` },
            { id: 'experience', label: `5. Experience (${formData.experience?.length || 0})` },
            { id: 'publications', label: `6. Publications (${formData.publications?.length || 0})` },
            { id: 'patents', label: `7. Patents (${formData.patents?.length || 0})` },
            { id: 'links', label: '8. Professional Links' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-3.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? 'border-purple-900 text-purple-900 bg-white shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* TAB 1: BASIC INFORMATION */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title</label>
                <select
                  value={formData.title || 'Dr.'}
                  onChange={e => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                >
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.first_name || ''}
                  onChange={e => handleChange('first_name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Middle Name</label>
                <input
                  type="text"
                  value={formData.middle_name || ''}
                  onChange={e => handleChange('middle_name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.last_name || ''}
                  onChange={e => handleChange('last_name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Display Name</label>
                <input
                  type="text"
                  value={formData.full_name || ''}
                  onChange={e => handleChange('full_name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-slate-50 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Profile URL Slug *</label>
                <div className="flex items-center">
                  <span className="px-2.5 py-2 text-xs bg-slate-100 border border-r-0 border-slate-300 text-slate-500 rounded-l-lg font-mono">
                    /faculty/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.profile_slug || ''}
                    onChange={e => handleChange('profile_slug', e.target.value)}
                    className="w-full px-3 py-2 rounded-r-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  value={formData.designation || ''}
                  onChange={e => handleChange('designation', e.target.value)}
                  placeholder="e.g. Associate Professor & HoD ECE"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department *</label>
                <select
                  disabled={!isAdminMode} // Faculty cannot arbitrarily change departmental affiliation
                  value={formData.department_id || 1}
                  onChange={e => handleChange('department_id', parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-purple-600 disabled:bg-slate-100"
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.short_name})</option>
                  ))}
                </select>
                {!isAdminMode && (
                  <span className="text-[10px] text-slate-500">Department change requires administrator permission.</span>
                )}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Employee ID *</label>
                <input
                  type="text"
                  disabled={!isAdminMode}
                  value={formData.employee_id || ''}
                  onChange={e => handleChange('employee_id', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono bg-slate-50 disabled:bg-slate-100"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alternate Email</label>
                <input
                  type="email"
                  value={formData.alternate_email || ''}
                  onChange={e => handleChange('alternate_email', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / Ext</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder="+91 20 2699 3000"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Office Building / Location</label>
                <input
                  type="text"
                  value={formData.office_location || ''}
                  onChange={e => handleChange('office_location', e.target.value)}
                  placeholder="Academic Block A"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Office Room No.</label>
                <input
                  type="text"
                  value={formData.office_room || ''}
                  onChange={e => handleChange('office_room', e.target.value)}
                  placeholder="Room 304"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE PHOTO */}
          {activeTab === 'photo' && (
            <div className="space-y-6 max-w-xl">
              <div className="flex items-center gap-6">
                <img
                  src={formData.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt="Faculty Preview"
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-slate-200 shadow-md bg-slate-100"
                />
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">Official Profile Photo</h3>
                  <p className="text-xs text-slate-500">
                    Upload an institute-standard headshot. Formats: JPG, PNG, WebP (Max 5MB).
                  </p>
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-purple-900 text-white text-xs font-semibold hover:bg-purple-800 transition-colors cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingPhoto ? 'Uploading...' : 'Choose File to Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingPhoto}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Or Direct Image URL</label>
                <input
                  type="text"
                  value={formData.profile_photo || ''}
                  onChange={e => handleChange('profile_photo', e.target.value)}
                  placeholder="https://... or /uploads/faculty/photo.jpg"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          )}

          {/* TAB 3: ACADEMIC BIO & RESEARCH */}
          {activeTab === 'academic' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Highest Qualification *</label>
                <input
                  type="text"
                  value={formData.highest_qualification || ''}
                  onChange={e => handleChange('highest_qualification', e.target.value)}
                  placeholder="e.g. Ph.D. in Computer Science & Engineering, IIT Kharagpur"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Specialization & Discipline</label>
                <textarea
                  rows={2}
                  value={formData.specialization || ''}
                  onChange={e => handleChange('specialization', e.target.value)}
                  placeholder="e.g. Machine Learning, Evolutionary Computing, Swarm Intelligence, Medical Imaging"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Research Interests</label>
                <textarea
                  rows={3}
                  value={formData.research_interests || ''}
                  onChange={e => handleChange('research_interests', e.target.value)}
                  placeholder="Detailed description of ongoing research investigations..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Biography / Academic Narrative</label>
                <textarea
                  rows={4}
                  value={formData.biography || ''}
                  onChange={e => handleChange('biography', e.target.value)}
                  placeholder="Academic career overview, awards, honors, and affiliations..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Research Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.research_keywords || ''}
                  onChange={e => handleChange('research_keywords', e.target.value)}
                  placeholder="Deep Learning, VLSI, Cryptography, Swarm Optimization"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Degrees & Qualifications</h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-3 py-1.5 rounded-lg bg-purple-900 text-white text-xs font-semibold hover:bg-purple-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Degree
                </button>
              </div>

              {(formData.education || []).length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  No education records added. Click "Add Degree" to add Ph.D., M.Tech, or B.Tech degrees.
                </div>
              ) : (
                <div className="space-y-3">
                  {(formData.education || []).map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-900 uppercase">Degree #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeEducation(idx)}
                          className="text-rose-600 hover:text-rose-800 text-xs p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            placeholder="Degree (e.g. Ph.D.)"
                            value={edu.degree || ''}
                            onChange={e => updateEducation(idx, 'degree', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Specialization"
                            value={edu.specialization || ''}
                            onChange={e => updateEducation(idx, 'specialization', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            placeholder="Institution / University"
                            value={edu.institution || ''}
                            onChange={e => updateEducation(idx, 'institution', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Year"
                            value={edu.year || ''}
                            onChange={e => updateEducation(idx, 'year', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-12">
                          <input
                            type="text"
                            placeholder="Thesis title or academic distinction"
                            value={edu.description || ''}
                            onChange={e => updateEducation(idx, 'description', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Academic & Industry Experience</h3>
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-3 py-1.5 rounded-lg bg-purple-900 text-white text-xs font-semibold hover:bg-purple-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Position
                </button>
              </div>

              {(formData.experience || []).length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  No experience records added. Click "Add Position" to document previous appointments.
                </div>
              ) : (
                <div className="space-y-3">
                  {(formData.experience || []).map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-900 uppercase">Experience #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeExperience(idx)}
                          className="text-rose-600 hover:text-rose-800 text-xs p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            placeholder="Organization / Institute"
                            value={exp.organization || ''}
                            onChange={e => updateExperience(idx, 'organization', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            placeholder="Designation / Role"
                            value={exp.designation || ''}
                            onChange={e => updateExperience(idx, 'designation', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Start Date (e.g. 2020)"
                            value={exp.start_date || ''}
                            onChange={e => updateExperience(idx, 'start_date', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="End Date (or Present)"
                            value={exp.end_date || ''}
                            onChange={e => updateExperience(idx, 'end_date', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-12">
                          <input
                            type="text"
                            placeholder="Key responsibilities or administrative roles"
                            value={exp.description || ''}
                            onChange={e => updateExperience(idx, 'description', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Publications (Journal, Conference, Book Chapter)</h3>
                <button
                  type="button"
                  onClick={addPublication}
                  className="px-3 py-1.5 rounded-lg bg-purple-900 text-white text-xs font-semibold hover:bg-purple-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Publication
                </button>
              </div>

              {(formData.publications || []).length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  No publications recorded. Click "Add Publication" to index scholarly papers.
                </div>
              ) : (
                <div className="space-y-3">
                  {(formData.publications || []).map((pub, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-900 uppercase">Publication #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removePublication(idx)}
                          className="text-rose-600 hover:text-rose-800 text-xs p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-8">
                          <input
                            type="text"
                            placeholder="Paper Title *"
                            value={pub.title || ''}
                            onChange={e => updatePublication(idx, 'title', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white font-medium"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <select
                            value={pub.publication_type || 'Journal'}
                            onChange={e => updatePublication(idx, 'publication_type', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          >
                            <option value="Journal">Journal (SCI/Scopus)</option>
                            <option value="Conference">Conference Proceeding</option>
                            <option value="Book Chapter">Book Chapter</option>
                            <option value="Book">Authored Book</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Preprint">Preprint / arXiv</option>
                          </select>
                        </div>

                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            placeholder="Authors (e.g. S. Satapathy, M. Kumar)"
                            value={pub.authors || ''}
                            onChange={e => updatePublication(idx, 'authors', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Journal or Conference Venue"
                            value={pub.journal_or_conference || ''}
                            onChange={e => updatePublication(idx, 'journal_or_conference', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="number"
                            placeholder="Year"
                            value={pub.publication_year || ''}
                            onChange={e => updatePublication(idx, 'publication_year', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            placeholder="DOI (e.g. 10.1109/...)"
                            value={pub.doi || ''}
                            onChange={e => updatePublication(idx, 'doi', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white font-mono"
                          />
                        </div>
                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            placeholder="Direct URL link to article"
                            value={pub.url || ''}
                            onChange={e => updatePublication(idx, 'url', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: PATENTS */}
          {activeTab === 'patents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Patents & Intellectual Property</h3>
                <button
                  type="button"
                  onClick={addPatent}
                  className="px-3 py-1.5 rounded-lg bg-purple-900 text-white text-xs font-semibold hover:bg-purple-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Patent
                </button>
              </div>

              {(formData.patents || []).length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  No patents recorded. Click "Add Patent" to add filed or granted patents.
                </div>
              ) : (
                <div className="space-y-3">
                  {(formData.patents || []).map((pat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-900 uppercase">Patent #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removePatent(idx)}
                          className="text-rose-600 hover:text-rose-800 text-xs p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-8">
                          <input
                            type="text"
                            placeholder="Patent Title *"
                            value={pat.title || ''}
                            onChange={e => updatePatent(idx, 'title', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white font-medium"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <select
                            value={pat.status || 'Published'}
                            onChange={e => updatePatent(idx, 'status', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          >
                            <option value="Filed">Filed</option>
                            <option value="Published">Published</option>
                            <option value="Granted">Granted</option>
                            <option value="Commercialized">Commercialized</option>
                          </select>
                        </div>

                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Patent Number (e.g. IN-2023...)"
                            value={pat.patent_number || ''}
                            onChange={e => updatePatent(idx, 'patent_number', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white font-mono"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Filing Date (YYYY-MM-DD)"
                            value={pat.filing_date || ''}
                            onChange={e => updatePatent(idx, 'filing_date', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Publication / Grant Date"
                            value={pat.publication_date || ''}
                            onChange={e => updatePatent(idx, 'publication_date', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            placeholder="Inventors list"
                            value={pat.inventors || ''}
                            onChange={e => updatePatent(idx, 'inventors', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            placeholder="Patent Office Link / URL"
                            value={pat.url || ''}
                            onChange={e => updatePatent(idx, 'url', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs bg-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: PROFESSIONAL LINKS */}
          {activeTab === 'links' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Google Scholar URL</label>
                <input
                  type="text"
                  value={formData.google_scholar_url || ''}
                  onChange={e => handleChange('google_scholar_url', e.target.value)}
                  placeholder="https://scholar.google.com/citations?user=..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">ORCID ID / URL</label>
                <input
                  type="text"
                  value={formData.orcid_url || ''}
                  onChange={e => handleChange('orcid_url', e.target.value)}
                  placeholder="https://orcid.org/0000-..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Scopus Author URL</label>
                <input
                  type="text"
                  value={formData.scopus_url || ''}
                  onChange={e => handleChange('scopus_url', e.target.value)}
                  placeholder="https://scopus.com/authid/detail.uri?authorId=..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vidwan INFLIBNET URL</label>
                <input
                  type="text"
                  value={formData.vidwan_url || ''}
                  onChange={e => handleChange('vidwan_url', e.target.value)}
                  placeholder="https://vidwan.inflibnet.ac.in/profile/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">ResearchGate URL</label>
                <input
                  type="text"
                  value={formData.researchgate_url || ''}
                  onChange={e => handleChange('researchgate_url', e.target.value)}
                  placeholder="https://researchgate.net/profile/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={formData.linkedin_url || ''}
                  onChange={e => handleChange('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Save Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs"
            >
              Save Draft
            </button>

            {!isAdminMode ? (
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(true)}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit for Approval
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(false)}
                className="px-5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs"
              >
                Save & Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
