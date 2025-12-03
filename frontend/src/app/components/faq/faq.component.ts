import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: FaqItem[] = [];
  loading = true;
  selectedCategory = 'all';
  categories: string[] = ['all'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.apiService.getContent().subscribe({
      next: (response) => {
        this.faqs = (response.faq || []).map((faq: FaqItem) => ({
          ...faq,
          isOpen: false
        }));
        this.extractCategories();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading FAQs:', error);
        this.loading = false;
        this.loadDefaultFaqs();
      }
    });
  }

  loadDefaultFaqs(): void {
    this.faqs = [
      {
        id: 1,
        question: 'faq.q1.question',
        answer: 'faq.q1.answer',
        category: 'general',
        isOpen: false
      },
      {
        id: 2,
        question: 'faq.q2.question',
        answer: 'faq.q2.answer',
        category: 'pricing',
        isOpen: false
      },
      {
        id: 3,
        question: 'faq.q3.question',
        answer: 'faq.q3.answer',
        category: 'technical',
        isOpen: false
      },
      {
        id: 4,
        question: 'faq.q4.question',
        answer: 'faq.q4.answer',
        category: 'support',
        isOpen: false
      },
      {
        id: 5,
        question: 'faq.q5.question',
        answer: 'faq.q5.answer',
        category: 'general',
        isOpen: false
      },
      {
        id: 6,
        question: 'faq.q6.question',
        answer: 'faq.q6.answer',
        category: 'pricing',
        isOpen: false
      }
    ];
    this.extractCategories();
  }

  extractCategories(): void {
    const uniqueCategories = new Set(
      this.faqs
        .map(faq => faq.category)
        .filter(cat => cat !== undefined) as string[]
    );
    this.categories = ['all', ...Array.from(uniqueCategories)];
  }

  toggleFaq(faq: FaqItem): void {
    faq.isOpen = !faq.isOpen;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredFaqs(): FaqItem[] {
    if (this.selectedCategory === 'all') {
      return this.faqs;
    }
    return this.faqs.filter(faq => faq.category === this.selectedCategory);
  }
}
