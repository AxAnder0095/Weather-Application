# Weather Application (React.js + OpenWeatherAPI)

## Deployment (Vercel + Render)

### 1) Backend on Render

- Push your repo to GitHub.
- Render > New Web Service > connect the repo.
- Root directory: `server`
- Build command: `npm install`
- Start command: `node index.js`
- Environment variables:
	- `OPENWEATHER_API_KEY` = your OpenWeather key
- Deploy and copy the service URL, e.g. `https://your-app.onrender.com`.

### 2) Frontend on Vercel

- Vercel > New Project > import the repo.
- Root directory: project root (where `package.json` and `vite.config.js` are).
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables (Project Settings > Environment Variables):
	- `VITE_API_BASE_URL` = your Render URL, e.g. `https://your-app.onrender.com`
	- Set for Production (and Preview if you want preview deploys to work).
- Redeploy after setting env vars.

### 3) Verify

- Open the Vercel production URL and search a zip.
- In DevTools > Network, the request URL should start with your Render domain:
	- `https://your-app.onrender.com/api/weather?zip=90210`

### 4) Common fixes

- 404 on Vercel `/api/weather`: `VITE_API_BASE_URL` missing or not injected. Redeploy without build cache.
- CORS error: ensure the Render backend allows your Vercel domain.


