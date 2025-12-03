import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

interface PricingPlan {
  id?: number;
  language: string;
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
  searchTerm = '';
  
  planForm!: FormGroup;
  currentPlan: PricingPlan | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadPlans();
  }

  initForm() {
    this.planForm = this.fb.group({
      language: ['en', Validators.required],
      name: ['', Validators.required],
      description: [''],
      price_monthly: [0, [Validators.required, Validators.min(0)]],
      price_yearly: [0, [Validators.required, Validators.min(0)]],
      features: this.fb.array([]),
      is_popular: [false],
      is_active: [true],
      order: [0]
    });

    // Add initial feature field
    this.addFeature();
  }

  get features(): FormArray {
    return this.planForm.get('features') as FormArray;
  }

  addFeature() {
    this.features.push(this.fb.control(''));
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
        this.plans = response.data || response || [];
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

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.plans];

    // Language filter
    if (this.selectedLanguage !== 'all') {
      filtered = filtered.filter(plan => plan.language === this.selectedLanguage);
    }

    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(term) ||
        plan.description?.toLowerCase().includes(term)
      );
    }

    // Sort by order
    filtered.sort((a, b) => (a.order || 0) - (b.order || 0));

    this.filteredPlans = filtered;
  }

  calculateSavings(plan: PricingPlan): number {
    const monthlyTotal = plan.price_monthly * 12;
    const savings = monthlyTotal - plan.price_yearly;
    return Math.max(0, Math.round(savings * 100) / 100);
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentPlan = null;
    this.resetForm();
    this.showModal = true;
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
      name: '',
      description: '',
      price_monthly: 0,
      price_yearly: 0,
      is_popular: false,
      is_active: true,
      order: 0
    });

    // Clear features array and add one empty field
    while (this.features.length > 0) {
      this.features.removeAt(0);
    }
    this.addFeature();
  }

  populateForm(plan: PricingPlan) {
    this.planForm.patchValue({
      language: plan.language,
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
        this.features.push(this.fb.control(feature));
      });
    } else {
      this.addFeature();
    }
  }

  savePlan() {
    if (this.planForm.invalid) {
      Object.keys(this.planForm.controls).forEach(key => {
        this.planForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.saving = true;
    const formValue = this.planForm.value;
    
    // Filter out empty features
    formValue.features = formValue.features.filter((f: string) => f.trim() !== '');

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
        // Show success message
        alert(this.isEditMode ? 'Pricing plan updated successfully!' : 'Pricing plan created successfully!');
      },
      error: (error) => {
        console.error('Error saving pricing plan:', error);
        this.saving = false;
        alert('Error saving pricing plan. Please try again.');
      }
    });
  }

  toggleStatus(plan: PricingPlan) {
    if (!plan.id) return;

    const updatedPlan = { ...plan, is_active: !plan.is_active };
    
    this.apiService.put(`/admin/pricing/${plan.id}`, updatedPlan).subscribe({
      next: () => {
        plan.is_active = !plan.is_active;
        alert('Status updated successfully!');
      },
      error: (error) => {
        console.error('Error updating status:', error);
        alert('Error updating status. Please try again.');
      }
    });
  }

  deletePlan(plan: PricingPlan) {
    if (!plan.id) return;

    if (!confirm('Are you sure you want to delete this pricing plan?')) {
      return;
    }

    this.apiService.delete(`/admin/pricing/${plan.id}`).subscribe({
      next: () => {
        this.loadPlans();
        alert('Pricing plan deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting pricing plan:', error);
        alert('Error deleting pricing plan. Please try again.');
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }
}
