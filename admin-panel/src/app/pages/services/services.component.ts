import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

interface Service {
  id?: number;
  language: string;
  title: string;
  slug?: string;
  icon: string;
  description: string;
  features: string[];
  order: number;
  is_active: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];
  loading = false;
  saving = false;
  showModal = false;
  isEditMode = false;
  selectedLanguage = 'all';
  searchTerm = '';
  
  serviceForm!: FormGroup;
  currentService: Service | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadServices();
  }

  initForm() {
    this.serviceForm = this.fb.group({
      language: ['en', Validators.required],
      title: ['', Validators.required],
      icon: ['🛠️'],
      description: [''],
      features: this.fb.array([]),
      order: [0],
      is_active: [true]
    });

    // Add initial feature field
    this.addFeature();
  }

  get features(): FormArray {
    return this.serviceForm.get('features') as FormArray;
  }

  addFeature() {
    this.features.push(this.fb.control(''));
  }

  removeFeature(index: number) {
    if (this.features.length > 1) {
      this.features.removeAt(index);
    }
  }

  loadServices() {
    this.loading = true;
    this.apiService.get('/admin/services').subscribe({
      next: (response: any) => {
        this.services = response.data || response || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.services = [];
        this.filteredServices = [];
        this.loading = false;
      }
    });
  }

  refreshData() {
    this.loadServices();
  }

  filterByLanguage(language: string) {
    this.selectedLanguage = language;
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.services];

    // Language filter
    if (this.selectedLanguage !== 'all') {
      filtered = filtered.filter(service => service.language === this.selectedLanguage);
    }

    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(term) ||
        service.description?.toLowerCase().includes(term)
      );
    }

    // Sort by order
    filtered.sort((a, b) => (a.order || 0) - (b.order || 0));

    this.filteredServices = filtered;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentService = null;
    this.resetForm();
    this.showModal = true;
  }

  editService(service: Service) {
    this.isEditMode = true;
    this.currentService = service;
    this.populateForm(service);
    this.showModal = true;
  }

  resetForm() {
    this.serviceForm.reset({
      language: 'en',
      title: '',
      icon: '🛠️',
      description: '',
      order: 0,
      is_active: true
    });

    // Clear features array and add one empty field
    while (this.features.length > 0) {
      this.features.removeAt(0);
    }
    this.addFeature();
  }

  populateForm(service: Service) {
    this.serviceForm.patchValue({
      language: service.language,
      title: service.title,
      icon: service.icon,
      description: service.description,
      order: service.order,
      is_active: service.is_active
    });

    // Populate features
    while (this.features.length > 0) {
      this.features.removeAt(0);
    }
    
    if (service.features && service.features.length > 0) {
      service.features.forEach(feature => {
        this.features.push(this.fb.control(feature));
      });
    } else {
      this.addFeature();
    }
  }

  saveService() {
    if (this.serviceForm.invalid) {
      Object.keys(this.serviceForm.controls).forEach(key => {
        this.serviceForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.saving = true;
    const formValue = this.serviceForm.value;
    
    // Filter out empty features
    formValue.features = formValue.features.filter((f: string) => f.trim() !== '');

    // Generate slug from title
    formValue.slug = formValue.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const request = this.isEditMode && this.currentService
      ? this.apiService.put(`/admin/services/${this.currentService.id}`, formValue)
      : this.apiService.post('/admin/services', formValue);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.closeModal();
        this.loadServices();
        alert(this.isEditMode ? 'Service updated successfully!' : 'Service created successfully!');
      },
      error: (error) => {
        console.error('Error saving service:', error);
        this.saving = false;
        alert('Error saving service. Please try again.');
      }
    });
  }

  toggleStatus(service: Service) {
    if (!service.id) return;

    const updatedService = { ...service, is_active: !service.is_active };
    
    this.apiService.put(`/admin/services/${service.id}`, updatedService).subscribe({
      next: () => {
        service.is_active = !service.is_active;
        alert('Status updated successfully!');
      },
      error: (error) => {
        console.error('Error updating status:', error);
        alert('Error updating status. Please try again.');
      }
    });
  }

  deleteService(service: Service) {
    if (!service.id) return;

    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }

    this.apiService.delete(`/admin/services/${service.id}`).subscribe({
      next: () => {
        this.loadServices();
        alert('Service deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting service:', error);
        alert('Error deleting service. Please try again.');
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }
}
