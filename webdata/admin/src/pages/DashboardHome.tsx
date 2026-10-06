import React, { useEffect, useState } from 'react';
import {
  FileText,
  Newspaper,
  Briefcase,
  FileCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  PlusCircle,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNotices } from '../api/notices';
import { getNews } from '../api/news';
import { getCareers } from '../api/careers';
import { getEtenders } from '../api/etenders';
import { useAuth } from '../context/useAuth';
import { StatusBadge } from '../components/StatusBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface DashboardStats {
  noticesTotal: number;
  newsTotal: number;
  careersTotal: number;
  etendersTotal: number;
}

interface RecentActivityItem {
  id: string;
  resourceId: number;
  section: 'Notices' | 'News' | 'Careers' | 'E-Tenders';
  title: string;
  date: string;
  status: string;
  hasUnpublishedDraft?: boolean;
  link: string;
}

export const DashboardHome: React.FC = () => {
  const { user, isAdmin, canAccessSection } = useAuth();

  const [stats, setStats] = useState<DashboardStats>({
    noticesTotal: 0,
    newsTotal: 0,
    careersTotal: 0,
    etendersTotal: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setError(null);

        // Fetch real counts and items in parallel from live endpoints
        const [noticesRes, newsRes, careersRes, etendersRes] = await Promise.allSettled([
          getNotices({ limit: 4 }),
          getNews({ limit: 4 }),
          getCareers({ limit: 4 }),
          getEtenders({ limit: 4 }),
        ]);

        if (!isMounted) return;

        const noticesTotal = noticesRes.status === 'fulfilled' ? noticesRes.value.pagination.total : 0;
        const newsTotal = newsRes.status === 'fulfilled' ? newsRes.value.pagination.total : 0;
        const careersTotal = careersRes.status === 'fulfilled' ? careersRes.value.pagination.total : 0;
        const etendersTotal = etendersRes.status === 'fulfilled' ? etendersRes.value.pagination.total : 0;

        setStats({
          noticesTotal,
          newsTotal,
          careersTotal,
          etendersTotal,
        });

        // Collect recent items
        const combined: RecentActivityItem[] = [];

        if (noticesRes.status === 'fulfilled') {
          noticesRes.value.notices.forEach((n) => {
            combined.push({
              id: `notice-${n.id}`,
              resourceId: n.id,
              section: 'Notices',
              title: n.draft_title || n.title,
              date: n.draft_notice_date || n.notice_date,
              status: n.status,
              hasUnpublishedDraft: n.has_unpublished_draft,
              link: '/notices',
            });
          });
        }

        if (newsRes.status === 'fulfilled') {
          newsRes.value.news.forEach((n) => {
            combined.push({
              id: `news-${n.id}`,
              resourceId: n.id,
              section: 'News',
              title: n.draft_title || n.title,
              date: n.draft_news_date || n.news_date,
              status: n.status,
              hasUnpublishedDraft: n.has_unpublished_draft,
              link: '/news',
            });
          });
        }

        if (careersRes.status === 'fulfilled') {
          careersRes.value.careers.forEach((c) => {
            combined.push({
              id: `career-${c.id}`,
              resourceId: c.id,
              section: 'Careers',
              title: c.draft_title || c.title,
              date: c.post_date || c.created_at,
              status: c.status,
              hasUnpublishedDraft: c.has_unpublished_draft,
              link: '/careers',
            });
          });
        }

        if (etendersRes.status === 'fulfilled') {
          etendersRes.value.etenders.forEach((e) => {
            combined.push({
              id: `etender-${e.id}`,
              resourceId: e.id,
              section: 'E-Tenders',
              title: e.draft_title || e.title,
              date: e.created_at,
              status: e.status,
              hasUnpublishedDraft: e.has_unpublished_draft,
              link: '/etenders',
            });
          });
        }

        // Sort by date descending
        combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentItems(combined.slice(0, 8));
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Failed to load dashboard metrics';
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalContentCount =
    stats.noticesTotal + stats.newsTotal + stats.careersTotal + stats.etendersTotal;

  return (
    <div className="page">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div>
          <h1>Welcome, {user?.name || 'Administrator'}</h1>
          <p>
            IIIT Pune Content Management System — Phase 2 Live Editorial Dashboard.
          </p>
        </div>
        <div className="welcome-role-badge">
          Role: <strong>{user?.role ? user.role.toUpperCase() : 'ADMIN'}</strong>
        </div>
      </div>

      {error && (
        <div className="error-box">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper notices-bg">
            <FileText size={24} className="stat-icon notices-color" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Notices</div>
            <div className="stat-value">
              {loading ? '—' : stats.noticesTotal}
            </div>
            <Link to="/notices" className="stat-link">
              <span>Manage Notices</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper news-bg">
            <Newspaper size={24} className="stat-icon news-color" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total News Items</div>
            <div className="stat-value">
              {loading ? '—' : stats.newsTotal}
            </div>
            <Link to="/news" className="stat-link">
              <span>Manage News</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper careers-bg">
            <Briefcase size={24} className="stat-icon careers-color" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Careers</div>
            <div className="stat-value">
              {loading ? '—' : stats.careersTotal}
            </div>
            <Link to="/careers" className="stat-link">
              <span>Manage Careers</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper etenders-bg">
            <FileCheck size={24} className="stat-icon etenders-color" />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total E-Tenders</div>
            <div className="stat-value">
              {loading ? '—' : stats.etendersTotal}
            </div>
            <Link to="/etenders" className="stat-link">
              <span>Manage E-Tenders</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Updates Section */}
      <div className="dashboard-columns">
        {/* Recent Updates Table */}
        <div className="dashboard-main-col">
          <div className="section-card">
            <div className="section-card-header">
              <div className="section-card-title-group">
                <Clock size={18} className="text-muted" />
                <h2>Recent Content Updates</h2>
              </div>
              <span className="badge-count">{totalContentCount} items total</span>
            </div>

            {loading ? (
              <LoadingSpinner message="Loading recent activities..." />
            ) : recentItems.length === 0 ? (
              <div className="empty-state-small">No recent updates found.</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className={`section-tag section-tag-${item.section.toLowerCase().replace('-', '')}`}>
                          {item.section}
                        </span>
                      </td>
                      <td>
                        <div className="row-main-title truncate-title">{item.title}</div>
                      </td>
                      <td>
                        <span className="date-text">
                          {item.date ? new Date(item.date).toLocaleDateString() : '—'}
                        </span>
                      </td>
                      <td>
                        <StatusBadge
                          status={item.status}
                          hasUnpublishedDraft={item.hasUnpublishedDraft}
                        />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link to={item.link} className="small-button secondary">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Shortcuts & Permissions Sidebar */}
        <div className="dashboard-side-col">
          {/* Quick CMS Navigation */}
          <div className="section-card">
            <div className="section-card-header">
              <div className="section-card-title-group">
                <PlusCircle size={18} className="text-muted" />
                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions-list">
              {canAccessSection('notices') && (
                <Link to="/notices" className="quick-action-btn">
                  <FileText size={18} />
                  <span>Open Notices Manager</span>
                </Link>
              )}

              {canAccessSection('news') && (
                <Link to="/news" className="quick-action-btn">
                  <Newspaper size={18} />
                  <span>Open News Manager</span>
                </Link>
              )}

              {canAccessSection('careers') && (
                <Link to="/careers" className="quick-action-btn">
                  <Briefcase size={18} />
                  <span>Open Careers Manager</span>
                </Link>
              )}

              {canAccessSection('etenders') && (
                <Link to="/etenders" className="quick-action-btn">
                  <FileCheck size={18} />
                  <span>Open E-Tenders Manager</span>
                </Link>
              )}
            </div>
          </div>

          {/* System Status / Overview */}
          <div className="section-card mt-4">
            <div className="section-card-header">
              <div className="section-card-title-group">
                <TrendingUp size={18} className="text-muted" />
                <h2>CMS Overview</h2>
              </div>
            </div>

            <div className="overview-stats-list">
              <div className="overview-row">
                <span className="overview-label">Draft Engine</span>
                <span className="status-pill-badge active">Isolated Working-Copy</span>
              </div>
              <div className="overview-row">
                <span className="overview-label">Public Website</span>
                <span className="status-pill-badge secure">Protected / Untouched</span>
              </div>
              <div className="overview-row">
                <span className="overview-label">Media Uploader</span>
                <span className="status-pill-badge active">Active (/v1/media)</span>
              </div>
              <div className="overview-row">
                <span className="overview-label">Authorization</span>
                <span className="status-pill-badge active">{isAdmin ? 'Full Administrator' : 'Editor RBAC'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
