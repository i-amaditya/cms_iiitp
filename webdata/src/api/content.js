// Normalizes backend CMS API responses to the same shape as the legacy src/data/*.json files,
// so existing page components keep working unchanged whether the data came from JSON or the API.
import { apiGet } from './client';

function formatDate(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}-${d.getFullYear()}`;
}

export async function fetchNotices() {
  const data = await apiGet('/v1/notices', { limit: 100, status: 'published' });
  return (data.notices || []).map((n) => ({
    id: n.id,
    title: n.title,
    date: formatDate(n.notice_date),
    category: n.category || '',
    link: n.link_url || n.file_url || '',
  }));
}

export async function fetchNews() {
  const data = await apiGet('/v1/news', { limit: 100, status: 'published' });
  return (data.news || []).map((n) => ({
    id: n.id,
    title: n.title,
    date: formatDate(n.news_date),
    excerpt: n.excerpt || '',
    link: n.link_url || n.file_url || '',
  }));
}

function mapCareerButton(btn) {
  return {
    label: btn.label,
    ...(btn.url ? { link: btn.url } : {}),
    ...(btn.file_url ? { file: btn.file_url } : {}),
  };
}

export async function fetchCareers() {
  const [liveData, archiveData] = await Promise.all([
    apiGet('/v1/careers', { limit: 100, type: 'live', status: 'published' }),
    apiGet('/v1/careers', { limit: 100, type: 'past', status: 'published' }),
  ]);

  const mapJob = (job) => ({
    title: job.title,
    date: formatDate(job.post_date),
    lastDate: formatDate(job.last_date),
    lastUpdate: formatDate(job.updated_at),
    buttons: (job.buttons || []).map(mapCareerButton),
  });

  return {
    live: (liveData.careers || []).map(mapJob),
    archive: (archiveData.careers || []).map(mapJob),
  };
}

function mapTender(t) {
  return {
    title: t.title,
    tenderNumber: t.tender_number || '',
    fileUrl: t.file_url || '',
    fileText: t.file_url ? 'Document' : '',
    corrigendumUrl: t.corrigendum_url || '',
    corrigendumText: t.corrigendum_url ? 'Corrigendum' : '',
    submissionDate: t.submission_date || '',
  };
}

export async function fetchEtenders() {
  const [liveData, archiveData] = await Promise.all([
    apiGet('/v1/etenders', { limit: 100, type: 'live', status: 'published' }),
    apiGet('/v1/etenders', { limit: 100, type: 'past', status: 'published' }),
  ]);

  return {
    live: (liveData.etenders || []).map(mapTender),
    archive: (archiveData.etenders || []).map(mapTender),
  };
}
