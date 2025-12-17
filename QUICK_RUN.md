# 🚀 AS Hub - دليل التشغيل السريع

**آخر تحديث:** 8 ديسمبر 2025

---

## ⚡ التشغيل السريع (3 خطوات)

### الخطوة 1: Backend 🔧
```bash
cd backend
php artisan serve
```
✅ **Backend يعمل على:** http://localhost:8000

---

### الخطوة 2: Frontend 🎨
```bash
# في terminal جديد
cd frontend
npm start
```
✅ **Frontend يعمل على:** http://localhost:4200

---

### الخطوة 3: Admin Panel 👨‍💼
```bash
# في terminal جديد
cd admin-panel
npm start
```
✅ **Admin Panel يعمل على:** http://localhost:4201

---

## 🔐 بيانات الدخول

### Admin Panel
```
Email: admin@ashub.com
Password: Admin@123
```

---

## 📊 الروابط السريعة

| الخدمة | الرابط | الحالة |
|--------|--------|--------|
| **Backend API** | http://localhost:8000 | ✅ جاهز |
| **API Health** | http://localhost:8000/api/health | ✅ جاهز |
| **API Content (EN)** | http://localhost:8000/api/v1/content?language=en | ✅ جاهز |
| **API Content (AR)** | http://localhost:8000/api/v1/content?language=ar | ✅ جاهز |
| **Frontend** | http://localhost:4200 | ✅ جاهز |
| **Admin Panel** | http://localhost:4201 | ✅ جاهز |
| **Admin Login** | http://localhost:4201/login | ✅ جاهز |

---

## 🧪 اختبار سريع

### 1. اختبار Backend
```bash
# Health Check
curl http://localhost:8000/api/health

# يجب أن يرجع:
# {"status":"ok","message":"API is running"}
```

### 2. اختبار Frontend
1. افتح http://localhost:4200
2. يجب أن ترى:
   - ✅ Hero Section مع تأثيرات متحركة
   - ✅ Services Section مع البطاقات
   - ✅ زر تبديل اللغة (EN/AR)

### 3. اختبار Admin Panel
1. افتح http://localhost:4201
2. سجل دخول بالبيانات أعلاه
3. يجب أن ترى:
   - ✅ Dashboard مع الإحصائيات
   - ✅ Sidebar مع القوائم
   - ✅ Pricing Management

---

## 🛠️ إعداد أولي (مرة واحدة فقط)

### إذا كانت هذه أول مرة:

#### 1. Backend Setup
```bash
cd backend

# تثبيت dependencies
composer install

# توليد مفاتيح
php artisan key:generate
php artisan jwt:secret

# تشغيل migrations والبيانات التجريبية
php artisan migrate:fresh --seed

# تشغيل السيرفر
php artisan serve
```

#### 2. Frontend Setup
```bash
cd frontend

# تثبيت dependencies
npm install

# تشغيل السيرفر
npm start
```

#### 3. Admin Panel Setup
```bash
cd admin-panel

# تثبيت dependencies
npm install

# تشغيل السيرفر
npm start
```

---

## 🔄 إعادة تشغيل البيانات

### إذا أردت إعادة تعيين قاعدة البيانات:
```bash
cd backend
php artisan migrate:fresh --seed
```

هذا سيحذف جميع البيانات ويعيد إنشاء:
- ✅ 1 Admin user
- ✅ 10 Services (5 EN + 5 AR)
- ✅ 6 Pricing Plans (3 EN + 3 AR)
- ✅ 12 Features (6 EN + 6 AR)
- ✅ 4 Testimonials (2 EN + 2 AR)
- ✅ 8 FAQ (4 EN + 4 AR)
- ✅ 18 Settings

---

## 🐛 حل المشاكل الشائعة

### ❌ Backend لا يعمل

**المشكلة:** `php: command not found`
```bash
# تثبيت PHP (Amazon Linux 2023)
sudo dnf install php php-cli php-mbstring php-xml php-pdo php-mysql
```

**المشكلة:** `composer: command not found`
```bash
# تثبيت Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

**المشكلة:** `Database connection error`
```bash
# تحقق من ملف .env
cd backend
cat .env | grep DB_

# يجب أن يكون:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=u643694170_Abood
# DB_USERNAME=u643694170_Abood
# DB_PASSWORD=Abood@0595466383
```

---

### ❌ Frontend لا يعمل

**المشكلة:** `npm: command not found`
```bash
# تثبيت Node.js (Amazon Linux 2023)
sudo dnf install nodejs npm
```

**المشكلة:** `node_modules not found`
```bash
cd frontend
npm install
```

**المشكلة:** `Cannot find module '@angular/core'`
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ CORS Error

**المشكلة:** `Access-Control-Allow-Origin error`

**الحل:**
```bash
cd backend
# تحقق من config/cors.php
# يجب أن يحتوي على:
# 'allowed_origins' => ['http://localhost:4200', 'http://localhost:4201']
```

---

### ❌ API لا يرجع بيانات

**المشكلة:** `Empty response from API`

**الحل:**
```bash
cd backend
# إعادة تشغيل migrations
php artisan migrate:fresh --seed

# مسح الـ cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

---

## 📝 ملاحظات مهمة

### Ports المستخدمة
- **8000** - Backend API
- **4200** - Frontend
- **4201** - Admin Panel

تأكد من أن هذه الـ Ports غير مستخدمة!

### تبديل اللغة
- Frontend: زر في الـ Header
- Admin Panel: زر في الـ Header
- API: parameter `?language=en` أو `?language=ar`

### البيانات التجريبية
- جميع البيانات موجودة في `backend/database/seeders/`
- يمكن تعديلها وإعادة تشغيل `php artisan db:seed`

---

## 🎯 ما يمكنك فعله الآن

### في Frontend (http://localhost:4200)
- ✅ عرض Hero Section المبهر
- ✅ عرض Services من API
- ✅ تبديل اللغة (EN/AR)
- ✅ التنقل بين الأقسام
- ⏳ عرض Pricing (قيد التحسين)
- ⏳ عرض Testimonials (قيد التحسين)
- ⏳ عرض FAQ (قيد التحسين)
- ⏳ إرسال Contact Form (قيد التحسين)

### في Admin Panel (http://localhost:4201)
- ✅ تسجيل الدخول
- ✅ عرض Dashboard
- ✅ إدارة Pricing Plans (CRUD كامل)
- ✅ تبديل اللغة
- ⏳ إدارة Services (قيد التطوير)
- ⏳ إدارة Features (قيد التطوير)
- ⏳ إدارة Testimonials (قيد التطوير)
- ⏳ إدارة FAQ (قيد التطوير)
- ⏳ عرض Leads (قيد التطوير)

---

## 🚀 الخطوات التالية

### للمطورين:
1. راجع `AS_HUB_MASTER_PLAN.md` للخطة الشاملة
2. راجع `IMPLEMENTATION_STATUS.md` لحالة التنفيذ
3. ابدأ بتحسين المكونات المتبقية

### للمستخدمين:
1. سجل دخول للـ Admin Panel
2. أضف محتوى جديد (Services, Pricing, etc.)
3. شاهد التغييرات في Frontend مباشرة

---

## 📞 الدعم

### الملفات المهمة:
- `README.md` - نظرة عامة
- `QUICK_START.md` - دليل البدء الكامل
- `AS_HUB_MASTER_PLAN.md` - الخطة الشاملة
- `IMPLEMENTATION_STATUS.md` - حالة التنفيذ
- `QUICK_RUN.md` - هذا الملف

### للمساعدة:
- 📧 Email: support@ashub.com
- 📖 Documentation: راجع الملفات أعلاه

---

## ✅ Checklist السريع

قبل البدء، تأكد من:
- [ ] PHP مثبت (php --version)
- [ ] Composer مثبت (composer --version)
- [ ] Node.js مثبت (node --version)
- [ ] npm مثبت (npm --version)
- [ ] Ports 8000, 4200, 4201 متاحة
- [ ] Backend dependencies مثبتة (composer install)
- [ ] Frontend dependencies مثبتة (npm install)
- [ ] Admin dependencies مثبتة (npm install)
- [ ] Database migrations منفذة (php artisan migrate)
- [ ] Seeders منفذة (php artisan db:seed)

---

**جاهز للانطلاق! 🎉**

**ابدأ الآن:**
```bash
# Terminal 1
cd backend && php artisan serve

# Terminal 2
cd frontend && npm start

# Terminal 3
cd admin-panel && npm start
```

**ثم افتح:** http://localhost:4200

---

**AS Hub © 2024 - Built with ❤️**
