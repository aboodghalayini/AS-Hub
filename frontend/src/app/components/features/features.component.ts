import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  features: Feature[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.apiService.getContent().subscribe({
      next: (response) => {
        this.features = response.features || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading features:', error);
        this.loading = false;
        // Fallback to default features
        this.loadDefaultFeatures();
      }
    });
  }

  loadDefaultFeatures(): void {
    this.features = [
      {
        id: 1,
        title: 'features.integration.title',
        description: 'features.integration.description',
        icon: 'bi-diagram-3'
      },
      {
        id: 2,
        title: 'features.reports.title',
        description: 'features.reports.description',
        icon: 'bi-graph-up'
      },
      {
        id: 3,
        title: 'features.support.title',
        description: 'features.support.description',
        icon: 'bi-headset'
      },
      {
        id: 4,
        title: 'features.security.title',
        description: 'features.security.description',
        icon: 'bi-shield-check'
      },
      {
        id: 5,
        title: 'features.scalability.title',
        description: 'features.scalability.description',
        icon: 'bi-arrow-up-right-circle'
      },
      {
        id: 6,
        title: 'features.automation.title',
        description: 'features.automation.description',
        icon: 'bi-gear'
      }
    ];
  }
}
