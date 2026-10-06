import React, { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Send,
  Archive,
  Trash2,
  ExternalLink,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  getNotices,
  createNotice,
  updateNoticeDraft,
  publishNotice,
  archiveNotice,
  deleteNotice,
} from '../api/notices';
import type { Notice, Pagination as PaginationType, ContentStatus } from '../api/types';
import { useAuth } from '../context/useAuth';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { FileUploadInput } from '../components/FileUploadInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { AccessDenied } from '../components/AccessDenied';

export const NoticesManager: React.FC = () => {
  const { isAdmin, canAccessSection } = useAuth();
  const hasAccess = canAccessSection('notices');

  // List state
  const [notices, setNotices] = useState<Notice[]>([]);
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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [confirmPublishId, setConfirmPublishId] = useState<number | null>(null);
  const [confirmArchiveId, setConfirmArchiveId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formLinkUrl, setFormLinkUrl] = useState('');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchNoticesList = useCallback(
    async (pageToLoad = 1) => {
      try {
        setLoading(true);
        setListError(null);

        const res = await getNotices({
          page: pageToLoad,
          limit: pagination.limit,
          search: searchQuery.trim() || undefined,
          status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
          category: categoryFilter.trim() || undefined,
        });

        setNotices(res.notices);
        setPagination(res.pagination);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load notices';
        setListError(msg);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchQuery, statusFilter, categoryFilter]
  );

  useEffect(() => {
    let isMounted = true;
    if (hasAccess) {
      getNotices({
        page: 1,
        limit: 10,
        search: searchQuery.trim() || undefined,
        status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
        category: categoryFilter.trim() || undefined,
      })
        .then((res) => {
          if (isMounted) {
            setNotices(res.notices);
            setPagination(res.pagination);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            const msg = err instanceof Error ? err.message : 'Failed to load notices';
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
  }, [hasAccess, searchQuery, statusFilter, categoryFilter]);

  if (!hasAccess) {
    return <AccessDenied sectionName="Notices" />;
  }

  // ── Open Create Modal ────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setFormTitle('');
    setFormCategory('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormLinkUrl('');
    setFormFileUrl('');
    setFormError(null);
    setIsCreateOpen(true);
  };

  // ── Open Edit Modal ──────────────────────────────────────────────────────────
  const openEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setFormTitle(notice.draft_title ?? notice.title);
    setFormCategory(notice.draft_category ?? notice.category ?? '');
    const dateVal = notice.draft_notice_date ?? notice.notice_date;
    setFormDate(dateVal ? dateVal.split('T')[0] : '');
    setFormLinkUrl(notice.draft_link_url ?? notice.link_url ?? '');
    setFormFileUrl(notice.draft_file_url ?? notice.file_url ?? '');
    setFormError(null);
  };

  // ── Handle Submit Create ─────────────────────────────────────────────────────
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Notice title is required.');
      return;
    }
    if (!formDate) {
      setFormError('Notice date is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await createNotice({
        title: formTitle.trim(),
        category: formCategory.trim() || undefined,
        notice_date: formDate,
        link_url: formLinkUrl.trim() || undefined,
        file_url: formFileUrl.trim() || undefined,
      });

      setIsCreateOpen(false);
      fetchNoticesList(1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create notice';
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Submit Edit (Draft) ───────────────────────────────────────────────
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;
    if (!formTitle.trim()) {
      setFormError('Notice title is required.');
      return;
    }
    if (!formDate) {
      setFormError('Notice date is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await updateNoticeDraft(editingNotice.id, {
        title: formTitle.trim(),
        category: formCategory.trim() || null,
        notice_date: formDate,
        link_url: formLinkUrl.trim() || null,
        file_url: formFileUrl.trim() || null,
      });

      setEditingNotice(null);
      fetchNoticesList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update notice draft';
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
      await publishNotice(confirmPublishId);
      setConfirmPublishId(null);
      fetchNoticesList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish notice';
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
      await archiveNotice(confirmArchiveId);
      setConfirmArchiveId(null);
      fetchNoticesList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to archive notice';
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
      await deleteNotice(confirmDeleteId);
      setConfirmDeleteId(null);
      fetchNoticesList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete notice';
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
          <h1>Notices Manager</h1>
          <p>Create, draft, publish, and archive official announcements and circulars.</p>
        </div>

        <button className="primary-button" type="button" onClick={openCreateModal}>
          <Plus size={18} />
          <span>Create Notice</span>
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
              placeholder="Search notices by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchNoticesList(1)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  fetchNoticesList(1);
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <input
              type="text"
              className="filter-input"
              placeholder="Category (e.g. Academic)"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchNoticesList(1)}
            />

            <button
              type="button"
              className="secondary-button filter-btn"
              onClick={() => fetchNoticesList(1)}
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
          <button type="button" className="retry-button" onClick={() => fetchNoticesList(1)}>
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="table-card">
          <LoadingSpinner message="Loading notices..." />
        </div>
      ) : notices.length === 0 ? (
        <div className="table-card">
          <EmptyState
            title="No notices found"
            description={
              searchQuery || statusFilter !== 'all' || categoryFilter
                ? 'No notices match the selected filters. Try clearing your search.'
                : 'Get started by creating your first notice draft.'
            }
            actionLabel={
              searchQuery || statusFilter !== 'all' || categoryFilter ? undefined : '+ Create Notice'
            }
            onAction={openCreateModal}
          />
        </div>
      ) : (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Title & Attachments</th>
                <th style={{ width: '15%' }}>Category</th>
                <th style={{ width: '15%' }}>Notice Date</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => {
                const displayTitle = notice.draft_title || notice.title;
                const displayCategory = notice.draft_category || notice.category;
                const displayDate = notice.draft_notice_date || notice.notice_date;
                const activeFileUrl = notice.draft_file_url || notice.file_url;
                const activeLinkUrl = notice.draft_link_url || notice.link_url;

                return (
                  <tr key={notice.id}>
                    <td>
                      <div className="row-main-title">{displayTitle}</div>
                      <div className="row-meta-links">
                        <span className="meta-id">ID: #{notice.id}</span>
                        {activeFileUrl && (
                          <a
                            href={activeFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meta-link"
                          >
                            <FileText size={13} />
                            <span>PDF / File</span>
                          </a>
                        )}
                        {activeLinkUrl && (
                          <a
                            href={activeLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meta-link"
                          >
                            <ExternalLink size={13} />
                            <span>Link</span>
                          </a>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className="category-pill">{displayCategory || 'General'}</span>
                    </td>

                    <td>
                      <span className="date-text">
                        {displayDate ? new Date(displayDate).toLocaleDateString() : '—'}
                      </span>
                    </td>

                    <td>
                      <StatusBadge
                        status={notice.status}
                        hasUnpublishedDraft={notice.has_unpublished_draft}
                      />
                    </td>

                    <td>
                      <div className="action-buttons-cell">
                        {/* Edit Draft */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Edit Working Draft"
                          onClick={() => openEditModal(notice)}
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Publish */}
                        {notice.status !== 'published' || notice.has_unpublished_draft ? (
                          <button
                            type="button"
                            className="action-icon-btn publish"
                            title="Publish to Live Website"
                            onClick={() => setConfirmPublishId(notice.id)}
                          >
                            <Send size={16} />
                          </button>
                        ) : null}

                        {/* Archive */}
                        {notice.status !== 'archived' && (
                          <button
                            type="button"
                            className="action-icon-btn archive"
                            title="Archive Notice"
                            onClick={() => setConfirmArchiveId(notice.id)}
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
                            onClick={() => setConfirmDeleteId(notice.id)}
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
            onPageChange={(newPage) => fetchNoticesList(newPage)}
            disabled={loading}
          />
        </div>
      )}

      {/* ── CREATE NOTICE MODAL ────────────────────────────────────────────── */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => !formSubmitting && setIsCreateOpen(false)}
        title="Create Notice"
        subtitle="This will save a new notice draft. You can review and publish it when ready."
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
                Notice Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. Schedule for End Semester Examinations Autumn 2026"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Academic, Admissions, Clubs, General"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Notice Date <span className="required-star">*</span>
              </label>
              <input
                type="date"
                className="form-input"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">External Link URL (Optional)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={formLinkUrl}
                onChange={(e) => setFormLinkUrl(e.target.value)}
              />
            </div>

            <FileUploadInput
              value={formFileUrl}
              onChange={setFormFileUrl}
              context="notices"
              label="Document Attachment (PDF or Image)"
              placeholder="/documents/notice-file.pdf"
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

      {/* ── EDIT NOTICE DRAFT MODAL ─────────────────────────────────────────── */}
      <Modal
        isOpen={!!editingNotice}
        onClose={() => !formSubmitting && setEditingNotice(null)}
        title="Edit Notice Draft"
        subtitle="Modifications are saved to the working draft. The live website remains unchanged until you publish."
      >
        <form onSubmit={handleEditSubmit} className="cms-modal-form">
          {formError && (
            <div className="form-error-banner">
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <div className="draft-notice-banner">
            <strong>Working-Copy Draft Engine:</strong> Saving your edits updates the draft version. Click "Publish" from the notices list when you are ready to make these changes live.
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Notice Title <span className="required-star">*</span>
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
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-input"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Notice Date <span className="required-star">*</span>
              </label>
              <input
                type="date"
                className="form-input"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">External Link URL (Optional)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={formLinkUrl}
                onChange={(e) => setFormLinkUrl(e.target.value)}
              />
            </div>

            <FileUploadInput
              value={formFileUrl}
              onChange={setFormFileUrl}
              context="notices"
              label="Document Attachment (PDF or Image)"
              placeholder="/documents/notice-file.pdf"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditingNotice(null)}
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
        title="Publish Notice"
        message="Are you sure you want to publish this notice? The latest draft will become immediately visible on the public website."
        confirmLabel="Publish Now"
        variant="primary"
        loading={formSubmitting}
      />

      {/* ── CONFIRM ARCHIVE DIALOG ─────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmArchiveId}
        onClose={() => setConfirmArchiveId(null)}
        onConfirm={handleArchiveConfirm}
        title="Archive Notice"
        message="Are you sure you want to archive this notice? It will no longer appear in the active announcements list on the live site."
        confirmLabel="Archive Notice"
        variant="warning"
        loading={formSubmitting}
      />

      {/* ── CONFIRM DELETE DIALOG ──────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Notice Permanently"
        message="This action CANNOT be undone. The notice record and its references will be permanently removed from the database."
        confirmLabel="Delete Permanently"
        variant="danger"
        loading={formSubmitting}
      />
    </div>
  );
};
