# Deploy Today

## Backend — Render
1. Push this repository to GitHub.
2. Create a Render Web Service from the repository.
3. Set Root Directory to `backend`.
4. Build: `pip install -r requirements.txt`
5. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS` and `ACCESS_TOKEN_EXPIRE_MINUTES`.
7. Create a PostgreSQL database and put its connection string in `DATABASE_URL`.
8. After deploy, run the seed command from the backend environment once: `python -m scripts.seed`.

## Frontend — Vercel
1. Import the same GitHub repository.
2. Set Root Directory to `frontend`.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `VITE_API_URL=https://YOUR-BACKEND-DOMAIN`.
7. Deploy.
8. Update backend `CORS_ORIGINS` to the exact Vercel URL and redeploy backend.

## Important
Never commit `.env`. Rotate the PostgreSQL password if the old password was ever committed or shared.
