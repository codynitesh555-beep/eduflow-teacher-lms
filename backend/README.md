# School LMS Backend

FastAPI + SQLAlchemy + PostgreSQL API with JWT teacher authentication.

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# configure DATABASE_URL and JWT_SECRET
python -m scripts.seed
uvicorn app.main:app --reload --port 8000
```

Swagger: `http://localhost:8000/docs`
Health: `http://localhost:8000/health`
