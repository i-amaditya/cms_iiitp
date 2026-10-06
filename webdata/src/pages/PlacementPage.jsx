import { useEffect } from 'react';

const PlacementPage = () => {
  useEffect(() => {
    window.location.href = 'https://placement.iiitp.ac.in/';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Redirecting
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Placement Portal
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          You are being redirected to the official placement website.
        </p>
        <a
          href="https://placement.iiitp.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open Placement Website
        </a>
      </div>
    </div>
  );
};

export default PlacementPage;
