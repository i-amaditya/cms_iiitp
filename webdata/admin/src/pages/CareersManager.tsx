import React, { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Send,
  Archive,
  Trash2,
  AlertCircle,
  X,
  Layers,
  ExternalLink,
  FileText,
  Save,
} from 'lucide-react';
import {
  getCareers,
  createCareer,
  updateCareerDraft,
  publishCareer,
  archiveCareer,
  deleteCareer,
  addCareerButton,
  updateCareerButton,
  deleteCareerButton,
} from '../api/careers';
import type { Career, CareerButton, Pagination as PaginationType, ContentStatus } from '../api/types';
import { useAuth } from '../context/useAuth';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { FileUploadInput } from '../components/FileUploadInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { AccessDenied } from '../components/AccessDenied';

export const CareersManager: React.FC = () => {
  const { isAdmin, canAccessSection } = useAuth();
  const hasAccess = canAccessSection('careers');

  // List state
  const [careers, setCareers] = useState<Career[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [managingButtonsCareer, setManagingButtonsCareer] = useState<Career | null>(null);
  const [confirmPublishId, setConfirmPublishId] = useState<number | null>(null);
  const [confirmArchiveId, setConfirmArchiveId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Main Form states
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<'live' | 'past'>('live');
  const [formPostDate, setFormPostDate] = useState('');
  const [formLastDate, setFormLastDate] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Button Sub-resource Form state
  const [editingBtnId, setEditingBtnId] = useState<number | null>(null);
  const [btnLabel, setBtnLabel] = useState('');
  const [btnUrl, setBtnUrl] = useState('');
  const [btnFileUrl, setBtnFileUrl] = useState('');
  const [btnOrder, setBtnOrder] = useState(0);
  const [btnSubmitting, setBtnSubmitting] = useState(false);
  const [btnError, setBtnError] = useState<string | null>(null);

  const fetchCareersList = useCallback(
    async (pageToLoad = 1) => {
      try {
        setLoading(true);
        setListError(null);

        const res = await getCareers({
          page: pageToLoad,
          limit: pagination.limit,
          search: searchQuery.trim() || undefined,
          type: typeFilter !== 'all' ? (typeFilter as 'live' | 'past') : undefined,
          status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
        });

        setCareers(res.careers);
        setPagination(res.pagination);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load careers';
        setListError(msg);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchQuery, typeFilter, statusFilter]
  );

  useEffect(() => {
    let isMounted = true;
    if (hasAccess) {
      getCareers({
        page: 1,
        limit: 10,
        search: searchQuery.trim() || undefined,
        type: typeFilter !== 'all' ? (typeFilter as 'live' | 'past') : undefined,
        status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
      })
        .then((res) => {
          if (isMounted) {
            setCareers(res.careers);
            setPagination(res.pagination);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            const msg = err instanceof Error ? err.message : 'Failed to load careers';
            setListError(msg);
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [hasAccess, searchQuery, typeFilter, statusFilter]);

  if (!hasAccess) {
    return <AccessDenied sectionName="Careers" />;
  }

  // ── Open Create Modal ────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setFormTitle('');
    setFormType('live');
    setFormPostDate(new Date().toISOString().split('T')[0]);
    setFormLastDate('');
    setFormError(null);
    setIsCreateOpen(true);
  };

  // ── Open Edit Modal ──────────────────────────────────────────────────────────
  const openEditModal = (career: Career) => {
    setEditingCareer(career);
    setFormTitle(career.draft_title ?? career.title);
    setFormType(career.career_type);
    const lastDateVal = career.draft_last_date ?? career.last_date;
    setFormLastDate(lastDateVal ? lastDateVal.split('T')[0] : '');
    setFormError(null);
  };

  // ── Open Buttons Modal ───────────────────────────────────────────────────────
  const openButtonsModal = (career: Career) => {
    setManagingButtonsCareer(career);
    resetButtonForm();
  };

  const resetButtonForm = () => {
    setEditingBtnId(null);
    setBtnLabel('');
    setBtnUrl('');
    setBtnFileUrl('');
    setBtnOrder(0);
    setBtnError(null);
  };

  // ── Handle Submit Create ─────────────────────────────────────────────────────
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Job / position title is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await createCareer({
        title: formTitle.trim(),
        career_type: formType,
        post_date: formPostDate || undefined,
        last_date: formLastDate || undefined,
      });

      setIsCreateOpen(false);
      fetchCareersList(1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create career posting';
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Submit Edit (Draft) ───────────────────────────────────────────────
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer) return;
    if (!formTitle.trim()) {
      setFormError('Job / position title is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await updateCareerDraft(editingCareer.id, {
        title: formTitle.trim(),
        career_type: formType,
        last_date: formLastDate || null,
      });

      setEditingCareer(null);
      fetchCareersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update career draft';
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Buttons CRUD ──────────────────────────────────────────────────────
  const handleSaveButton = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingButtonsCareer) return;
    if (!btnLabel.trim()) {
      setBtnError('Button label is required.');
      return;
    }

    try {
      setBtnSubmitting(true);
      setBtnError(null);

      if (editingBtnId) {
        const res = await updateCareerButton(managingButtonsCareer.id, editingBtnId, {
          label: btnLabel.trim(),
          url: btnUrl.trim() || null,
          file_url: btnFileUrl.trim() || null,
          display_order: Number(btnOrder) || 0,
        });

        // Update local state
        setManagingButtonsCareer({
          ...managingButtonsCareer,
          buttons: (managingButtonsCareer.buttons || []).map((b) =>
            b.id === editingBtnId ? res.button : b
          ),
        });
      } else {
        const res = await addCareerButton(managingButtonsCareer.id, {
          label: btnLabel.trim(),
          url: btnUrl.trim() || null,
          file_url: btnFileUrl.trim() || null,
          display_order: Number(btnOrder) || 0,
        });

        setManagingButtonsCareer({
          ...managingButtonsCareer,
          buttons: [...(managingButtonsCareer.buttons || []), res.button],
        });
      }

      resetButtonForm();
      fetchCareersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save button';
      setBtnError(msg);
    } finally {
      setBtnSubmitting(false);
    }
  };

  const handleEditButton = (btn: CareerButton) => {
    setEditingBtnId(btn.id);
    setBtnLabel(btn.label);
    setBtnUrl(btn.url || '');
    setBtnFileUrl(btn.file_url || '');
    setBtnOrder(btn.display_order || 0);
    setBtnError(null);
  };

  const handleDeleteButton = async (btnId: number) => {
    if (!managingButtonsCareer) return;
    if (!window.confirm('Delete this career button?')) return;

    try {
      setBtnSubmitting(true);
      await deleteCareerButton(managingButtonsCareer.id, btnId);

      setManagingButtonsCareer({
        ...managingButtonsCareer,
        buttons: (managingButtonsCareer.buttons || []).filter((b) => b.id !== btnId),
      });

      if (editingBtnId === btnId) {
        resetButtonForm();
      }

      fetchCareersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete button';
      alert(msg);
    } finally {
      setBtnSubmitting(false);
    }
  };

  // ── Publish / Archive / Delete Actions ───────────────────────────────────────
  const handlePublishConfirm = async () => {
    if (!confirmPublishId) return;
    try {
      setFormSubmitting(true);
      await publishCareer(confirmPublishId);
      setConfirmPublishId(null);
      fetchCareersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish career posting';
      alert(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleArchiveConfirm = async () => {
    if (!confirmArchiveId) return;
    try {
      setFormSubmitting(true);
      await archiveCareer(confirmArchiveId);
      setConfirmArchiveId(null);
      fetchCareersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to archive career posting';
      alert(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      setFormSubmitting(true);
      await deleteCareer(confirmDeleteId);
      setConfirmDeleteId(null);
      fetchCareersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete career posting';
      alert(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Careers Manager</h1>
          <p>Manage faculty recruitment, project staff openings, and action buttons.</p>
        </div>

        <button className="primary-button" type="button" onClick={openCreateModal}>
          <Plus size={18} />
          <span>Create Career</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-card">
        <div className="filter-row">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search careers by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchCareersList(1)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  fetchCareersList(1);
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select
              className="filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="live">Live Postings</option>
              <option value="past">Past Openings</option>
            </select>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <button
              type="button"
              className="secondary-button filter-btn"
              onClick={() => fetchCareersList(1)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* List / Table Area */}
      {listError ? (
        <div className="error-box">
          <AlertCircle size={18} />
          <span>{listError}</span>
          <button type="button" className="retry-button" onClick={() => fetchCareersList(1)}>
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="table-card">
          <LoadingSpinner message="Loading career postings..." />
        </div>
      ) : careers.length === 0 ? (
        <div className="table-card">
          <EmptyState
            title="No career postings found"
            description={
              searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'No career records match the selected filters.'
                : 'Get started by creating your first career advertisement draft.'
            }
            actionLabel={
              searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                ? undefined
                : '+ Create Career'
            }
            onAction={openCreateModal}
          />
        </div>
      ) : (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Title & Action Buttons</th>
                <th style={{ width: '12%' }}>Type</th>
                <th style={{ width: '15%' }}>Last Date</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '20%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => {
                const displayTitle = career.draft_title || career.title;
                const displayLastDate = career.draft_last_date || career.last_date;
                const buttonCount = career.buttons?.length || 0;

                return (
                  <tr key={career.id}>
                    <td>
                      <div className="row-main-title">{displayTitle}</div>
                      <div className="row-meta-links">
                        <span className="meta-id">ID: #{career.id}</span>
                        {career.post_date && (
                          <span className="meta-info">
                            Posted: {new Date(career.post_date).toLocaleDateString()}
                          </span>
                        )}
                        <button
                          type="button"
                          className="btn-manage-pill"
                          onClick={() => openButtonsModal(career)}
                        >
                          <Layers size={13} />
                          <span>{buttonCount} Button{buttonCount === 1 ? '' : 's'}</span>
                        </button>
                      </div>
                    </td>

                    <td>
                      <span className={`type-pill ${career.career_type}`}>
                        {career.career_type === 'live' ? 'Live' : 'Past'}
                      </span>
                    </td>

                    <td>
                      <span className="date-text">
                        {displayLastDate ? new Date(displayLastDate).toLocaleDateString() : 'Rolling / Open'}
                      </span>
                    </td>

                    <td>
                      <StatusBadge
                        status={career.status}
                        hasUnpublishedDraft={career.has_unpublished_draft}
                      />
                    </td>

                    <td>
                      <div className="action-buttons-cell">
                        {/* Manage Buttons */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Manage Action Buttons (Apply, Details, etc.)"
                          onClick={() => openButtonsModal(career)}
                        >
                          <Layers size={16} />
                        </button>

                        {/* Edit Draft */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Edit Working Draft"
                          onClick={() => openEditModal(career)}
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Publish */}
                        {career.status !== 'published' || career.has_unpublished_draft ? (
                          <button
                            type="button"
                            className="action-icon-btn publish"
                            title="Publish to Live Website"
                            onClick={() => setConfirmPublishId(career.id)}
                          >
                            <Send size={16} />
                          </button>
                        ) : null}

                        {/* Archive */}
                        {career.status !== 'archived' && (
                          <button
                            type="button"
                            className="action-icon-btn archive"
                            title="Archive Career"
                            onClick={() => setConfirmArchiveId(career.id)}
                          >
                            <Archive size={16} />
                          </button>
                        )}

                        {/* Delete (Admin Only) */}
                        {isAdmin && (
                          <button
                            type="button"
                            className="action-icon-btn delete"
                            title="Delete Permanently (Admin Only)"
                            onClick={() => setConfirmDeleteId(career.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            pagination={pagination}
            onPageChange={(newPage) => fetchCareersList(newPage)}
            disabled={loading}
          />
        </div>
      )}

      {/* ── CREATE CAREER MODAL ────────────────────────────────────────────── */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => !formSubmitting && setIsCreateOpen(false)}
        title="Create Career Advertisement"
        subtitle="This will save a new career draft. You can add buttons (e.g. Apply Now, Details) and publish when ready."
      >
        <form onSubmit={handleCreateSubmit} className="cms-modal-form">
          {formError && (
            <div className="form-error-banner">
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Position / Advertisement Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. ADVERTISEMENT FOR POSITIONS IN START-UP & INCUBATION CELL"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Posting Type</label>
              <select
                className="form-input"
                value={formType}
                onChange={(e) => setFormType(e.target.value as 'live' | 'past')}
              >
                <option value="live">Live (Active Openings)</option>
                <option value="past">Past (Closed / Archived Openings)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Post Date</label>
              <input
                type="date"
                className="form-input"
                value={formPostDate}
                onChange={(e) => setFormPostDate(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Last Date to Apply (Optional)</label>
              <input
                type="date"
                className="form-input"
                value={formLastDate}
                onChange={(e) => setFormLastDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setIsCreateOpen(false)}
              disabled={formSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={formSubmitting}>
              {formSubmitting ? 'Saving Draft...' : 'Create Draft'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── EDIT CAREER DRAFT MODAL ─────────────────────────────────────────── */}
      <Modal
        isOpen={!!editingCareer}
        onClose={() => !formSubmitting && setEditingCareer(null)}
        title="Edit Career Draft"
        subtitle="Changes are saved into the working draft. Publish to push them to the live website."
      >
        <form onSubmit={handleEditSubmit} className="cms-modal-form">
          {formError && (
            <div className="form-error-banner">
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <div className="draft-notice-banner">
            <strong>Working-Copy Draft Engine:</strong> Updating draft fields preserves live recruitment data until published.
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Position / Advertisement Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Posting Type</label>
              <select
                className="form-input"
                value={formType}
                onChange={(e) => setFormType(e.target.value as 'live' | 'past')}
              >
                <option value="live">Live (Active Openings)</option>
                <option value="past">Past (Closed / Archived Openings)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Last Date to Apply (Optional)</label>
              <input
                type="date"
                className="form-input"
                value={formLastDate}
                onChange={(e) => setFormLastDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditingCareer(null)}
              disabled={formSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={formSubmitting}>
              {formSubmitting ? 'Saving Draft...' : 'Save Draft Edits'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── CAREER BUTTONS MANAGEMENT MODAL ─────────────────────────────────── */}
      <Modal
        isOpen={!!managingButtonsCareer}
        onClose={() => setManagingButtonsCareer(null)}
        title={`Manage Buttons: ${managingButtonsCareer?.title.substring(0, 45)}...`}
        subtitle="Manage the action buttons displayed alongside this career opening (e.g. 'Details', 'Apply Now', 'Syllabus')."
        maxWidth="720px"
      >
        <div className="buttons-manager-container">
          {/* Existing Buttons List */}
          <div className="existing-buttons-section">
            <h3 className="section-subheading">Attached Buttons</h3>
            {(!managingButtonsCareer?.buttons || managingButtonsCareer.buttons.length === 0) ? (
              <div className="empty-buttons-hint">No buttons attached yet. Add one below.</div>
            ) : (
              <div className="buttons-list">
                {managingButtonsCareer.buttons.map((btn) => (
                  <div key={btn.id} className="button-item-row">
                    <div className="button-item-info">
                      <span className="button-badge-preview">{btn.label}</span>
                      <span className="button-order-tag">Order: {btn.display_order}</span>
                      {btn.file_url && (
                        <a href={btn.file_url} target="_blank" rel="noopener noreferrer" className="meta-link">
                          <FileText size={12} />
                          <span>PDF</span>
                        </a>
                      )}
                      {btn.url && (
                        <a href={btn.url} target="_blank" rel="noopener noreferrer" className="meta-link">
                          <ExternalLink size={12} />
                          <span>URL</span>
                        </a>
                      )}
                    </div>

                    <div className="button-item-actions">
                      <button
                        type="button"
                        className="small-icon-button"
                        title="Edit Button"
                        onClick={() => handleEditButton(btn)}
                        disabled={btnSubmitting}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="small-icon-button delete"
                        title="Delete Button"
                        onClick={() => handleDeleteButton(btn.id)}
                        disabled={btnSubmitting}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add / Edit Button Form */}
          <div className="button-form-card">
            <h3 className="section-subheading">
              {editingBtnId ? 'Edit Button' : 'Add New Button'}
            </h3>

            {btnError && (
              <div className="form-error-banner">
                <AlertCircle size={15} />
                <span>{btnError}</span>
              </div>
            )}

            <form onSubmit={handleSaveButton} className="cms-modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Button Label <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Details, Apply Now, Guidelines"
                    value={btnLabel}
                    onChange={(e) => setBtnLabel(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Display Order</label>
                  <input
                    type="number"
                    className="form-input"
                    value={btnOrder}
                    onChange={(e) => setBtnOrder(parseInt(e.target.value, 10) || 0)}
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">External Action URL (e.g. Portal Link)</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://iiitpnt.samarth.edu.in/..."
                    value={btnUrl}
                    onChange={(e) => setBtnUrl(e.target.value)}
                  />
                </div>

                <FileUploadInput
                  value={btnFileUrl}
                  onChange={setBtnFileUrl}
                  context="careers"
                  label="Or Upload/Attach PDF File"
                  placeholder="/careers-documents/advt.pdf"
                />
              </div>

              <div className="modal-actions mt-3">
                {editingBtnId && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={resetButtonForm}
                    disabled={btnSubmitting}
                  >
                    Cancel Edit
                  </button>
                )}
                <button type="submit" className="primary-button" disabled={btnSubmitting}>
                  <Save size={16} />
                  <span>{btnSubmitting ? 'Saving...' : editingBtnId ? 'Update Button' : 'Add Button'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* ── CONFIRM PUBLISH DIALOG ─────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmPublishId}
        onClose={() => setConfirmPublishId(null)}
        onConfirm={handlePublishConfirm}
        title="Publish Career Posting"
        message="Are you sure you want to publish this career posting? It will become live immediately on the public website."
        confirmLabel="Publish Now"
        variant="primary"
        loading={formSubmitting}
      />

      {/* ── CONFIRM ARCHIVE DIALOG ─────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmArchiveId}
        onClose={() => setConfirmArchiveId(null)}
        onConfirm={handleArchiveConfirm}
        title="Archive Career"
        message="Are you sure you want to archive this career posting? It will be marked as past."
        confirmLabel="Archive Career"
        variant="warning"
        loading={formSubmitting}
      />

      {/* ── CONFIRM DELETE DIALOG ──────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Career Permanently"
        message="This action CANNOT be undone. The career advertisement and all attached action buttons will be permanently removed."
        confirmLabel="Delete Permanently"
        variant="danger"
        loading={formSubmitting}
      />
    </div>
  );
};
