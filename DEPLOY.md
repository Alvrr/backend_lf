# 🚀 Panduan Deploy ke Railway

## Persiapan

### 1. Pastikan Git sudah diinit
```bash
git init
git add .
git commit -m "Ready for Railway deployment"
```

### 2. Push ke GitHub (opsional tapi recommended)
```bash
git remote add origin https://github.com/username/backend_lf.git
git branch -M main
git push -u origin main
```

## Deploy ke Railway

### Cara 1: Via Railway Dashboard (Recommended)

1. **Buka Railway.app**
   - Kunjungi https://railway.app
   - Login dengan GitHub
   - Authorize Railway untuk akses GitHub repos kamu

2. **Create New Project**
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - **Jika repo tidak muncul:** Klik "Configure GitHub App" dan grant access ke repo `backend_lf`
   - Pilih repository `backend_lf`

3. **Tunggu Initial Build**
   - Railway akan auto-detect Node.js
   - Build pertama akan berjalan

4. **Set Environment Variables**
   - Klik tab "Variables" di project
   - Klik "New Variable"
   - Tambahkan satu-per-satu:
   
   ```
   MONGO_URI = mongodb+srv://xxalvaro158:Faridalvaro158@webservice.nb18pin.mongodb.net/?retryWrites=true&w=majority
   DB_NAME = leaflet_notes
   NODE_ENV = production
   ```
   
   **PENTING:** 
   - Railway akan auto-generate `PORT`, jangan set manual!
   - Setelah add variables, Railway akan auto-redeploy

5. **Generate Domain**
   - Klik tab "Settings"
   - Scroll ke "Networking"
   - Klik "Generate Domain"
   - Copy URL (contoh: `https://backend-lf-production.up.railway.app`)

6. **Check Status**
   - Klik tab "Deployments"
   - Tunggu hingga status "Success" (warna hijau)
   - Klik tab "Logs" untuk lihat log server

### Cara 2: Deploy Empty Service Dulu (Jika Cara 1 Gagal)

**Kalau error saat pilih repo, coba ini:**

1. **Create Empty Service**
   - Di Railway Dashboard, klik "New Project"
   - Pilih "Empty Service"
   - Beri nama: `backend-lf`

2. **Connect GitHub Manual**
   - Di service yang baru dibuat, klik "Settings"
   - Scroll ke "Source"
   - Klik "Connect Repo"
   - Pilih `Alvrr/backend_lf`
   - Branch: `main`

3. **Set Environment Variables** (sama seperti Cara 1)

4. **Trigger Deploy**
   - Klik tab "Deployments"
   - Klik "Deploy" atau push commit baru ke GitHub

### Cara 3: Via Railway CLI (Alternative)

**NOTE:** Railway CLI butuh link ke project dashboard dulu.

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Create Project di Dashboard Dulu**
   - Buat empty project di https://railway.app

3. **Link dari Terminal**
   ```bash
   railway login
   railway link
   # Pilih project dari list
   ```

4. **Deploy**
   ```bash
   railway up
   ```

**Rekomendasi:** Pakai Cara 1 atau 2 (Dashboard) lebih gampang!

## Update Frontend

Setelah deploy, update URL di `frontend_lf/script.js`:

Ganti semua:
```javascript
http://localhost:5000/api/markers
```

Dengan URL Railway kamu:
```javascript
https://your-backend-url.up.railway.app/api/markers
```

## Testing

Test endpoint dengan curl atau browser:

```bash
# Health check
curl https://your-backend-url.up.railway.app/

# Get all markers
curl https://your-backend-url.up.railway.app/api/markers
```

## Troubleshooting

### Error: "Repo tidak muncul di list"
**Solusi:**
- Klik "Configure GitHub App" di Railway
- Grant access ke repository `backend_lf`
- Refresh halaman Railway

### Error: "Cannot connect to MongoDB"
**Solusi:**
1. Buka MongoDB Atlas (https://cloud.mongodb.com)
2. Pilih cluster kamu
3. Klik "Network Access" di sidebar
4. Klik "Add IP Address"
5. Klik "Allow Access from Anywhere" → `0.0.0.0/0`
6. Save
7. Redeploy di Railway

### Error: "Application failed to respond"
**Solusi:**
- Klik tab "Logs" di Railway dashboard
- Cek error message
- Pastikan `PORT` TIDAK di-set di Variables (Railway auto-generate)
- Cek MONGO_URI benar (copy paste ulang)

### Error: "CORS Policy" di frontend
**Solusi:**
- Sudah dihandle di `server.js` dengan `origin: '*'`
- Kalau masih error, coba hard refresh browser (Ctrl+Shift+R)
- Clear cache browser

### Error: "Build failed"
**Solusi:**
- Cek tab "Logs" untuk detail error
- Pastikan `package.json` tidak ada typo
- Pastikan `server.js` tidak ada syntax error
- Coba deploy ulang: Settings → Redeploy

### Error: "Module not found"
**Solusi:**
- Railway mungkin tidak install dependencies
- Cek `package.json` semua dependencies ada
- Settings → Redeploy

### Error: "Connection timeout" saat akses API
**Solusi:**
- Railway mungkin masih cold start (tunggu 10-15 detik)
- Cek status deployment: harus "Success" hijau
- Generate domain kalau belum: Settings → Networking → Generate Domain

## Monitoring

- Buka Railway Dashboard
- Klik project kamu
- Tab "Deployments" untuk lihat history
- Tab "Metrics" untuk lihat CPU/Memory usage
- Tab "Logs" untuk debugging

## Update Code

Setelah update code:
```bash
git add .
git commit -m "Update feature"
git push
```

Railway akan auto-deploy perubahan!

---

## Environment Variables di Railway

Pastikan set ini di Railway Dashboard > Variables:

| Variable | Value |
|----------|-------|
| MONGO_URI | mongodb+srv://xxalvaro158:Faridalvaro158@webservice.nb18pin.mongodb.net/?retryWrites=true&w=majority |
| DB_NAME | leaflet_notes |
| NODE_ENV | production |

**Jangan set PORT** - Railway akan auto-generate!

---

✅ Backend siap production!
