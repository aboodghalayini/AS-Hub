# 🔐 AS Hub - Corrected Admin Credentials

**Last Updated:** December 8, 2025  
**Status:** ✅ Verified and Tested

---

## ⚠️ IMPORTANT NOTICE

**The password in several documentation files is INCORRECT.**

❌ **WRONG:** `Admin@123`  
✅ **CORRECT:** `Admin@123456`

---

## 👤 Admin Accounts

### 1. Default Admin Account

**Use this for testing and admin panel access:**

```
Email:    admin@ashub.com
Password: Admin@123456
```

**Account Details:**
- ID: 1
- Name: Admin
- Status: Active
- Created: 2025-12-08 20:15:04

**Login Test:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ashub.com","password":"Admin@123456"}'
```

---

### 2. AS Hub Admin Account

**Alternative admin account:**

```
Email:    info@as-hub.com
Password: Abood!0595466383
```

**Account Details:**
- ID: 2
- Name: Abood
- Status: Active
- Created: 2025-12-08 20:15:04

**Login Test:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"info@as-hub.com","password":"Abood!0595466383"}'
```

---

## 🌐 Access URLs

### Admin Panel
```
URL: http://localhost:4201
Login with: admin@ashub.com / Admin@123456
```

### Frontend (Public Site)
```
URL: http://localhost:4200
No login required
```

### Backend API
```
URL: http://localhost:8000
Health Check: http://localhost:8000/api/health
```

---

## 📝 Documentation Files to Update

The following files contain the incorrect password and should be updated:

1. ✅ `COMPLETE_TESTING_GUIDE.md` - Line 13
2. ✅ `QUICK_START.md` - Line 67
3. ✅ `ADMIN_CREDENTIALS.md` - Multiple locations
4. ✅ `ADMIN_PANEL_GUIDE.md` - Login section
5. ✅ `HOW_TO_TEST_LEADS.md` - If contains login info
6. ✅ `TROUBLESHOOTING_LOGIN.md` - If contains login info

---

## 🔄 How to Change Password

If you want to change the admin password:

### Method 1: Using Artisan Tinker
```bash
cd /vercel/sandbox/backend
php artisan tinker

# In tinker:
$admin = App\Models\Admin::where('email', 'admin@ashub.com')->first();
$admin->password = Hash::make('YourNewPassword');
$admin->save();
exit
```

### Method 2: Update Seeder and Re-seed
```bash
# Edit: backend/database/seeders/AdminSeeder.php
# Change the password in the Hash::make() call

# Then run:
php artisan db:seed --class=AdminSeeder --force
```

### Method 3: Direct Database Update
```bash
mysql -u u643694170_Abood -p'Abood@0595466383' u643694170_Abood

# In MySQL:
UPDATE admins 
SET password = '$2y$10$...' 
WHERE email = 'admin@ashub.com';
```

---

## 🔐 Security Recommendations

### For Development
- ✅ Current passwords are acceptable for local development
- ✅ JWT secret is properly generated
- ✅ Password hashing is using bcrypt

### For Production
- ⚠️ **MUST CHANGE** all default passwords
- ⚠️ **MUST ENABLE** HTTPS/SSL
- ⚠️ **MUST IMPLEMENT** rate limiting on login
- ⚠️ **CONSIDER** adding 2FA (Two-Factor Authentication)
- ⚠️ **CONSIDER** IP whitelisting for admin panel
- ⚠️ **MUST UPDATE** JWT secret
- ⚠️ **MUST SET** `APP_DEBUG=false` in .env

---

## 🧪 Verification Steps

### Step 1: Verify Admin Accounts Exist
```bash
mysql -u u643694170_Abood -p'Abood@0595466383' u643694170_Abood \
  -e "SELECT id, name, email, is_active FROM admins;"
```

**Expected Output:**
```
+----+-------+-------------------+-----------+
| id | name  | email             | is_active |
+----+-------+-------------------+-----------+
|  1 | Admin | admin@ashub.com   |         1 |
|  2 | Abood | info@as-hub.com   |         1 |
+----+-------+-------------------+-----------+
```

### Step 2: Test Login via API
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ashub.com","password":"Admin@123456"}' \
  | python3 -m json.tool
```

**Expected Output:**
```json
{
  "success": true,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "expires_in": 3600,
  "admin": {
    "id": 1,
    "name": "Admin",
    "email": "admin@ashub.com",
    "avatar": null
  }
}
```

### Step 3: Test Login via Admin Panel
1. Open `http://localhost:4201` in browser
2. Enter email: `admin@ashub.com`
3. Enter password: `Admin@123456`
4. Click "Login"
5. Should redirect to dashboard

---

## 🆘 Troubleshooting

### Problem: "Invalid credentials" error

**Possible Causes:**
1. Using wrong password (`Admin@123` instead of `Admin@123456`)
2. Email typo
3. Admin account not created
4. Database not seeded

**Solution:**
```bash
# Check if admin exists
mysql -u u643694170_Abood -p'Abood@0595466383' u643694170_Abood \
  -e "SELECT * FROM admins WHERE email='admin@ashub.com';"

# If not exists, run seeder
cd /vercel/sandbox/backend
php artisan db:seed --class=AdminSeeder --force
```

### Problem: "Token expired" error

**Solution:**
```bash
# Refresh the token or login again
curl -X POST http://localhost:8000/api/auth/refresh \
  -H "Authorization: Bearer YOUR_OLD_TOKEN"
```

### Problem: Can't access admin panel

**Solution:**
```bash
# Make sure admin panel is running
cd /vercel/sandbox/admin-panel
ng serve --port 4201

# Check if port 4201 is available
lsof -i :4201
```

---

## 📞 Quick Reference

| Item | Value |
|------|-------|
| **Admin Email** | admin@ashub.com |
| **Admin Password** | Admin@123456 |
| **Admin Panel URL** | http://localhost:4201 |
| **API URL** | http://localhost:8000 |
| **Database Name** | u643694170_Abood |
| **Database User** | u643694170_Abood |
| **Database Password** | Abood@0595466383 |

---

**Document Version:** 1.0.0  
**Verified:** December 8, 2025  
**Status:** ✅ Tested and Working
