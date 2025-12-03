import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>{{ 'settings.title' | translate }}</h1>
        <button class="btn btn-primary" (click)="saveSettings()">
          <i class="bi bi-save"></i> {{ 'settings.save' | translate }}
        </button>
      </div>

      <div class="settings-section" *ngIf="!loading">
        <h3>{{ 'settings.general' | translate }}</h3>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ 'settings.siteName' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="settings.site_name">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ 'settings.siteTagline' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="settings.site_tagline">
          </div>
        </div>

        <h3 class="mt-4">{{ 'settings.contact' | translate }}</h3>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">{{ 'settings.contactEmail' | translate }}</label>
            <input type="email" class="form-control" [(ngModel)]="settings.contact_email">
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">{{ 'settings.contactPhone' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="settings.contact_phone">
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">{{ 'settings.contactAddress' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="settings.contact_address">
          </div>
        </div>

        <h3 class="mt-4">{{ 'settings.social' | translate }}</h3>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ 'settings.facebook' | translate }}</label>
            <input type="url" class="form-control" [(ngModel)]="settings.social_facebook">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ 'settings.twitter' | translate }}</label>
            <input type="url" class="form-control" [(ngModel)]="settings.social_twitter">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ 'settings.linkedin' | translate }}</label>
            <input type="url" class="form-control" [(ngModel)]="settings.social_linkedin">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ 'settings.instagram' | translate }}</label>
            <input type="url" class="form-control" [(ngModel)]="settings.social_instagram">
          </div>
        </div>
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
    .settings-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settings: any = {};
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    this.apiService.getSettings().subscribe({
      next: (data) => {
        this.settings = data.data || {};
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  saveSettings(): void {
    this.apiService.updateSettings(this.settings).subscribe({
      next: () => {
        alert('Settings saved successfully!');
      },
      error: (err) => {
        alert('Error saving settings');
        console.error(err);
      }
    });
  }
}
