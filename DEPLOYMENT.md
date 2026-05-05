# 🚀 Deployment Guide - TamilSign AI

Follow these steps to deploy **TamilSign AI** to production using **Render** for the backend and **Vercel** for the frontend.

## 🔗 Prerequisites
- A **GitHub** repository containing the project.
- A **Neon.tech** account with a configured PostgreSQL database.
- Accounts on [Render.com](https://render.com) and [Vercel.com](https://vercel.com).

---

## 🐍 Backend (Render)

1. **Sign in to Render** and click **New > Web Service**.
2. **Connect your repository** from GitHub.
3. **Configure the Service**:
   - **Name**: `tamilsign-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn server:app`
4. **Environment Variables**:
   Click on **Advanced** or the **Environment** tab and add:
   - `DATABASE_URL`: Your full Neon PostgreSQL connection string.
   - `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://tamilsign.vercel.app`). *You can update this after deploying the frontend.*
   - `PORT`: `10000` (Render's default).
5. **Deploy**: Render will automatically build and deploy your service.

---

## ⚛️ Frontend (Vercel)

1. **Sign in to Vercel** and click **Add New > Project**.
2. **Import your repository**.
3. **Configure the Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   Under the **Environment Variables** section, add:
   - `VITE_API_URL`: The URL of your deployed Render backend (e.g., `https://tamilsign-backend.onrender.com`).
5. **Deploy**: Click **Deploy**. Vercel will build your React application and provide a production URL.

---

## ⚙️ Post-Deployment Configuration

1. Once you have your **Vercel URL**, go back to your **Render Dashboard**.
2. Update the `FRONTEND_URL` environment variable in the backend settings with your new Vercel URL.
3. Render will redeploy to apply the CORS restriction, ensuring only your frontend can communicate with your backend.

---

## 🧪 Verification
1. Visit your Vercel URL.
2. Perform a Tamil speech translation.
3. Confirm that the ISL animations load and the history is correctly saved.
