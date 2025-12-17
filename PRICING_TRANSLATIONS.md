# Pricing Page Translations - Admin Panel

## ✅ تم إضافة الترجمات التالية

### English (en.json)
```json
"pricing": {
  "title": "Pricing Plans",
  "subtitle": "Manage your pricing plans and packages",
  "add": "Add Plan",
  "edit": "Edit Plan",
  "delete": "Delete Plan",
  "name": "Plan Name",
  "namePlaceholder": "e.g., Professional Plan",
  "description": "Description",
  "descriptionPlaceholder": "Brief description of the plan",
  "priceMonthly": "Monthly Price",
  "priceYearly": "Yearly Price",
  "features": "Features",
  "featurePlaceholder": "Enter a feature",
  "addFeature": "Add Feature",
  "popular": "Popular",
  "markPopular": "Mark as Popular",
  "markActive": "Mark as Active",
  "order": "Order",
  "active": "Active",
  "month": "month",
  "year": "year",
  "save": "Save Yearly",
  "noPricing": "No Pricing Plans Yet",
  "noPricingDesc": "Create your first pricing plan to get started"
}
```

### Arabic (ar.json)
```json
"pricing": {
  "title": "خطط الأسعار",
  "subtitle": "إدارة خطط الأسعار والباقات",
  "add": "إضافة خطة",
  "edit": "تعديل خطة",
  "delete": "حذف خطة",
  "name": "اسم الخطة",
  "namePlaceholder": "مثال: الخطة الاحترافية",
  "description": "الوصف",
  "descriptionPlaceholder": "وصف مختصر للخطة",
  "priceMonthly": "السعر الشهري",
  "priceYearly": "السعر السنوي",
  "features": "المميزات",
  "featurePlaceholder": "أدخل ميزة",
  "addFeature": "إضافة ميزة",
  "popular": "الأكثر شعبية",
  "markPopular": "تعليم كالأكثر شعبية",
  "markActive": "تعليم كنشط",
  "order": "الترتيب",
  "active": "نشط",
  "month": "شهر",
  "year": "سنة",
  "save": "وفر سنوياً",
  "noPricing": "لا توجد خطط أسعار بعد",
  "noPricingDesc": "أنشئ أول خطة أسعار للبدء"
}
```

## 📝 الترجمات المطلوبة في صفحة Pricing

### Stats Cards
- Website Plans
- App Plans
- Package Plans
- Total Plans
- Active
- Popular

### Filters
- Language
- All
- English
- العربية
- Service Type
- Tier
- Basic
- Professional
- Enterprise
- Search by name or description...
- Refresh

### Quick Actions
- Showing X of Y plans
- Activate All
- Deactivate All

### Plan Cards
- Popular
- Active / Inactive
- Monthly
- Yearly
- /month
- /year
- Save X% with yearly billing
- Features (X)
- Edit
- Copy
- Delete

### Modal
- Create New Pricing Plan
- Edit Pricing Plan
- Basic Information
- Language
- Service Type
- Website Development
- Mobile App Development
- Website + App Package
- Plan Tier
- Plan Name
- Description
- Pricing Details
- Monthly Price ($)
- Yearly Price ($)
- Savings Calculator
- Customer Saves
- Plan Features
- Feature X
- Add Another Feature
- Additional Options
- Display Order
- Plan Settings
- Mark as Popular Choice
- Active (Visible to customers)
- Cancel
- Create Plan
- Update Plan
- Saving...

### Empty State
- No Pricing Plans Found
- No plans match your current filters
- Create First Plan
- Clear Filters

### Messages
- Are you sure you want to delete "X"?
- Pricing plan created successfully!
- Pricing plan updated successfully!
- Status updated successfully!
- Pricing plan deleted successfully!
- Please fill in all required fields
- Please add at least one feature
- Error saving pricing plan
- Error updating status
- Error deleting pricing plan

## 🎯 الخطوات التالية

1. ✅ تم إضافة الترجمات الأساسية في ملفات i18n
2. ⏳ يجب تحديث HTML لاستخدام translate pipe
3. ⏳ يجب إضافة الترجمات المتبقية

## 🔧 كيفية الاستخدام

في HTML:
```html
<!-- بدلاً من -->
<h1>Pricing Plans Management</h1>

<!-- استخدم -->
<h1>{{ 'pricing.title' | translate }}</h1>
```

في TypeScript:
```typescript
// بدلاً من
alert('Pricing plan created successfully!');

// استخدم
alert(this.translate.instant('pricing.createSuccess'));
```
