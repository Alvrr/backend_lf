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

2. **Create New Project**
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - Pilih repository `backend_lf`

3. **Set Environment Variables**
   Di Railway dashboard, tambahkan environment variables:
   ```
   MONGO_URI=mongodb+srv://xxalvaro158:Faridalvaro158@webservice.nb18pin.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=leaflet_notes
   NODE_ENV=production
   ```
   
   **PENTING:** Railway akan auto-generate `PORT`, jangan set manual!

4. **Deploy**
   - Railway akan otomatis build dan deploy
   - Tunggu hingga status "Active"
   - Copy URL deployment (contoh: `https://backend-lf-production.up.railway.app`)

### Cara 2: Via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set MONGO_URI="mongodb+srv://xxalvaro158:Faridalvaro158@webservice.nb18pin.mongodb.net/?retryWrites=true&w=majority"
   railway variables set DB_NAME="leaflet_notes"
   railway variables set NODE_ENV="production"
   ```

5. **Deploy**
   ```bash
   railway up
   ```

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

### Error: "Cannot connect to MongoDB"
- Cek MONGO_URI benar
- Pastikan MongoDB Atlas IP Whitelist set ke `0.0.0.0/0` (Allow from anywhere)

### Error: "Application failed to respond"
- Cek logs di Railway dashboard
- Pastikan PORT tidak di-set manual (Railway auto-generate)

### Error: "CORS Policy"
- Sudah dihandle di `server.js` dengan `origin: '*'`
- Atau ganti dengan domain frontend specific

### Error: "Build failed"
- Cek Node.js version di `package.json` engines
- Cek semua dependencies terinstall

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
