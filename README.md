# 🚀 AS Hub - Complete Web Platform

<div align="center">

![AS Hub](https://img.shields.io/badge/AS%20Hub-Production%20Ready-success?style=for-the-badge)
![Laravel](https://img.shields.io/badge/Laravel-10.x-red?style=for-the-badge&logo=laravel)
![Angular](https://img.shields.io/badge/Angular-17.x-red?style=for-the-badge&logo=angular)
![License](https://img.shields.io/badge/License-Proprietary-blue?style=for-the-badge)

**منصة ويب متكاملة ثنائية اللغة (EN/AR) مع لوحة تحكم إدارية ونظام API**

[التثبيت](#-installation) • [الاستخدام](#-usage) • [الوثائق](#-documentation) • [API](#-api-documentation)

</div>

---

## 📋 جدول المحتويات

- [نظرة عامة](#-overview)
- [المميزات](#-features)
- [المتطلبات](#-requirements)
- [التثبيت](#-installation)
- [الاستخدام](#-usage)
- [هيكل المشروع](#-project-structure)
- [API Documentation](#-api-documentation)
- [قاعدة البيانات](#-database)
- [النشر](#-deployment)
- [الوثائق](#-documentation)
- [استكشاف الأخطاء](#-troubleshooting)
- [الدعم](#-support)

---

## 🌟 Overview

AS Hub هو منصة ويب متكاملة تتضمن:
- **Backend API** (Laravel 10) - نظام API متكامل مع JWT authentication
- **Admin Panel** (Angular 17) - لوحة تحكم إدارية شاملة
- **Landing Page** (Angular 17) - صفحة هبوط احترافية
- **Database** - SQLite (تطوير) + MySQL (إنتاج)

### 🎯 الهدف
توفير حل متكامل لإدارة المحتوى والخدمات مع دعم كامل للغتين العربية والإنجليزية.

---

## ✨ Features

### 🔐 Backend API
- ✅ JWT Authentication & Authorization
- ✅ RESTful API Architecture
- ✅ CRUD Operations لجميع المحتوى
- ✅ File Upload System
- ✅ Input Validation & Sanitization
- ✅ CORS Configuration
- ✅ Rate Limiting
- ✅ Error Handling & Logging
- ✅ Database Migrations & Seeders

### 👨‍💼 Admin Panel
- ✅ **Dashboard** - إحصائيات شاملة
- ✅ **Services Management** - إدارة الخدمات
- ✅ **Pricing Management** - إدارة خطط الأسعار
- ✅ **Features Management** - إدارة المميزات
- ✅ **Testimonials Management** - إدارة آراء العملاء
- ✅ **FAQ Management** - إدارة الأسئلة الشائعة
- ✅ **Leads Management** - إدارة الرسائل مع تصدير CSV
- ✅ **Settings Management** - إدارة الإعدادات
- ✅ **Media Manager** - إدارة الملفات
- ✅ **Bilingual Support** - دعم EN/AR
- ✅ **Responsive Design** - تصميم متجاوب

### 🌐 Landing Page
- ✅ **Hero Section** - قسم رئيسي جذاب
- ✅ **Services Section** - عرض الخدمات
- ✅ **Features Section** - عرض المميزات
- ✅ **Pricing Section** - خطط الأسعار (شهري/سنوي)
- ✅ **Testimonials** - آراء العملاء
- ✅ **FAQ** - أسئلة شائعة (Accordion)
- ✅ **Contact Form** - نموذج تواصل
- ✅ **SEO Optimized** - محسّن لمحركات البحث
- ✅ **Smooth Animations** - حركات سلسة
- ✅ **Bilingual** - دعم كامل للعربية والإنجليزية

---

## 📦 Requirements

### Backend
- PHP 8.1 أو أحدث
- Composer
- MySQL 8.0+ (للإنتاج) أو SQLite (للتطوير)
- PHP Extensions: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath

### Frontend & Admin
- Node.js 18+ و npm
- Angular CLI 17+

### أدوات إضافية
- Git
- VSCode (مستحسن)

---

## 🔧 Installation

### 1️⃣ استنساخ المشروع

```bash
git clone <repository-url>
cd "AS Hub web"
```

### 2️⃣ إعداد Backend

```bash
cd backend

# تثبيت الحزم
composer install

# نسخ ملف البيئة
cp .env.example .env

# توليد مفتاح التطبيق
php artisan key:generate

# توليد مفتاح JWT
php artisan jwt:secret

# تشغيل Migrations مع البيانات التجريبية
php artisan migrate --seed

# إنشاء رابط التخزين
php artisan storage:link
```

### 3️⃣ إعداد Admin Panel

```bash
cd admin-panel

# تثبيت الحزم
npm install

# نسخ ملف البيئة
cp src/environments/environment.example.ts src/environments/environment.ts

# تحديث API URL في environment.ts
# apiUrl: 'http://localhost:8000/api'
```

### 4️⃣ إعداد Frontend

```bash
cd frontend

# تثبيت الحزم
npm install

# نسخ ملف البيئة
cp src/environments/environment.example.ts src/environments/environment.ts

# تحديث API URL في environment.ts
```

### 5️⃣ إعداد قاعدة البيانات

#### للتطوير المحلي (SQLite):
```bash
# تم إنشاؤها تلقائياً في backend/database/database.sqlite
```

#### للإنتاج (MySQL):
```bash
# إنشاء قاعدة البيانات
mysql -u root -p
CREATE DATABASE u643694170_Abood CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# تحديث .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u643694170_Abood
DB_USERNAME=u643694170_Abood
DB_PASSWORD=your_password

# تشغيل Migrations
php artisan migrate --seed
```

---

## 🚀 Usage

### الطريقة السريعة (Windows)

```bash
# اضغط دبل كليك على:
start-ashub-fixed.bat
```

### أو يدوياً:

#### 1. تشغيل Backend API

```bash
cd backend
php artisan serve
```
**يعمل على**: http://localhost:8000

#### 2. تشغيل Admin Panel

```bash
cd admin-panel
ng serve --port 4202
```
**يعمل على**: http://localhost:4202

#### 3. تشغيل Frontend (اختياري)

```bash
cd frontend
ng serve
```
**يعمل على**: http://localhost:4200

---

## 🔐 Default Credentials

### Admin Panel Login

```
URL: http://localhost:4202
Email: info@as-hub.com
Password: AboodGit commit '0595466383'
```

**⚠️ تحذير**: غيّر هذه المعلومات فوراً في بيئة الإنتاج!

---

## 📁 Project Structure

```
AS Hub web/
│
├── backend/                    # Laravel Backend API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # API Controllers
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── ContentController.php
│   │   │   │   ├── LeadController.php
│   │   │   │   └── Admin/     # Admin Controllers
│   │   │   ├── Middleware/    # Custom Middleware
│   │   │   └── Requests/      # Form Requests
│   │   ├── Models/            # Eloquent Models
│   │   └── Services/          # Business Logic
│   ├── config/                # Configuration Files
│   │   ├── auth.php
│   │   ├── cors.php
│   │   ├── database.php
│   │   └── jwt.php
│   ├── database/
│   │   ├── migrations/        # Database Migrations
│   │   ├── seeders/           # Database Seeders
│   │   └── database.sqlite    # SQLite Database
│   ├── routes/
│   │   └── api.php            # API Routes
│   ├── storage/               # File Storage
│   └── .env                   # Environment Variables
│
├── admin-panel/               # Angular Admin CMS
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/        # 8 Admin Pages
│   │   │   │   ├── dashboard/
│   │   │   │   ├── services/
│   │   │   │   ├── pricing/
│   │   │   │   ├── features/
│   │   │   │   ├── testimonials/
│   │   │   │   ├── faq/
│   │   │   │   ├── leads/
│   │   │   │   └── settings/
│   │   │   ├── services/     # API Services
│   │   │   ├── guards/       # Auth Guards
│   │   │   └── interceptors/ # HTTP Interceptors
│   │   ├── assets/
│   │   │   └── i18n/         # Translations (EN/AR)
│   │   └── environments/     # Environment Config
│   └── angular.json
│
├── frontend/                  # Angular Landing Page
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # 9 Components
│   │   │   │   ├── header/
│   │   │   │   ├── hero/
│   │   │   │   ├── services/
│   │   │   │   ├── features/
│   │   │   │   ├── pricing/
│   │   │   │   ├── testimonials/
│   │   │   │   ├── faq/
│   │   │   │   ├── contact/
│   │   │   │   └── footer/
│   │   │   └── services/     # API Services
│   │   ├── assets/
│   │   │   └── i18n/         # Translations (EN/AR)
│   │   └── environments/
│   └── angular.json
│
├── database/                  # Database Schemas
│   ├── schema.sql            # MySQL Schema
│   └── README.md
│
├── docs/                      # Documentation (auto-generated)
│
├── README.md                  # هذا الملف
├── FINAL_COMPLETE_GUIDE.md   # الدليل الشامل
├── DATABASE_ACCESS_GUIDE.md  # دليل قاعدة البيانات
├── START_HERE.md             # دليل البدء السريع
└── start-ashub-fixed.bat     # سكريبت التشغيل
```

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:8000/api
Production: https://api.ashub.com/api
```

### Authentication
جميع endpoints الإدارية تحتاج JWT token في الـ header:
```
Authorization: Bearer {token}
```

### Public Endpoints

#### 1. Get Landing Page Content
```http
GET /v1/content
```

**Response:**
```json
{
  "services": [...],
  "pricing": [...],
  "features": [...],
  "testimonials": [...],
  "faq": [...],
  "settings": {...}
}
```

#### 2. Submit Contact Form
```http
POST /leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Corp",
  "message": "Interested in your services",
  "plan": "professional"
}
```

### Authentication Endpoints

#### 1. Admin Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "info@as-hub.com",
  "password": "AboodGit commit '0595466383'"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

#### 2. Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {token}
```

#### 3. Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

#### 4. Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

### Admin Endpoints (Requires JWT)

#### Services
```http
GET    /admin/services           # List all
GET    /admin/services/{id}      # Get one
POST   /admin/services           # Create
PUT    /admin/services/{id}      # Update
DELETE /admin/services/{id}      # Delete
POST   /admin/services/{id}/toggle  # Toggle active
```

#### Pricing Plans
```http
GET    /admin/pricing
GET    /admin/pricing/{id}
POST   /admin/pricing
PUT    /admin/pricing/{id}
DELETE /admin/pricing/{id}
POST   /admin/pricing/{id}/toggle
```

#### Features
```http
GET    /admin/features
GET    /admin/features/{id}
POST   /admin/features
PUT    /admin/features/{id}
DELETE /admin/features/{id}
POST   /admin/features/{id}/toggle
```

#### Testimonials
```http
GET    /admin/testimonials
GET    /admin/testimonials/{id}
POST   /admin/testimonials
PUT    /admin/testimonials/{id}
DELETE /admin/testimonials/{id}
POST   /admin/testimonials/{id}/toggle
```

#### FAQ
```http
GET    /admin/faq
GET    /admin/faq/{id}
POST   /admin/faq
PUT    /admin/faq/{id}
DELETE /admin/faq/{id}
POST   /admin/faq/{id}/toggle
```

#### Settings
```http
GET    /admin/settings           # Get all settings
PUT    /admin/settings           # Update settings
GET    /admin/settings/{key}     # Get specific setting
```

#### Media Upload
```http
POST   /admin/media-upload
Content-Type: multipart/form-data

file: [binary]
alt_text: "Image description"
title: "Image title"
```

#### Leads Management
```http
GET    /admin/leads              # List all leads
GET    /admin/leads/{id}         # Get one lead
PUT    /admin/leads/{id}         # Update lead
DELETE /admin/leads/{id}         # Delete lead
POST   /admin/leads/{id}/process # Mark as processed
GET    /admin/leads/export       # Export to CSV
```

#### Dashboard Stats
```http
GET    /admin/dashboard/stats
```

**Response:**
```json
{
  "total_leads": 10,
  "new_leads": 5,
  "processed_leads": 5,
  "total_services": 10,
  "total_testimonials": 4
}
```

### Error Responses

```json
{
  "message": "Error message",
  "errors": {
    "field": ["Validation error"]
  }
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

## 💾 Database

### Tables

1. **admins** - Admin users
2. **services** - Services (EN/AR)
3. **pricing_plans** - Pricing plans
4. **features** - Platform features
5. **testimonials** - Client testimonials
6. **faq** - FAQ items
7. **leads** - Contact form submissions
8. **settings** - Site settings
9. **media** - Uploaded files
10. **personal_access_tokens** - JWT tokens
11. **migrations** - Migration history

### Database Access

#### 1. DB Browser for SQLite (GUI)
```bash
# Download from: https://sqlitebrowser.org/dl/
# Open: backend/database/database.sqlite
```

#### 2. Laravel Tinker (CLI)
```bash
cd backend
php artisan tinker

# Examples:
App\Models\Admin::all()
App\Models\Service::where('language', 'en')->get()
App\Models\Lead::latest()->take(5)->get()
```

#### 3. Custom PHP Script
```bash
cd backend
php view-database.php
```

#### 4. VSCode Extension
- Install "SQLite Viewer" extension
- Open `backend/database/database.sqlite`

### Sample Data

البيانات التجريبية المحملة:
- ✅ 1 Admin user
- ✅ 10 Services (5 EN + 5 AR)
- ✅ 6 Pricing plans (3 EN + 3 AR)
- ✅ 12 Features (6 EN + 6 AR)
- ✅ 4 Testimonials (2 EN + 2 AR)
- ✅ 8 FAQ items (4 EN + 4 AR)
- ✅ 18 Settings

---

## 🌐 Deployment

### Backend (Laravel)

#### 1. Prepare for Production
```bash
cd backend

# Install dependencies
composer install --optimize-autoloader --no-dev

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chmod -R 755 storage bootstrap/cache
```

#### 2. Environment Configuration
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.ashub.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=u643694170_Abood
DB_USERNAME=u643694170_Abood
DB_PASSWORD=your_secure_password

JWT_SECRET=your_secure_jwt_secret
```

#### 3. Apache Configuration
```apache
<VirtualHost *:80>
    ServerName api.ashub.com
    DocumentRoot /var/www/backend/public

    <Directory /var/www/backend/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/ashub-error.log
    CustomLog ${APACHE_LOG_DIR}/ashub-access.log combined
</VirtualHost>
```

#### 4. Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.ashub.com;
    root /var/www/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf8mb4;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Frontend & Admin Panel

#### 1. Build for Production
```bash
# Admin Panel
cd admin-panel
ng build --configuration production

# Frontend
cd frontend
ng build --configuration production
```

#### 2. Deploy
```bash
# Upload dist/ folders to hosting
# Admin Panel -> /admin
# Frontend -> /
```

#### 3. Update Environment
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.ashub.com/api'
};
```

---

## 📚 Documentation

### Available Guides

1. **README.md** (هذا الملف) - الوثائق الرئيسية
2. **FINAL_COMPLETE_GUIDE.md** - دليل شامل بالعربية
3. **DATABASE_ACCESS_GUIDE.md** - دليل الوصول لقاعدة البيانات
4. **START_HERE.md** - دليل البدء السريع
5. **ADMIN_LOGIN_CREDENTIALS.md** - معلومات تسجيل الدخول

### Component Documentation

- **Backend**: `backend/README.md`
- **Admin Panel**: `admin-panel/README.md`
- **Frontend**: `frontend/README.md`
- **Database**: `database/README.md`

---

## 🔧 Troubleshooting

### Backend Issues

#### Problem: Server won't start
```bash
cd backend
php complete-fix.php
php artisan serve
```

#### Problem: Database errors
```bash
cd backend
php artisan migrate:fresh --seed
```

#### Problem: Cache issues
```bash
cd backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

#### Problem: Permission errors
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Admin Panel Issues

#### Problem: Can't login
```bash
cd backend
php test-login.php
```

#### Problem: API connection failed
- Check `src/environments/environment.ts`
- Verify `apiUrl` is correct
- Ensure backend is running

#### Problem: Build errors
```bash
cd admin-panel
rm -rf node_modules package-lock.json
npm install
ng serve --port 4202
```

### Database Issues

#### Problem: Can't access database
```bash
cd backend
php view-database.php
```

#### Problem: Admin user not found
```bash
cd backend
php create-new-admin.php
```

#### Problem: Password doesn't work
```bash
cd backend
php reset-password.php
```

---

## 🛠️ Development Tools

### Useful Commands

#### Backend
```bash
# Run tests
php artisan test

# Generate API documentation
php artisan l5-swagger:generate

# Create new controller
php artisan make:controller Admin/NewController

# Create new model
php artisan make:model NewModel -m

# Create new migration
php artisan make:migration create_new_table

# Run specific migration
php artisan migrate --path=/database/migrations/filename.php

# Rollback migration
php artisan migrate:rollback

# Fresh install
php artisan migrate:fresh --seed
```

#### Frontend/Admin
```bash
# Generate component
ng generate component components/new-component

# Generate service
ng generate service services/new-service

# Generate guard
ng generate guard guards/new-guard

# Run tests
ng test

# Build for production
ng build --configuration production

# Analyze bundle size
ng build --stats-json
```

### Helper Scripts

#### Backend Scripts
- `complete-fix.php` - Fix all issues
- `view-database.php` - View database content
- `test-login.php` - Test authentication
- `create-new-admin.php` - Create admin user
- `reset-password.php` - Reset password

#### Root Scripts
- `start-ashub-fixed.bat` - Start all services
- `setup-project.bat` - Setup project

---

## 🎨 Brand Colors

```scss
// Primary Colors
$primary-blue: #1e3a8a;      // Dark Blue
$secondary-blue: #3b82f6;    // Blue
$accent-blue: #0ea5e9;       // Sky Blue

// Background
$background: #ffffff;         // White
$background-light: #f9fafb;  // Light Gray

// Text
$text-dark: #1f2937;         // Dark Gray
$text-light: #6b7280;        // Light Gray
$text-muted: #9ca3af;        // Muted Gray

// Status Colors
$success: #10b981;           // Green
$warning: #f59e0b;           // Orange
$error: #ef4444;             // Red
$info: #3b82f6;              // Blue
```

---

## 📱 Responsive Breakpoints

```scss
// Mobile First Approach
$mobile: 640px;    // Small devices
$tablet: 768px;    // Tablets
$desktop: 1024px;  // Desktops
$wide: 1280px;     // Wide screens
$ultra: 1536px;    // Ultra wide
```

---

## 🔒 Security

### Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong passwords
   - Rotate JWT secrets regularly

2. **Database**
   - Use prepared statements (Eloquent ORM)
   - Validate all inputs
   - Sanitize outputs

3. **API**
   - Enable CORS properly
   - Use rate limiting
   - Implement HTTPS in production

4. **Authentication**
   - Use bcrypt for passwords
   - Implement JWT properly
   - Set appropriate token expiration

5. **File Uploads**
   - Validate file types
   - Limit file sizes
   - Store outside public directory

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
ng test
```

### Admin Panel Tests
```bash
cd admin-panel
ng test
```

### API Testing
```bash
# Using curl
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"info@as-hub.com","password":"AboodGit commit '\''0595466383'\''"}' 
```

---

## 📊 Performance

### Optimization Tips

#### Backend
- Enable OPcache
- Use Redis for caching
- Optimize database queries
- Enable gzip compression

#### Frontend
- Lazy load modules
- Optimize images
- Use CDN for assets
- Enable AOT compilation

---

## 🤝 Contributing

هذا مشروع خاص. للمساهمة:
1. Fork المشروع
2. أنشئ branch جديد
3. Commit التغييرات
4. Push إلى Branch
5. افتح Pull Request

---

## 📄 License

هذا المشروع ملكية خاصة لـ AS Hub.  
جميع الحقوق محفوظة © 2024 AS Hub

---

## 📞 Support

### للدعم الفني:
- **Email**: support@ashub.com
- **Website**: https://ashub.com
- **Documentation**: راجع الملفات في `/docs`

### للمشاكل:
1. راجع [Troubleshooting](#-troubleshooting)
2. تحقق من الـ logs في `backend/storage/logs/`
3. شغّل `php complete-fix.php`

---

## 🎯 Quick Start Checklist

- [ ] تثبيت المتطلبات (PHP, Node.js, Composer, npm)
- [ ] استنساخ المشروع
- [ ] تثبيت حزم Backend (`composer install`)
- [ ] تثبيت حزم Admin Panel (`npm install`)
- [ ] إعداد `.env` files
- [ ] تشغيل migrations (`php artisan migrate --seed`)
- [ ] تشغيل Backend (`php artisan serve`)
- [ ] تشغيل Admin Panel (`ng serve --port 4202`)
- [ ] فتح http://localhost:4202
- [ ] تسجيل الدخول بالمعلومات الافتراضية
- [ ] تغيير كلمة المرور!

---

## 🌟 Features Roadmap

### Version 1.0 (Current) ✅
- [x] Backend API
- [x] Admin Panel
- [x] Landing Page
- [x] Authentication
- [x] Bilingual Support
- [x] Database Management

### Version 1.1 (Planned)
- [ ] Email Notifications
- [ ] Advanced Analytics
- [ ] Multi-admin Roles
- [ ] API Rate Limiting Dashboard
- [ ] Automated Backups

### Version 2.0 (Future)
- [ ] Mobile App (React Native)
- [ ] Real-time Chat Support
- [ ] Payment Gateway Integration
- [ ] Advanced Reporting
- [ ] Multi-tenancy Support

---

## 📈 Statistics

- **Total Files**: 200+
- **Lines of Code**: 15,000+
- **Components**: 17 (9 Frontend + 8 Admin)
- **API Endpoints**: 40+
- **Database Tables**: 12
- **Languages**: 2 (EN/AR)
- **Documentation Pages**: 5

---

## 🙏 Acknowledgments

تم بناء هذا المشروع باستخدام:
- [Laravel](https://laravel.com/) - PHP Framework
- [Angular](https://angular.io/) - Frontend Framework
- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [JWT Auth](https://github.com/tymondesigns/jwt-auth) - Authentication
- [ngx-translate](https://github.com/ngx-translate/core) - Internationalization

---

<div align="center">

**Built with ❤️ by AS Hub Development Team**

[⬆ Back to Top](#-as-hub---complete-web-platform)

</div>
#   A S - H u b  
 