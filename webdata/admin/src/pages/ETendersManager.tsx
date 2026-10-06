import React, { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Send,
  Archive,
  Trash2,
  FileCheck,
  AlertCircle,
  X,
  FileText,
} from 'lucide-react';
import {
  getEtenders,
  createEtender,
  updateEtenderDraft,
  publishEtender,
  archiveEtender,
  deleteEtender,
} from '../api/etenders';
import type { Etender, Pagination as PaginationType, ContentStatus } from '../api/types';
import { useAuth } from '../context/useAuth';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { FileUploadInput } from '../components/FileUploadInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { AccessDenied } from '../components/AccessDenied';

export const ETendersManager: React.FC = () => {
  const { isAdmin, canAccessSection } = useAuth();
  const hasAccess = canAccessSection('etenders');

  // List state
  const [tenders, setTenders] = useState<Etender[]>([]);
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
  const [editingTender, setEditingTender] = useState<Etender | null>(null);
  const [confirmPublishId, setConfirmPublishId] = useState<number | null>(null);
  const [confirmArchiveId, setConfirmArchiveId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formTenderNumber, setFormTenderNumber] = useState('');
  const [formType, setFormType] = useState<'live' | 'past'>('live');
  const [formSubmissionDate, setFormSubmissionDate] = useState('');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formCorrigendumUrl, setFormCorrigendumUrl] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchTendersList = useCallback(
    async (pageToLoad = 1) => {
      try {
        setLoading(true);
        setListError(null);

        const res = await getEtenders({
          page: pageToLoad,
          limit: pagination.limit,
          search: searchQuery.trim() || undefined,
          type: typeFilter !== 'all' ? (typeFilter as 'live' | 'past') : undefined,
          status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
        });

        setTenders(res.etenders);
        setPagination(res.pagination);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load e-tenders';
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
      getEtenders({
        page: 1,
        limit: 10,
        search: searchQuery.trim() || undefined,
        type: typeFilter !== 'all' ? (typeFilter as 'live' | 'past') : undefined,
        status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
      })
        .then((res) => {
          if (isMounted) {
            setTenders(res.etenders);
            setPagination(res.pagination);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            const msg = err instanceof Error ? err.message : 'Failed to load e-tenders';
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
    return <AccessDenied sectionName="E-Tenders" />;
  }

  // ── Open Create Modal ────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setFormTitle('');
    setFormTenderNumber('');
    setFormType('live');
    setFormSubmissionDate('');
    setFormFileUrl('');
    setFormCorrigendumUrl('');
    setFormError(null);
    setIsCreateOpen(true);
  };

  // ── Open Edit Modal ──────────────────────────────────────────────────────────
  const openEditModal = (tender: Etender) => {
    setEditingTender(tender);
    setFormTitle(tender.draft_title ?? tender.title);
    setFormTenderNumber(tender.tender_number ?? '');
    setFormType(tender.tender_type);
    setFormSubmissionDate(tender.submission_date ?? '');
    setFormFileUrl(tender.draft_file_url ?? tender.file_url ?? '');
    setFormCorrigendumUrl(tender.draft_corrigendum_url ?? tender.corrigendum_url ?? '');
    setFormError(null);
  };

  // ── Handle Submit Create ─────────────────────────────────────────────────────
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Tender title is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await createEtender({
        title: formTitle.trim(),
        tender_number: formTenderNumber.trim() || undefined,
        tender_type: formType,
        submission_date: formSubmissionDate.trim() || undefined,
        file_url: formFileUrl.trim() || undefined,
        corrigendum_url: formCorrigendumUrl.trim() || undefined,
      });

      setIsCreateOpen(false);
      fetchTendersList(1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create e-tender';
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Submit Edit (Draft) ───────────────────────────────────────────────
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTender) return;
    if (!formTitle.trim()) {
      setFormError('Tender title is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await updateEtenderDraft(editingTender.id, {
        title: formTitle.trim(),
        tender_number: formTenderNumber.trim() || null,
        tender_type: formType,
        submission_date: formSubmissionDate.trim() || null,
        file_url: formFileUrl.trim() || null,
        corrigendum_url: formCorrigendumUrl.trim() || null,
      });

      setEditingTender(null);
      fetchTendersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update e-tender draft';
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Publish ───────────────────────────────────────────────────────────
  const handlePublishConfirm = async () => {
    if (!confirmPublishId) return;
    try {
      setFormSubmitting(true);
      await publishEtender(confirmPublishId);
      setConfirmPublishId(null);
      fetchTendersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish e-tender';
      alert(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Archive ───────────────────────────────────────────────────────────
  const handleArchiveConfirm = async () => {
    if (!confirmArchiveId) return;
    try {
      setFormSubmitting(true);
      await archiveEtender(confirmArchiveId);
      setConfirmArchiveId(null);
      fetchTendersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to archive e-tender';
      alert(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Delete ────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      setFormSubmitting(true);
      await deleteEtender(confirmDeleteId);
      setConfirmDeleteId(null);
      fetchTendersList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete e-tender';
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
          <h1>E-Tenders Manager</h1>
          <p>Manage procurement bids, tenders, corrigendums, and submission timelines.</p>
        </div>

        <button className="primary-button" type="button" onClick={openCreateModal}>
          <Plus size={18} />
          <span>Create Tender</span>
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
              placeholder="Search tenders by title or tender number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchTendersList(1)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  fetchTendersList(1);
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
              <option value="live">Live Tenders</option>
              <option value="past">Past / Closed Tenders</option>
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
              onClick={() => fetchTendersList(1)}
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
          <button type="button" className="retry-button" onClick={() => fetchTendersList(1)}>
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="table-card">
          <LoadingSpinner message="Loading e-tenders..." />
        </div>
      ) : tenders.length === 0 ? (
        <div className="table-card">
          <EmptyState
            title="No e-tenders found"
            description={
              searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'No tender records match the selected filters.'
                : 'Get started by creating your first tender announcement draft.'
            }
            actionLabel={
              searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                ? undefined
                : '+ Create Tender'
            }
            onAction={openCreateModal}
          />
        </div>
      ) : (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Title & Tender No.</th>
                <th style={{ width: '12%' }}>Type</th>
                <th style={{ width: '18%' }}>Submission Date</th>
                <th style={{ width: '14%' }}>Status</th>
                <th style={{ width: '18%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => {
                const displayTitle = tender.draft_title || tender.title;
                const activeFileUrl = tender.draft_file_url || tender.file_url;
                const activeCorrigendum = tender.draft_corrigendum_url || tender.corrigendum_url;

                return (
                  <tr key={tender.id}>
                    <td>
                      <div className="row-main-title">{displayTitle}</div>
                      {tender.tender_number && (
                        <div className="row-tender-no">Ref: {tender.tender_number}</div>
                      )}
                      <div className="row-meta-links">
                        <span className="meta-id">ID: #{tender.id}</span>
                        {activeFileUrl && (
                          <a
                            href={activeFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meta-link"
                          >
                            <FileText size={13} />
                            <span>Tender Doc</span>
                          </a>
                        )}
                        {activeCorrigendum && (
                          <a
                            href={activeCorrigendum}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meta-link corrigendum"
                          >
                            <FileCheck size={13} />
                            <span>Corrigendum</span>
                          </a>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className={`type-pill ${tender.tender_type}`}>
                        {tender.tender_type === 'live' ? 'Live' : 'Past'}
                      </span>
                    </td>

                    <td>
                      <span className="date-text">
                        {tender.submission_date || '—'}
                      </span>
                    </td>

                    <td>
                      <StatusBadge
                        status={tender.status}
                        hasUnpublishedDraft={tender.has_unpublished_draft}
                      />
                    </td>

                    <td>
                      <div className="action-buttons-cell">
                        {/* Edit Draft */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Edit Working Draft"
                          onClick={() => openEditModal(tender)}
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Publish */}
                        {tender.status !== 'published' || tender.has_unpublished_draft ? (
                          <button
                            type="button"
                            className="action-icon-btn publish"
                            title="Publish to Live Website"
                            onClick={() => setConfirmPublishId(tender.id)}
                          >
                            <Send size={16} />
                          </button>
                        ) : null}

                        {/* Archive */}
                        {tender.status !== 'archived' && (
                          <button
                            type="button"
                            className="action-icon-btn archive"
                            title="Archive Tender"
                            onClick={() => setConfirmArchiveId(tender.id)}
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
                            onClick={() => setConfirmDeleteId(tender.id)}
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
            onPageChange={(newPage) => fetchTendersList(newPage)}
            disabled={loading}
          />
        </div>
      )}

      {/* ── CREATE E-TENDER MODAL ──────────────────────────────────────────── */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => !formSubmitting && setIsCreateOpen(false)}
        title="Create E-Tender"
        subtitle="This will save a new tender draft. You can attach tender documents and corrigendums."
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
                Tender Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. GeM bid for Provisioning of Underground Water Tank"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tender Number / GeM Bid Ref</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. GEM/2026/B/7343247"
                value={formTenderNumber}
                onChange={(e) => setFormTenderNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tender Type</label>
              <select
                className="form-input"
                value={formType}
                onChange={(e) => setFormType(e.target.value as 'live' | 'past')}
              >
                <option value="live">Live Tender</option>
                <option value="past">Past / Closed Tender</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Submission Date / Deadline</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 02-04-2026 - 13:30 or 15th September 2026"
                value={formSubmissionDate}
                onChange={(e) => setFormSubmissionDate(e.target.value)}
              />
            </div>

            <FileUploadInput
              value={formFileUrl}
              onChange={setFormFileUrl}
              context="etenders"
              label="Tender Document (PDF)"
              placeholder="/assets/etenders/tender-spec.pdf"
            />

            <FileUploadInput
              value={formCorrigendumUrl}
              onChange={setFormCorrigendumUrl}
              context="etenders"
              label="Corrigendum Document (Optional)"
              placeholder="/assets/etenders/corrigendum.pdf"
            />
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

      {/* ── EDIT E-TENDER DRAFT MODAL ───────────────────────────────────────── */}
      <Modal
        isOpen={!!editingTender}
        onClose={() => !formSubmitting && setEditingTender(null)}
        title="Edit E-Tender Draft"
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
            <strong>Working-Copy Draft Engine:</strong> Updating draft fields preserves live tender notices until published.
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Tender Title <span className="required-star">*</span>
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
              <label className="form-label">Tender Number / GeM Bid Ref</label>
              <input
                type="text"
                className="form-input"
                value={formTenderNumber}
                onChange={(e) => setFormTenderNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tender Type</label>
              <select
                className="form-input"
                value={formType}
                onChange={(e) => setFormType(e.target.value as 'live' | 'past')}
              >
                <option value="live">Live Tender</option>
                <option value="past">Past / Closed Tender</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Submission Date / Deadline</label>
              <input
                type="text"
                className="form-input"
                value={formSubmissionDate}
                onChange={(e) => setFormSubmissionDate(e.target.value)}
              />
            </div>

            <FileUploadInput
              value={formFileUrl}
              onChange={setFormFileUrl}
              context="etenders"
              label="Tender Document (PDF)"
              placeholder="/assets/etenders/tender-spec.pdf"
            />

            <FileUploadInput
              value={formCorrigendumUrl}
              onChange={setFormCorrigendumUrl}
              context="etenders"
              label="Corrigendum Document (Optional)"
              placeholder="/assets/etenders/corrigendum.pdf"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditingTender(null)}
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

      {/* ── CONFIRM PUBLISH DIALOG ─────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmPublishId}
        onClose={() => setConfirmPublishId(null)}
        onConfirm={handlePublishConfirm}
        title="Publish E-Tender"
        message="Are you sure you want to publish this e-tender? It will become visible on the official institute portal immediately."
        confirmLabel="Publish Now"
        variant="primary"
        loading={formSubmitting}
      />

      {/* ── CONFIRM ARCHIVE DIALOG ─────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmArchiveId}
        onClose={() => setConfirmArchiveId(null)}
        onConfirm={handleArchiveConfirm}
        title="Archive E-Tender"
        message="Are you sure you want to archive this e-tender? It will be marked as past."
        confirmLabel="Archive Tender"
        variant="warning"
        loading={formSubmitting}
      />

      {/* ── CONFIRM DELETE DIALOG ──────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete E-Tender Permanently"
        message="This action CANNOT be undone. The tender record and all document attachments will be permanently deleted from the database."
        confirmLabel="Delete Permanently"
        variant="danger"
        loading={formSubmitting}
      />
    </div>
  );
};
