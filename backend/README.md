# Aira Infra - Python Backend

A modern, high-performance REST API built with **FastAPI** and **Supabase** for managing the Aira Infra luxury real estate platform.

## 🚀 Features
- **Supabase Integration**: Direct database connection to Supabase project `emdvemarpmkpogifxjyj`.
- **Property Portfolio CRUD**: Public search, filtering, and admin-only add, update, delete operations.
- **Sales Leads & Site Visit CRM**: Real-time customer inquiry tracking and status pipeline.
- **Admin RBAC Authentication**: JWT tokens and role verification (Admin, Staff).
- **FastAPI OpenAPI Swagger**: Automatic interactive documentation at `http://localhost:8000/docs`.

---

## 🛠️ Installation & Setup

### 1. Create & Activate Python Virtual Environment
```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Development Server
```bash
uvicorn main:app --reload --port 8000
```
- API Root: `http://localhost:8000`
- Interactive API Docs: `http://localhost:8000/docs`

---

## 🔑 Supabase Database Setup
1. Open Supabase Dashboard SQL Editor: [https://supabase.com/dashboard/project/emdvemarpmkpogifxjyj/sql](https://supabase.com/dashboard/project/emdvemarpmkpogifxjyj/sql)
2. Execute the script in `../supabase_schema.sql` to create all tables and policies.
3. Configure your API key in `backend/.env`.
