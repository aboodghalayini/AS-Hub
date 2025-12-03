import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_popular: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  @Input() pricingPlans: PricingPlan[] = [];
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  toggleBillingCycle(): void {
    this.billingCycle = this.billingCycle === 'monthly' ? 'yearly' : 'monthly';
  }

  getPrice(plan: PricingPlan): number {
    return this.billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly;
  }

  getSavings(plan: PricingPlan): number {
    const yearlyTotal = plan.price_monthly * 12;
    const savings = yearlyTotal - plan.price_yearly;
    return Math.round((savings / yearlyTotal) * 100);
  }

  scrollToContact(): void {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
