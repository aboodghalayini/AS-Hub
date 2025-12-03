import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  client_avatar: string;
  testimonial: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  loading = true;
  currentIndex = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTestimonials();
    this.startAutoSlide();
  }

  loadTestimonials(): void {
    this.apiService.getContent().subscribe({
      next: (response) => {
        this.testimonials = response.testimonials || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading testimonials:', error);
        this.loading = false;
        this.loadDefaultTestimonials();
      }
    });
  }

  loadDefaultTestimonials(): void {
    this.testimonials = [
      {
        id: 1,
        client_name: 'testimonials.client1.name',
        client_position: 'testimonials.client1.position',
        client_company: 'testimonials.client1.company',
        client_avatar: 'assets/images/avatar1.jpg',
        testimonial: 'testimonials.client1.text',
        rating: 5
      },
      {
        id: 2,
        client_name: 'testimonials.client2.name',
        client_position: 'testimonials.client2.position',
        client_company: 'testimonials.client2.company',
        client_avatar: 'assets/images/avatar2.jpg',
        testimonial: 'testimonials.client2.text',
        rating: 5
      },
      {
        id: 3,
        client_name: 'testimonials.client3.name',
        client_position: 'testimonials.client3.position',
        client_company: 'testimonials.client3.company',
        client_avatar: 'assets/images/avatar3.jpg',
        testimonial: 'testimonials.client3.text',
        rating: 5
      }
    ];
  }

  startAutoSlide(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevSlide(): void {
    this.currentIndex = this.currentIndex === 0 
      ? this.testimonials.length - 1 
      : this.currentIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
