import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

type ServiceType = 'website' | 'app' | 'both';
type PlanTier = 'basic' | 'professional' | 'enterprise';

interface PricingPlan {
  id?: number;
  language: string;
  service_type: ServiceType;
  tier: PlanTier;
  name: string;
  slug?: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_popular: boolean;
  order: number;
  is_active: boolean;
}

interface ServiceCategory {
  id: ServiceType;
  name: string;
  nameAr: string;
  icon: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  plans: PricingPlan[] = [];
  filteredPlans: PricingPlan[] = [];
  loading = false;
  saving = false;
  showModal = false;
  isEditMode = false;
  selectedLanguage = 'all';
  selectedServiceType: ServiceType | 'all' = 'all';
  selectedTier: PlanTier | 'all' = 'all';
  searchTerm = '';
  
  planForm!: FormGroup;
  currentPlan: PricingPlan | null = null;

  // Service categories
  serviceCategories: ServiceCategory[] = [
    { id: 'website', name: 'Website Development', nameAr: 'تطوير المواقع', icon: '🌐' },
    { id: 'app', name: 'Mobile App Development', nameAr: 'تطوير التطبيقات', icon: '📱' },
    { id: 'both', name: 'Website + App Package', nameAr: 'باقة الموقع والتطبيق', icon: '🚀' }
  ];

  // Plan tiers
  planTiers = [
    { id: 'basic', name: 'Basic', nameAr: 'أساسي' },
    { id: 'professional', name: 'Professional', nameAr: 'احترافي' },
    { id: 'enterprise', name: 'Enterprise', nameAr: 'مؤسسي' }
  ];

  // Pre-defined templates for quick plan creation
  planTemplates = {
    website: {
      basic: {
        name: 'Basic Website',
        nameAr: 'موقع أساسي',
        description: 'Perfect for small businesses and personal websites',
        descriptionAr: 'مثالي للشركات الصغيرة والمواقع الشخصية',
        price_monthly: 299,
        price_yearly: 2990,
        features: [
          'Up to 5 pages',
          'Responsive design',
          'Basic SEO optimization',
          'Contact form',
          '1 month support'
        ],
        featuresAr: [
          'حتى 5 صفحات',
          'تصميم متجاوب',
          'تحسين SEO أساسي',
          'نموذج اتصال',
          'دعم لمدة شهر'
        ]
      },
      professional: {
        name: 'Professional Website',
        nameAr: 'موقع احترافي',
        description: 'Ideal for growing businesses with advanced features',
        descriptionAr: 'مثالي للشركات النامية مع ميزات متقدمة',
        price_monthly: 599,
        price_yearly: 5990,
        features: [
          'Up to 15 pages',
          'Custom design',
          'Advanced SEO',
          'Blog integration',
          'Social media integration',
          '3 months support'
        ],
        featuresAr: [
          'حتى 15 صفحة',
          'تصميم مخصص',
          'SEO متقدم',
          'تكامل المدونة',
          'تكامل وسائل التواصل',
          'دعم لمدة 3 أشهر'
        ]
      },
      enterprise: {
        name: 'Enterprise Website',
        nameAr: 'موقع مؤسسي',
        description: 'Complete solution for large organizations',
        descriptionAr: 'حل متكامل للمؤسسات الكبيرة',
        price_monthly: 1299,
        price_yearly: 12990,
        features: [
          'Unlimited pages',
          'Premium custom design',
          'Enterprise SEO',
          'E-commerce integration',
          'Multi-language support',
          'Analytics dashboard',
          '12 months priority support'
        ],
        featuresAr: [
          'صفحات غير محدودة',
          'تصميم مخصص متميز',
          'SEO مؤسسي',
          'تكامل التجارة الإلكترونية',
          'دعم متعدد اللغات',
          'لوحة تحليلات',
          'دعم ذو أولوية لمدة 12 شهر'
        ]
      }
    },
    app: {
      basic: {
        name: 'Basic Mobile App',
        nameAr: 'تطبيق جوال أساسي',
        description: 'Simple mobile app for iOS or Android',
        descriptionAr: 'تطبيق جوال بسيط لنظام iOS أو Android',
        price_monthly: 499,
        price_yearly: 4990,
        features: [
          'Single platform (iOS or Android)',
          'Up to 5 screens',
          'Basic UI/UX design',
          'Push notifications',
          '2 months support'
        ],
        featuresAr: [
          'منصة واحدة (iOS أو Android)',
          'حتى 5 شاشات',
          'تصميم UI/UX أساسي',
          'إشعارات فورية',
          'دعم لمدة شهرين'
        ]
      },
      professional: {
        name: 'Professional Mobile App',
        nameAr: 'تطبيق جوال احترافي',
        description: 'Feature-rich app for both iOS and Android',
        descriptionAr: 'تطبيق غني بالميزات لنظامي iOS و Android',
        price_monthly: 999,
        price_yearly: 9990,
        features: [
          'Both iOS and Android',
          'Up to 15 screens',
          'Custom UI/UX design',
          'API integration',
          'Push notifications',
          'In-app purchases',
          '6 months support'
        ],
        featuresAr: [
          'iOS و Android',
          'حتى 15 شاشة',
          'تصميم UI/UX مخصص',
          'تكامل API',
          'إشعارات فورية',
          'مشتريات داخل التطبيق',
          'دعم لمدة 6 أشهر'
        ]
      },
      enterprise: {
        name: 'Enterprise Mobile App',
        nameAr: 'تطبيق جوال مؤسسي',
        description: 'Advanced mobile solution with backend',
        descriptionAr: 'حل جوال متقدم مع نظام خلفي',
        price_monthly: 1999,
        price_yearly: 19990,
        features: [
          'iOS, Android & Web',
          'Unlimited screens',
          'Premium UI/UX design',
          'Custom backend',
          'Real-time features',
          'Advanced analytics',
          'App store optimization',
          '12 months priority support'
        ],
        featuresAr: [
          'iOS و Android والويب',
          'شاشات غير محدودة',
          'تصميم UI/UX متميز',
          'نظام خلفي مخصص',
          'ميزات فورية',
          'تحليلات متقدمة',
          'تحسين متجر التطبيقات',
          'دعم ذو أولوية لمدة 12 شهر'
        ]
      }
    },
    both: {
      basic: {
        name: 'Basic Package',
        nameAr: 'باقة أساسية',
        description: 'Website + Mobile App starter package',
        descriptionAr: 'باقة بداية موقع + تطبيق جوال',
        price_monthly: 699,
        price_yearly: 6990,
        features: [
          'Basic website (5 pages)',
          'Single platform app',
          'Unified design',
          'Basic features',
          '3 months support'
        ],
        featuresAr: [
          'موقع أساسي (5 صفحات)',
          'تطبيق منصة واحدة',
          'تصميم موحد',
          'ميزات أساسية',
          'دعم لمدة 3 أشهر'
        ]
      },
      professional: {
        name: 'Professional Package',
        nameAr: 'باقة احترافية',
        description: 'Complete website and mobile app solution',
        descriptionAr: 'حل متكامل للموقع والتطبيق الجوال',
        price_monthly: 1299,
        price_yearly: 12990,
        features: [
          'Professional website',
          'iOS & Android apps',
          'Unified backend',
          'Advanced features',
          'API integration',
          '6 months support'
        ],
        featuresAr: [
          'موقع احترافي',
          'تطبيقات iOS و Android',
          'نظام خلفي موحد',
          'ميزات متقدمة',
          'تكامل API',
          'دعم لمدة 6 أشهر'
        ]
      },
      enterprise: {
        name: 'Enterprise Package',
        nameAr: 'باقة مؤسسية',
        description: 'Full-scale digital transformation solution',
        descriptionAr: 'حل تحول رقمي كامل',
        price_monthly: 2499,
        price_yearly: 24990,
        features: [
          'Enterprise website',
          'iOS, Android & Web apps',
          'Custom backend system',
          'All premium features',
          'Real-time sync',
          'Advanced analytics',
          'Dedicated support team',
          '12 months priority support'
        ],
        featuresAr: [
          'موقع مؤسسي',
          'تطبيقات iOS و Android والويب',
          'نظام خلفي مخصص',
          'جميع الميزات المتميزة',
          'مزامنة فورية',
          'تحليلات متقدمة',
          'فريق دعم مخصص',
          'دعم ذو أولوية لمدة 12 شهر'
        ]
      }
    }
  };

  useTemplate = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public translate: TranslateService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadPlans();
  }

  initForm() {
    this.planForm = this.fb.group({
      language: ['en', Validators.required],
      service_type: ['website', Validators.required],
      tier: ['basic', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price_monthly: [0, [Validators.required, Validators.min(0)]],
      price_yearly: [0, [Validators.required, Validators.min(0)]],
      features: this.fb.array([]),
      is_popular: [false],
      is_active: [true],
      order: [0]
    });

    // Add initial feature fields
    this.addFeature();
    this.addFeature();
    this.addFeature();
  }

  get features(): FormArray {
    return this.planForm.get('features') as FormArray;
  }

  addFeature() {
    this.features.push(this.fb.control('', Validators.required));
  }

  removeFeature(index: number) {
    if (this.features.length > 1) {
      this.features.removeAt(index);
    }
  }

  loadPlans() {
    this.loading = true;
    this.apiService.get('/admin/pricing').subscribe({
      next: (response: any) => {
        console.log('Pricing API Response:', response);
        
        // Handle different response formats
        if (response.data) {
          if (response.data.data) {
            this.plans = response.data.data;
          } else {
            this.plans = response.data;
          }
        } else if (Array.isArray(response)) {
          this.plans = response;
        } else {
          this.plans = [];
        }
        
        console.log('Loaded plans:', this.plans);
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading pricing plans:', error);
        this.plans = [];
        this.filteredPlans = [];
        this.loading = false;
      }
    });
  }

  refreshData() {
    this.loadPlans();
  }

  filterByLanguage(language: string) {
    this.selectedLanguage = language;
    this.applyFilters();
  }

  filterByServiceType(type: ServiceType | 'all') {
    this.selectedServiceType = type;
    this.applyFilters();
  }

  filterByTier(tier: PlanTier | 'all') {
    this.selectedTier = tier;
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.plans];

    // Language filter
    if (this.selectedLanguage !== 'all') {
      filtered = filtered.filter(plan => plan.language === this.selectedLanguage);
    }

    // Service type filter
    if (this.selectedServiceType !== 'all') {
      filtered = filtered.filter(plan => plan.service_type === this.selectedServiceType);
    }

    // Tier filter
    if (this.selectedTier !== 'all') {
      filtered = filtered.filter(plan => plan.tier === this.selectedTier);
    }

    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(term) ||
        plan.description?.toLowerCase().includes(term)
      );
    }

    // Sort by service_type, tier, and order
    filtered.sort((a, b) => {
      // First by service type
      const serviceOrder = { website: 1, app: 2, both: 3 };
      const serviceCompare = serviceOrder[a.service_type] - serviceOrder[b.service_type];
      if (serviceCompare !== 0) return serviceCompare;

      // Then by tier
      const tierOrder = { basic: 1, professional: 2, enterprise: 3 };
      const tierCompare = tierOrder[a.tier] - tierOrder[b.tier];
      if (tierCompare !== 0) return tierCompare;

      // Finally by order
      return (a.order || 0) - (b.order || 0);
    });

    this.filteredPlans = filtered;
  }

  calculateSavings(plan: PricingPlan): number {
    const monthlyTotal = plan.price_monthly * 12;
    const savings = monthlyTotal - plan.price_yearly;
    return Math.max(0, Math.round(savings * 100) / 100);
  }

  calculateSavingsPercentage(plan: PricingPlan): number {
    const monthlyTotal = plan.price_monthly * 12;
    if (monthlyTotal === 0) return 0;
    const savings = monthlyTotal - plan.price_yearly;
    return Math.round((savings / monthlyTotal) * 100);
  }

  getServiceCategoryName(type: ServiceType): string {
    const category = this.serviceCategories.find(c => c.id === type);
    return category ? category.name : type;
  }

  getTierName(tier: PlanTier): string {
    const tierObj = this.planTiers.find(t => t.id === tier);
    return tierObj ? tierObj.name : tier;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentPlan = null;
    this.useTemplate = false;
    this.resetForm();
    this.showModal = true;
  }

  // Apply template based on service type and tier
  applyTemplate() {
    const serviceType = this.planForm.get('service_type')?.value as ServiceType;
    const tier = this.planForm.get('tier')?.value as PlanTier;
    const language = this.planForm.get('language')?.value;

    if (!serviceType || !tier) return;

    const template = this.planTemplates[serviceType]?.[tier];
    if (!template) return;

    // Apply template values based on language
    const isArabic = language === 'ar';
    
    this.planForm.patchValue({
      name: isArabic ? template.nameAr : template.name,
      description: isArabic ? template.descriptionAr : template.description,
      price_monthly: template.price_monthly,
      price_yearly: template.price_yearly
    });

    // Clear and populate features
    while (this.features.length > 0) {
      this.features.removeAt(0);
    }

    const featuresToUse = isArabic ? template.featuresAr : template.features;
    featuresToUse.forEach(feature => {
      this.features.push(this.fb.control(feature, Validators.required));
    });

    this.useTemplate = true;
  }

  // Watch for changes in service type, tier, or language to suggest template
  onServiceTypeChange() {
    if (this.useTemplate || this.isEditMode) {
      this.applyTemplate();
    }
  }

  onTierChange() {
    if (this.useTemplate || this.isEditMode) {
      this.applyTemplate();
    }
  }

  onLanguageChange() {
    if (this.useTemplate) {
      this.applyTemplate();
    }
  }

  toggleTemplateMode() {
    this.useTemplate = !this.useTemplate;
    if (this.useTemplate) {
      this.applyTemplate();
    }
  }

  editPlan(plan: PricingPlan) {
    this.isEditMode = true;
    this.currentPlan = plan;
    this.populateForm(plan);
    this.showModal = true;
  }

  resetForm() {
    this.planForm.reset({
      language: 'en',
      service_type: 'website',
      tier: 'basic',
      name: '',
      description: '',
      price_monthly: 0,
      price_yearly: 0,
      is_popular: false,
      is_active: true,
      order: 0
    });

    // Clear features array and add default fields
    while (this.features.length > 0) {
      this.features.removeAt(0);
    }
    this.addFeature();
    this.addFeature();
    this.addFeature();
  }

  populateForm(plan: PricingPlan) {
    this.planForm.patchValue({
      language: plan.language,
      service_type: plan.service_type,
      tier: plan.tier,
      name: plan.name,
      description: plan.description,
      price_monthly: plan.price_monthly,
      price_yearly: plan.price_yearly,
      is_popular: plan.is_popular,
      is_active: plan.is_active,
      order: plan.order
    });

    // Populate features
    while (this.features.length > 0) {
      this.features.removeAt(0);
    }
    
    if (plan.features && plan.features.length > 0) {
      plan.features.forEach(feature => {
        this.features.push(this.fb.control(feature, Validators.required));
      });
    } else {
      this.addFeature();
      this.addFeature();
      this.addFeature();
    }
  }

  savePlan() {
    if (this.planForm.invalid) {
      Object.keys(this.planForm.controls).forEach(key => {
        this.planForm.get(key)?.markAsTouched();
      });
      this.features.controls.forEach(control => control.markAsTouched());
      alert(this.translate.instant('pricing.fillRequired'));
      return;
    }

    this.saving = true;
    const formValue = this.planForm.value;
    
    // Filter out empty features
    formValue.features = formValue.features.filter((f: string) => f && f.trim() !== '');

    if (formValue.features.length === 0) {
      alert(this.translate.instant('pricing.addOneFeature'));
      this.saving = false;
      return;
    }

    // Generate slug from name
    formValue.slug = formValue.name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const request = this.isEditMode && this.currentPlan
      ? this.apiService.put(`/admin/pricing/${this.currentPlan.id}`, formValue)
      : this.apiService.post('/admin/pricing', formValue);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.closeModal();
        this.loadPlans();
        alert(this.translate.instant(this.isEditMode ? 'pricing.updateSuccess' : 'pricing.createSuccess'));
      },
      error: (error) => {
        console.error('Error saving pricing plan:', error);
        this.saving = false;
        alert(this.translate.instant('pricing.createError') + ': ' + (error.error?.message || this.translate.instant('pricing.tryAgain')));
      }
    });
  }

  toggleStatus(plan: PricingPlan) {
    if (!plan.id) return;

    const updatedPlan = { ...plan, is_active: !plan.is_active };
    
    this.apiService.put(`/admin/pricing/${plan.id}`, updatedPlan).subscribe({
      next: () => {
        plan.is_active = !plan.is_active;
        alert(this.translate.instant('pricing.statusSuccess'));
      },
      error: (error) => {
        console.error('Error updating status:', error);
        alert(this.translate.instant('pricing.updateError') + '. ' + this.translate.instant('pricing.tryAgain'));
      }
    });
  }

  duplicatePlan(plan: PricingPlan) {
    const newPlan = {
      ...plan,
      id: undefined,
      name: plan.name + ' (Copy)',
      slug: undefined
    };
    
    this.currentPlan = null;
    this.isEditMode = false;
    this.populateForm(newPlan);
    this.showModal = true;
  }

  deletePlan(plan: PricingPlan) {
    if (!plan.id) return;

    if (!confirm(this.translate.instant('pricing.deleteConfirm') + ` "${plan.name}"?`)) {
      return;
    }

    this.apiService.delete(`/admin/pricing/${plan.id}`).subscribe({
      next: () => {
        this.loadPlans();
        alert(this.translate.instant('pricing.deleteSuccess'));
      },
      error: (error) => {
        console.error('Error deleting pricing plan:', error);
        alert(this.translate.instant('pricing.deleteError') + '. ' + this.translate.instant('pricing.tryAgain'));
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  // Helper to get plan count by category
  getPlanCountByCategory(type: ServiceType): number {
    return this.plans.filter(p => p.service_type === type).length;
  }

  // Helper to get plan count by tier
  getPlanCountByTier(tier: PlanTier): number {
    return this.plans.filter(p => p.tier === tier).length;
  }

  // Clear search term
  clearSearch() {
    this.searchTerm = '';
    this.applyFilters();
  }

  // Clear all filters
  clearAllFilters() {
    this.searchTerm = '';
    this.selectedLanguage = 'all';
    this.selectedServiceType = 'all';
    this.selectedTier = 'all';
    this.applyFilters();
  }

  // Get plans count by language
  getPlansByLanguage(language: string): number {
    return this.plans.filter(p => p.language === language).length;
  }

  // Deactivate all plans
  deactivateAll() {
    if (!confirm(this.translate.instant('pricing.confirmDeactivate'))) {
      return;
    }

    this.loading = true;
    const updatePromises = this.plans
      .filter(p => p.is_active && p.id)
      .map(p => this.apiService.put(`/admin/pricing/${p.id}`, { ...p, is_active: false }).toPromise());

    Promise.all(updatePromises).then(() => {
      this.loading = false;
      this.loadPlans();
      alert(this.translate.instant('pricing.deactivateSuccess'));
    }).catch(error => {
      console.error('Error deactivating plans:', error);
      this.loading = false;
      alert(this.translate.instant('pricing.updateError') + '. ' + this.translate.instant('pricing.tryAgain'));
    });
  }

  // Activate all plans
  activateAll() {
    if (!confirm(this.translate.instant('pricing.confirmActivate'))) {
      return;
    }

    this.loading = true;
    const updatePromises = this.plans
      .filter(p => !p.is_active && p.id)
      .map(p => this.apiService.put(`/admin/pricing/${p.id}`, { ...p, is_active: true }).toPromise());

    Promise.all(updatePromises).then(() => {
      this.loading = false;
      this.loadPlans();
      alert(this.translate.instant('pricing.activateSuccess'));
    }).catch(error => {
      console.error('Error activating plans:', error);
      this.loading = false;
      alert(this.translate.instant('pricing.updateError') + '. ' + this.translate.instant('pricing.tryAgain'));
    });
  }

  // Export plans to JSON
  exportPlans() {
    const dataStr = JSON.stringify(this.plans, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pricing-plans-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Get active plans by category
  getActivePlansByCategory(type: ServiceType): number {
    return this.plans.filter(p => p.service_type === type && p.is_active).length;
  }

  // Get popular plans count
  getPopularPlansCount(): number {
    return this.plans.filter(p => p.is_popular).length;
  }
}
