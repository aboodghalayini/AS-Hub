import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  heroTitle = '';
  heroSubtitle = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Hero content will be loaded from settings via parent component
  }

  scrollToContact(): void {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToPricing(): void {
    const element = document.querySelector('#pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
