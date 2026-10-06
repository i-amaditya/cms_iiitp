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
  getNews,
  createNews,
  updateNewsDraft,
  publishNews,
  archiveNews,
  deleteNews,
} from '../api/news';
import type { News, Pagination as PaginationType, ContentStatus } from '../api/types';
import { useAuth } from '../context/useAuth';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { FileUploadInput } from '../components/FileUploadInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { AccessDenied } from '../components/AccessDenied';

export const NewsManager: React.FC = () => {
  const { isAdmin, canAccessSection } = useAuth();
  const hasAccess = canAccessSection('news');

  // List state
  const [newsList, setNewsList] = useState<News[]>([]);
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

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [confirmPublishId, setConfirmPublishId] = useState<number | null>(null);
  const [confirmArchiveId, setConfirmArchiveId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formLinkUrl, setFormLinkUrl] = useState('');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchNewsList = useCallback(
    async (pageToLoad = 1) => {
      try {
        setLoading(true);
        setListError(null);

        const res = await getNews({
          page: pageToLoad,
          limit: pagination.limit,
          search: searchQuery.trim() || undefined,
          status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
        });

        setNewsList(res.news);
        setPagination(res.pagination);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load news';
        setListError(msg);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchQuery, statusFilter]
  );

  useEffect(() => {
    let isMounted = true;
    if (hasAccess) {
      getNews({
        page: 1,
        limit: 10,
        search: searchQuery.trim() || undefined,
        status: statusFilter !== 'all' ? (statusFilter as ContentStatus) : undefined,
      })
        .then((res) => {
          if (isMounted) {
            setNewsList(res.news);
            setPagination(res.pagination);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            const msg = err instanceof Error ? err.message : 'Failed to load news';
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
  }, [hasAccess, searchQuery, statusFilter]);

  if (!hasAccess) {
    return <AccessDenied sectionName="News" />;
  }

  // ── Open Create Modal ────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setFormTitle('');
    setFormExcerpt('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormLinkUrl('');
    setFormFileUrl('');
    setFormError(null);
    setIsCreateOpen(true);
  };

  // ── Open Edit Modal ──────────────────────────────────────────────────────────
  const openEditModal = (item: News) => {
    setEditingNews(item);
    setFormTitle(item.draft_title ?? item.title);
    setFormExcerpt(item.draft_excerpt ?? item.excerpt ?? '');
    const dateVal = item.draft_news_date ?? item.news_date;
    setFormDate(dateVal ? dateVal.split('T')[0] : '');
    setFormLinkUrl(item.draft_link_url ?? item.link_url ?? '');
    setFormFileUrl(item.draft_file_url ?? item.file_url ?? '');
    setFormError(null);
  };

  // ── Handle Submit Create ─────────────────────────────────────────────────────
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('News title is required.');
      return;
    }
    if (!formDate) {
      setFormError('News date is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await createNews({
        title: formTitle.trim(),
        excerpt: formExcerpt.trim() || undefined,
        news_date: formDate,
        link_url: formLinkUrl.trim() || undefined,
        file_url: formFileUrl.trim() || undefined,
      });

      setIsCreateOpen(false);
      fetchNewsList(1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create news item';
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── Handle Submit Edit (Draft) ───────────────────────────────────────────────
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    if (!formTitle.trim()) {
      setFormError('News title is required.');
      return;
    }
    if (!formDate) {
      setFormError('News date is required.');
      return;
    }

    try {
      setFormSubmitting(true);
      setFormError(null);

      await updateNewsDraft(editingNews.id, {
        title: formTitle.trim(),
        excerpt: formExcerpt.trim() || null,
        news_date: formDate,
        link_url: formLinkUrl.trim() || null,
        file_url: formFileUrl.trim() || null,
      });

      setEditingNews(null);
      fetchNewsList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update news draft';
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
      await publishNews(confirmPublishId);
      setConfirmPublishId(null);
      fetchNewsList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish news item';
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
      await archiveNews(confirmArchiveId);
      setConfirmArchiveId(null);
      fetchNewsList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to archive news item';
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
      await deleteNews(confirmDeleteId);
      setConfirmDeleteId(null);
      fetchNewsList(pagination.page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete news item';
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
          <h1>News Manager</h1>
          <p>Publish campus highlights, student achievements, and media coverages.</p>
        </div>

        <button className="primary-button" type="button" onClick={openCreateModal}>
          <Plus size={18} />
          <span>Create News</span>
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
              placeholder="Search news by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchNewsList(1)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  fetchNewsList(1);
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

            <button
              type="button"
              className="secondary-button filter-btn"
              onClick={() => fetchNewsList(1)}
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
          <button type="button" className="retry-button" onClick={() => fetchNewsList(1)}>
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="table-card">
          <LoadingSpinner message="Loading news items..." />
        </div>
      ) : newsList.length === 0 ? (
        <div className="table-card">
          <EmptyState
            title="No news items found"
            description={
              searchQuery || statusFilter !== 'all'
                ? 'No news articles match the selected filters. Try adjusting your search query.'
                : 'Start publishing news by creating your first news draft.'
            }
            actionLabel={searchQuery || statusFilter !== 'all' ? undefined : '+ Create News'}
            onAction={openCreateModal}
          />
        </div>
      ) : (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '50%' }}>Title & Excerpt</th>
                <th style={{ width: '15%' }}>News Date</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '20%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((item) => {
                const displayTitle = item.draft_title || item.title;
                const displayExcerpt = item.draft_excerpt || item.excerpt;
                const displayDate = item.draft_news_date || item.news_date;
                const activeFileUrl = item.draft_file_url || item.file_url;
                const activeLinkUrl = item.draft_link_url || item.link_url;

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="row-main-title">{displayTitle}</div>
                      {displayExcerpt && <div className="row-excerpt">{displayExcerpt}</div>}
                      <div className="row-meta-links">
                        <span className="meta-id">ID: #{item.id}</span>
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
                      <span className="date-text">
                        {displayDate ? new Date(displayDate).toLocaleDateString() : '—'}
                      </span>
                    </td>

                    <td>
                      <StatusBadge
                        status={item.status}
                        hasUnpublishedDraft={item.has_unpublished_draft}
                      />
                    </td>

                    <td>
                      <div className="action-buttons-cell">
                        {/* Edit Draft */}
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Edit Working Draft"
                          onClick={() => openEditModal(item)}
                        >
                          <Edit2 size={16} />
                        </button>

                        {/* Publish */}
                        {item.status !== 'published' || item.has_unpublished_draft ? (
                          <button
                            type="button"
                            className="action-icon-btn publish"
                            title="Publish to Live Website"
                            onClick={() => setConfirmPublishId(item.id)}
                          >
                            <Send size={16} />
                          </button>
                        ) : null}

                        {/* Archive */}
                        {item.status !== 'archived' && (
                          <button
                            type="button"
                            className="action-icon-btn archive"
                            title="Archive News"
                            onClick={() => setConfirmArchiveId(item.id)}
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
                            onClick={() => setConfirmDeleteId(item.id)}
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
            onPageChange={(newPage) => fetchNewsList(newPage)}
            disabled={loading}
          />
        </div>
      )}

      {/* ── CREATE NEWS MODAL ──────────────────────────────────────────────── */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => !formSubmitting && setIsCreateOpen(false)}
        title="Create News Item"
        subtitle="This will save a new news article draft. You can publish it when ready."
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
                News Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. IIIT Pune Team Wins National Smart India Hackathon 2026"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Excerpt / Summary</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Brief summary or description of the news..."
                value={formExcerpt}
                onChange={(e) => setFormExcerpt(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                News Date <span className="required-star">*</span>
              </label>
              <input
                type="date"
                className="form-input"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>

            <div className="form-group">
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
              context="news"
              label="Article Attachment / Press Image / PDF"
              placeholder="/documents/news-article.pdf"
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

      {/* ── EDIT NEWS DRAFT MODAL ───────────────────────────────────────────── */}
      <Modal
        isOpen={!!editingNews}
        onClose={() => !formSubmitting && setEditingNews(null)}
        title="Edit News Draft"
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
            <strong>Working-Copy Draft Engine:</strong> Saving your edits updates the draft copy. The published article remains live until you click "Publish".
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                News Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Excerpt / Summary</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={formExcerpt}
                onChange={(e) => setFormExcerpt(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                News Date <span className="required-star">*</span>
              </label>
              <input
                type="date"
                className="form-input"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>

            <div className="form-group">
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
              context="news"
              label="Article Attachment / Press Image / PDF"
              placeholder="/documents/news-article.pdf"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditingNews(null)}
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
        title="Publish News Item"
        message="Are you sure you want to publish this news item? The latest draft will become visible immediately on the public website."
        confirmLabel="Publish Now"
        variant="primary"
        loading={formSubmitting}
      />

      {/* ── CONFIRM ARCHIVE DIALOG ─────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmArchiveId}
        onClose={() => setConfirmArchiveId(null)}
        onConfirm={handleArchiveConfirm}
        title="Archive News"
        message="Are you sure you want to archive this news item? It will be moved to the archive list."
        confirmLabel="Archive News"
        variant="warning"
        loading={formSubmitting}
      />

      {/* ── CONFIRM DELETE DIALOG ──────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete News Permanently"
        message="This action CANNOT be undone. The news article and its attachments will be permanently deleted from the database."
        confirmLabel="Delete Permanently"
        variant="danger"
        loading={formSubmitting}
      />
    </div>
  );
};
