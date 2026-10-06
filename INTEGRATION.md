# React + Vite website integration

The CMS API can be called directly by a separately hosted React + Vite website. The main website source is not part of this repository, so configure its API URL and the backend's allowed website origins as described below.

## Configure the backend

Deploy this service on an HTTPS origin, for example `https://cms-api.iiitp.ac.in`. Set the following in the backend environment:

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=<a long, random, private secret>
CORS_ORIGIN=https://iiitp.ac.in,https://www.iiitp.ac.in
```

`CORS_ORIGIN` accepts a comma-separated list of exact origins. Include the scheme and host, and the port for local development; do not add a path or trailing slash. Set it to the actual website origin(s) that host the React app. Do not leave `*` in the production configuration.

Keep the backend database and `uploads` directory on persistent storage. The API serves uploaded profile assets under `/uploads/...` from the same backend origin.

## Configure the main Vite website

In the main website's environment file, set the backend **origin only** (no `/api` suffix). The IIITP main React + Vite site uses `VITE_FACULTY_API_BASE_URL` for the faculty CMS so it does not conflict with that site's existing `VITE_API_BASE_URL` content API:

```env
# .env.local
VITE_FACULTY_API_BASE_URL=http://localhost:3000
```

For the production build, use the deployed HTTPS API origin:

```env
# .env.production
VITE_FACULTY_API_BASE_URL=https://cms-api.iiitp.ac.in
```

Vite embeds `VITE_` variables into browser code at build time, so rebuild/redeploy the frontend after changing this value. Never put `JWT_SECRET`, database credentials, or passwords in a `VITE_` variable.

## Call the public directory

```ts
const apiBase = (
  import.meta.env.VITE_FACULTY_API_BASE_URL || 'http://localhost:3000'
).replace(/\/+$/, '');

const [faculty, departments] = await Promise.all([
  fetch(`${apiBase}/api/public/faculty`).then(response => {
    if (!response.ok) throw new Error('Unable to load faculty');
    return response.json();
  }),
  fetch(`${apiBase}/api/public/departments`).then(response => {
    if (!response.ok) throw new Error('Unable to load departments');
    return response.json();
  })
]);
```

Public profile detail is `GET /api/public/faculty/:slug`. Public API routes do not require a token. Profile photos and resume links may be relative `/uploads/...` paths; prefix those with the backend origin when rendering them from the separate website.

## Authenticated faculty profile editing

Use `POST /api/auth/login` with `{ "username": "<faculty email>", "password": "..." }`. Keep the returned token in the website's auth state and send it on protected requests:

```ts
const response = await fetch(`${apiBase}/api/faculty/me`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

Faculty accounts must change their temporary password using `POST /api/auth/change-password` before faculty services are available. `GET /api/faculty/me` and `PUT /api/faculty/me` address only the signed-in faculty member's linked profile; do not accept a faculty ID from the browser to decide whose profile is editable.

Useful routes:

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/api/health` | Public health check |
| `GET` | `/api/public/faculty` | Public directory |
| `GET` | `/api/public/departments` | Public departments |
| `GET` | `/api/public/faculty/:slug` | Public profile |
| `POST` | `/api/auth/login` | Sign-in |
| `POST` | `/api/auth/change-password` | Signed-in user |
| `GET`, `PUT` | `/api/faculty/me` | Signed-in, linked faculty member |
| `POST` | `/api/faculty/me/submit` | Signed-in, linked faculty member |
