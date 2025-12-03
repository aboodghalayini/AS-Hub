<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Service;
use App\Models\PricingPlan;
use App\Models\Feature;
use App\Models\Testimonial;
use App\Models\Faq;
use App\Models\Setting;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        Admin::create([
            'name' => 'AS Hub Admin',
            'email' => 'info@as-hub.com',
            'password' => Hash::make("AboodGit commit '0595466383'"),
            'is_active' => true,
        ]);

        // Seed Services (English)
        $servicesEn = [
            [
                'language' => 'en',
                'title' => 'Website Development',
                'slug' => 'website-development',
                'icon' => 'globe',
                'description' => 'Professional website development tailored to your business needs',
                'features' => json_encode([
                    'Responsive Design',
                    'SEO Optimized',
                    'Fast Loading Speed',
                    'Modern UI/UX'
                ]),
                'order' => 1,
                'is_active' => true,
            ],
            [
                'language' => 'en',
                'title' => 'Mobile App Development',
                'slug' => 'mobile-app-development',
                'icon' => 'smartphone',
                'description' => 'Native and cross-platform mobile applications',
                'features' => json_encode([
                    'iOS & Android',
                    'Cross-platform Support',
                    'Push Notifications',
                    'Offline Functionality'
                ]),
                'order' => 2,
                'is_active' => true,
            ],
            [
                'language' => 'en',
                'title' => 'Web + App Package',
                'slug' => 'web-app-package',
                'icon' => 'package',
                'description' => 'Complete digital solution with website and mobile app',
                'features' => json_encode([
                    'Website + Mobile App',
                    'Unified Backend',
                    'Cost Effective',
                    'Seamless Integration'
                ]),
                'order' => 3,
                'is_active' => true,
            ],
            [
                'language' => 'en',
                'title' => 'E-commerce Solutions',
                'slug' => 'ecommerce-solutions',
                'icon' => 'shopping-cart',
                'description' => 'Full-featured online store solutions',
                'features' => json_encode([
                    'Payment Gateway Integration',
                    'Inventory Management',
                    'Order Tracking',
                    'Customer Analytics'
                ]),
                'order' => 4,
                'is_active' => true,
            ],
            [
                'language' => 'en',
                'title' => 'Management Systems',
                'slug' => 'management-systems',
                'icon' => 'settings',
                'description' => 'Custom business management and automation systems',
                'features' => json_encode([
                    'Custom Workflows',
                    'Reporting & Analytics',
                    'User Management',
                    'API Integration'
                ]),
                'order' => 5,
                'is_active' => true,
            ],
        ];

        // Seed Services (Arabic)
        $servicesAr = [
            [
                'language' => 'ar',
                'title' => 'تطوير المواقع الإلكترونية',
                'slug' => 'website-development-ar',
                'icon' => 'globe',
                'description' => 'تطوير مواقع احترافية مصممة خصيصاً لاحتياجات عملك',
                'features' => json_encode([
                    'تصميم متجاوب',
                    'محسّن لمحركات البحث',
                    'سرعة تحميل عالية',
                    'واجهة مستخدم عصرية'
                ]),
                'order' => 1,
                'is_active' => true,
            ],
            [
                'language' => 'ar',
                'title' => 'تطوير تطبيقات الجوال',
                'slug' => 'mobile-app-development-ar',
                'icon' => 'smartphone',
                'description' => 'تطبيقات جوال أصلية ومتعددة المنصات',
                'features' => json_encode([
                    'iOS و Android',
                    'دعم متعدد المنصات',
                    'إشعارات فورية',
                    'عمل بدون اتصال'
                ]),
                'order' => 2,
                'is_active' => true,
            ],
            [
                'language' => 'ar',
                'title' => 'باقة الويب والتطبيق',
                'slug' => 'web-app-package-ar',
                'icon' => 'package',
                'description' => 'حل رقمي متكامل مع موقع وتطبيق جوال',
                'features' => json_encode([
                    'موقع + تطبيق جوال',
                    'نظام خلفي موحد',
                    'فعال من حيث التكلفة',
                    'تكامل سلس'
                ]),
                'order' => 3,
                'is_active' => true,
            ],
            [
                'language' => 'ar',
                'title' => 'حلول التجارة الإلكترونية',
                'slug' => 'ecommerce-solutions-ar',
                'icon' => 'shopping-cart',
                'description' => 'حلول متاجر إلكترونية متكاملة الميزات',
                'features' => json_encode([
                    'تكامل بوابات الدفع',
                    'إدارة المخزون',
                    'تتبع الطلبات',
                    'تحليلات العملاء'
                ]),
                'order' => 4,
                'is_active' => true,
            ],
            [
                'language' => 'ar',
                'title' => 'أنظمة الإدارة',
                'slug' => 'management-systems-ar',
                'icon' => 'settings',
                'description' => 'أنظمة إدارة وأتمتة أعمال مخصصة',
                'features' => json_encode([
                    'سير عمل مخصص',
                    'تقارير وتحليلات',
                    'إدارة المستخدمين',
                    'تكامل API'
                ]),
                'order' => 5,
                'is_active' => true,
            ],
        ];

        foreach (array_merge($servicesEn, $servicesAr) as $service) {
            Service::create($service);
        }

        // Seed Pricing Plans (English)
        $pricingEn = [
            [
                'language' => 'en',
                'name' => 'Starter',
                'slug' => 'starter',
                'description' => 'Perfect for small businesses and startups',
                'price_monthly' => 20.00,
                'price_yearly' => 200.00,
                'features' => json_encode([
                    'Basic Website',
                    '5 Pages',
                    'Mobile Responsive',
                    'Basic SEO',
                    '1 Month Support'
                ]),
                'is_popular' => false,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'language' => 'en',
                'name' => 'Professional',
                'slug' => 'professional',
                'description' => 'Ideal for growing businesses',
                'price_monthly' => 50.00,
                'price_yearly' => 500.00,
                'features' => json_encode([
                    'Advanced Website',
                    'Unlimited Pages',
                    'Mobile App (iOS/Android)',
                    'Advanced SEO',
                    'E-commerce Ready',
                    '6 Months Support'
                ]),
                'is_popular' => true,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'language' => 'en',
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'description' => 'For large organizations',
                'price_monthly' => 100.00,
                'price_yearly' => 1000.00,
                'features' => json_encode([
                    'Custom Solution',
                    'Unlimited Everything',
                    'Dedicated Support',
                    'Custom Integrations',
                    'Priority Updates',
                    '12 Months Support'
                ]),
                'is_popular' => false,
                'order' => 3,
                'is_active' => true,
            ],
        ];

        // Seed Pricing Plans (Arabic)
        $pricingAr = [
            [
                'language' => 'ar',
                'name' => 'المبتدئ',
                'slug' => 'starter-ar',
                'description' => 'مثالي للشركات الصغيرة والناشئة',
                'price_monthly' => 20.00,
                'price_yearly' => 200.00,
                'features' => json_encode([
                    'موقع أساسي',
                    '5 صفحات',
                    'متجاوب مع الجوال',
                    'SEO أساسي',
                    'دعم لمدة شهر'
                ]),
                'is_popular' => false,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'language' => 'ar',
                'name' => 'المحترف',
                'slug' => 'professional-ar',
                'description' => 'مثالي للشركات النامية',
                'price_monthly' => 50.00,
                'price_yearly' => 500.00,
                'features' => json_encode([
                    'موقع متقدم',
                    'صفحات غير محدودة',
                    'تطبيق جوال (iOS/Android)',
                    'SEO متقدم',
                    'جاهز للتجارة الإلكترونية',
                    'دعم لمدة 6 أشهر'
                ]),
                'is_popular' => true,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'language' => 'ar',
                'name' => 'المؤسسات',
                'slug' => 'enterprise-ar',
                'description' => 'للمؤسسات الكبيرة',
                'price_monthly' => 100.00,
                'price_yearly' => 1000.00,
                'features' => json_encode([
                    'حل مخصص',
                    'كل شيء غير محدود',
                    'دعم مخصص',
                    'تكاملات مخصصة',
                    'تحديثات ذات أولوية',
                    'دعم لمدة 12 شهر'
                ]),
                'is_popular' => false,
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach (array_merge($pricingEn, $pricingAr) as $plan) {
            PricingPlan::create($plan);
        }

        // Seed Features (English)
        $featuresEn = [
            ['language' => 'en', 'title' => 'Easy Integration', 'description' => 'Seamlessly integrate with your existing systems', 'icon' => 'link', 'order' => 1, 'is_active' => true],
            ['language' => 'en', 'title' => 'Advanced Reports', 'description' => 'Get detailed insights with comprehensive analytics', 'icon' => 'chart-bar', 'order' => 2, 'is_active' => true],
            ['language' => 'en', 'title' => '24/7 Support', 'description' => 'Round-the-clock customer support', 'icon' => 'headset', 'order' => 3, 'is_active' => true],
            ['language' => 'en', 'title' => 'High Security', 'description' => 'Enterprise-grade security for your data', 'icon' => 'shield', 'order' => 4, 'is_active' => true],
            ['language' => 'en', 'title' => 'Scalable', 'description' => 'Grow your business without limitations', 'icon' => 'trending-up', 'order' => 5, 'is_active' => true],
            ['language' => 'en', 'title' => 'Automation', 'description' => 'Automate repetitive tasks and save time', 'icon' => 'zap', 'order' => 6, 'is_active' => true],
        ];

        // Seed Features (Arabic)
        $featuresAr = [
            ['language' => 'ar', 'title' => 'تكامل سهل', 'description' => 'تكامل سلس مع أنظمتك الحالية', 'icon' => 'link', 'order' => 1, 'is_active' => true],
            ['language' => 'ar', 'title' => 'تقارير متقدمة', 'description' => 'احصل على رؤى تفصيلية مع تحليلات شاملة', 'icon' => 'chart-bar', 'order' => 2, 'is_active' => true],
            ['language' => 'ar', 'title' => 'دعم 24/7', 'description' => 'دعم العملاء على مدار الساعة', 'icon' => 'headset', 'order' => 3, 'is_active' => true],
            ['language' => 'ar', 'title' => 'أمان عالي', 'description' => 'أمان على مستوى المؤسسات لبياناتك', 'icon' => 'shield', 'order' => 4, 'is_active' => true],
            ['language' => 'ar', 'title' => 'قابل للتوسع', 'description' => 'نمِّ عملك بدون قيود', 'icon' => 'trending-up', 'order' => 5, 'is_active' => true],
            ['language' => 'ar', 'title' => 'الأتمتة', 'description' => 'أتمتة المهام المتكررة ووفر الوقت', 'icon' => 'zap', 'order' => 6, 'is_active' => true],
        ];

        foreach (array_merge($featuresEn, $featuresAr) as $feature) {
            Feature::create($feature);
        }

        // Seed Testimonials (English)
        $testimonialsEn = [
            [
                'language' => 'en',
                'client_name' => 'John Smith',
                'client_position' => 'CEO',
                'client_company' => 'Tech Solutions Inc',
                'testimonial' => 'AS Hub delivered an exceptional website that exceeded our expectations. Their team is professional and responsive.',
                'rating' => 5,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'language' => 'en',
                'client_name' => 'Sarah Johnson',
                'client_position' => 'Marketing Director',
                'client_company' => 'Digital Marketing Pro',
                'testimonial' => 'The mobile app they developed for us has significantly improved our customer engagement. Highly recommended!',
                'rating' => 5,
                'order' => 2,
                'is_active' => true,
            ],
        ];

        // Seed Testimonials (Arabic)
        $testimonialsAr = [
            [
                'language' => 'ar',
                'client_name' => 'أحمد محمد',
                'client_position' => 'المدير التنفيذي',
                'client_company' => 'شركة التقنية المتقدمة',
                'testimonial' => 'قدم AS Hub موقعاً استثنائياً فاق توقعاتنا. فريقهم محترف ومتجاوب.',
                'rating' => 5,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'language' => 'ar',
                'client_name' => 'فاطمة علي',
                'client_position' => 'مديرة التسويق',
                'client_company' => 'التسويق الرقمي المحترف',
                'testimonial' => 'التطبيق الذي طوروه لنا حسّن بشكل كبير تفاعل عملائنا. أنصح به بشدة!',
                'rating' => 5,
                'order' => 2,
                'is_active' => true,
            ],
        ];

        foreach (array_merge($testimonialsEn, $testimonialsAr) as $testimonial) {
            Testimonial::create($testimonial);
        }

        // Seed FAQ (English)
        $faqEn = [
            ['language' => 'en', 'question' => 'How long does it take to develop a website?', 'answer' => 'Typically, a standard website takes 2-4 weeks to develop, depending on complexity and requirements.', 'category' => 'general', 'order' => 1, 'is_active' => true],
            ['language' => 'en', 'question' => 'Do you provide ongoing support?', 'answer' => 'Yes, we offer various support packages ranging from 1 month to 12 months, depending on your chosen plan.', 'category' => 'support', 'order' => 2, 'is_active' => true],
            ['language' => 'en', 'question' => 'Can I update the content myself?', 'answer' => 'Absolutely! We provide an easy-to-use admin panel where you can manage all your content without technical knowledge.', 'category' => 'technical', 'order' => 3, 'is_active' => true],
            ['language' => 'en', 'question' => 'What payment methods do you accept?', 'answer' => 'We accept all major credit cards, bank transfers, and PayPal.', 'category' => 'billing', 'order' => 4, 'is_active' => true],
        ];

        // Seed FAQ (Arabic)
        $faqAr = [
            ['language' => 'ar', 'question' => 'كم من الوقت يستغرق تطوير موقع؟', 'answer' => 'عادةً، يستغرق الموقع القياسي من 2-4 أسابيع للتطوير، حسب التعقيد والمتطلبات.', 'category' => 'general', 'order' => 1, 'is_active' => true],
            ['language' => 'ar', 'question' => 'هل تقدمون دعماً مستمراً؟', 'answer' => 'نعم، نقدم باقات دعم متنوعة تتراوح من شهر إلى 12 شهراً، حسب الخطة المختارة.', 'category' => 'support', 'order' => 2, 'is_active' => true],
            ['language' => 'ar', 'question' => 'هل يمكنني تحديث المحتوى بنفسي؟', 'answer' => 'بالتأكيد! نوفر لوحة تحكم سهلة الاستخدام حيث يمكنك إدارة كل المحتوى بدون معرفة تقنية.', 'category' => 'technical', 'order' => 3, 'is_active' => true],
            ['language' => 'ar', 'question' => 'ما هي طرق الدفع المقبولة؟', 'answer' => 'نقبل جميع بطاقات الائتمان الرئيسية، التحويلات البنكية، وPayPal.', 'category' => 'billing', 'order' => 4, 'is_active' => true],
        ];

        foreach (array_merge($faqEn, $faqAr) as $faq) {
            Faq::create($faq);
        }

        // Seed Settings
        $settings = [
            // English Settings
            ['language' => 'en', 'key' => 'site_name', 'value' => 'AS Hub', 'type' => 'text', 'group' => 'general'],
            ['language' => 'en', 'key' => 'site_tagline', 'value' => 'Your Digital Transformation Partner', 'type' => 'text', 'group' => 'general'],
            ['language' => 'en', 'key' => 'contact_email', 'value' => 'info@ashub.com', 'type' => 'text', 'group' => 'contact'],
            ['language' => 'en', 'key' => 'contact_phone', 'value' => '+1 (555) 123-4567', 'type' => 'text', 'group' => 'contact'],
            ['language' => 'en', 'key' => 'contact_address', 'value' => '123 Business St, Tech City, TC 12345', 'type' => 'text', 'group' => 'contact'],
            ['language' => 'en', 'key' => 'social_facebook', 'value' => 'https://facebook.com/ashub', 'type' => 'text', 'group' => 'social'],
            ['language' => 'en', 'key' => 'social_twitter', 'value' => 'https://twitter.com/ashub', 'type' => 'text', 'group' => 'social'],
            ['language' => 'en', 'key' => 'social_linkedin', 'value' => 'https://linkedin.com/company/ashub', 'type' => 'text', 'group' => 'social'],
            ['language' => 'en', 'key' => 'social_instagram', 'value' => 'https://instagram.com/ashub', 'type' => 'text', 'group' => 'social'],
            ['language' => 'en', 'key' => 'hero_title', 'value' => 'Transform Your Business with AS Hub', 'type' => 'text', 'group' => 'hero'],
            ['language' => 'en', 'key' => 'hero_subtitle', 'value' => 'Professional web and mobile solutions tailored to your needs', 'type' => 'text', 'group' => 'hero'],
            
            // Arabic Settings
            ['language' => 'ar', 'key' => 'site_name', 'value' => 'AS Hub', 'type' => 'text', 'group' => 'general'],
            ['language' => 'ar', 'key' => 'site_tagline', 'value' => 'شريكك في التحول الرقمي', 'type' => 'text', 'group' => 'general'],
            ['language' => 'ar', 'key' => 'contact_email', 'value' => 'info@ashub.com', 'type' => 'text', 'group' => 'contact'],
            ['language' => 'ar', 'key' => 'contact_phone', 'value' => '+1 (555) 123-4567', 'type' => 'text', 'group' => 'contact'],
            ['language' => 'ar', 'key' => 'contact_address', 'value' => '123 شارع الأعمال، مدينة التقنية، TC 12345', 'type' => 'text', 'group' => 'contact'],
            ['language' => 'ar', 'key' => 'hero_title', 'value' => 'حوّل عملك مع AS Hub', 'type' => 'text', 'group' => 'hero'],
            ['language' => 'ar', 'key' => 'hero_subtitle', 'value' => 'حلول ويب وموبايل احترافية مصممة خصيصاً لاحتياجاتك', 'type' => 'text', 'group' => 'hero'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
