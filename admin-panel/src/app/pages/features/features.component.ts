import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>{{ 'features.title' | translate }}</h1>
        <button class="btn btn-primary" (click)="openAddModal()">
          <i class="bi bi-plus-lg"></i> {{ 'features.add' | translate }}
        </button>
      </div>
      <div class="table-responsive" *ngIf="!loading && features.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>{{ 'features.name' | translate }}</th>
              <th>{{ 'features.description' | translate }}</th>
              <th>{{ 'common.actions' | translate }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let feature of features">
              <td>{{ feature.title }}</td>
              <td>{{ feature.description }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" (click)="openEditModal(feature)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" (click)="deleteFeature(feature.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary"></div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
  `]
})
export class FeaturesComponent implements OnInit {
  features: any[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.loading = true;
    this.apiService.getFeatures().subscribe({
      next: (data) => {
        this.features = data.data || [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openAddModal(): void {
    alert('Add feature modal');
  }

  openEditModal(feature: any): void {
    alert('Edit feature: ' + feature.title);
  }

  deleteFeature(id: number): void {
    if (confirm('Are you sure?')) {
      this.apiService.deleteFeature(id).subscribe({
        next: () => this.loadFeatures()
      });
    }
  }
}
