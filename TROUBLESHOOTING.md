# ⚠️ TROUBLESHOOTING: MongoDB Connection Timeout

Error yang kamu alami: `Operation markers.find() buffering timed out after 10000ms`

## Penyebab:
Backend Railway tidak bisa connect ke MongoDB Atlas.

## Solusi:

### 1. Set Environment Variables di Railway

**Langkah:**
1. Buka https://railway.app → Project kamu
2. Klik service `backend-lf`
3. Klik tab **"Variables"**
4. Pastikan ada 3 variables ini:

```
MONGO_URI = mongodb+srv://xxalvaro158:Faridalvaro158@webservice.nb18pin.mongodb.net/?retryWrites=true&w=majority
DB_NAME = leaflet_notes
NODE_ENV = production
```

5. **Jangan set PORT** (Railway auto-generate)
6. Setelah add variables, Railway akan auto-redeploy
7. Tunggu 1-2 menit sampai deployment selesai

### 2. MongoDB Atlas: Allow Railway IP

**Langkah:**
1. Buka https://cloud.mongodb.com
2. Login ke akun kamu
3. Pilih cluster **webservice**
4. Sidebar kiri → Klik **"Network Access"**
5. Klik **"Add IP Address"**
6. Pilih **"Allow Access from Anywhere"**
7. IP: `0.0.0.0/0`
8. Comment: `Railway Access`
9. Klik **"Confirm"**

### 3. Cek Railway Logs

**Langkah:**
1. Di Railway Dashboard
2. Tab **"Logs"**
3. Cari log: `✅ MongoDB Connected to database: leaflet_notes`
4. Kalau ada log ini → Database berhasil connect!
5. Kalau masih error → Copy error message dan kasih tau

### 4. Test API Lagi

Setelah fix, test API:
```bash
# Test health
curl https://web-production-dae5b.up.railway.app/

# Test markers (harus return array, bukan error)
curl https://web-production-dae5b.up.railway.app/api/markers
```

Harusnya return: `[]` (empty array) atau data markers kalau sudah ada.

### 5. Refresh Frontend

Setelah backend fix:
1. Buka `index.html` di browser
2. Hard refresh: `Ctrl + Shift + R`
3. Marker sekarang harus bisa load!

---

## Checklist

- [ ] MONGO_URI sudah di-set di Railway Variables
- [ ] DB_NAME sudah di-set di Railway Variables  
- [ ] NODE_ENV sudah di-set di Railway Variables
- [ ] MongoDB Atlas IP Whitelist = 0.0.0.0/0
- [ ] Railway deployment status = Success (hijau)
- [ ] Railway logs show: "MongoDB Connected"
- [ ] API test return data, bukan error

Kalau sudah semua ✅, frontend akan jalan dengan sempurna! 🚀
