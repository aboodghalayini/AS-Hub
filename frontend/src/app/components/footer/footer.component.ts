import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'footer.links.home', href: '#home' },
    { label: 'footer.links.services', href: '#services' },
    { label: 'footer.links.pricing', href: '#pricing' },
    { label: 'footer.links.about', href: '#about' }
  ];

  services = [
    { label: 'footer.services.webDev', href: '#services' },
    { label: 'footer.services.mobileDev', href: '#services' },
    { label: 'footer.services.ecommerce', href: '#services' },
    { label: 'footer.services.management', href: '#services' }
  ];

  support = [
    { label: 'footer.support.faq', href: '#faq' },
    { label: 'footer.support.contact', href: '#contact' },
    { label: 'footer.support.documentation', href: '#' },
    { label: 'footer.support.help', href: '#contact' }
  ];

  socialLinks = [
    { icon: 'bi-facebook', url: 'https://facebook.com/ashub', label: 'Facebook' },
    { icon: 'bi-twitter', url: 'https://twitter.com/ashub', label: 'Twitter' },
    { icon: 'bi-linkedin', url: 'https://linkedin.com/company/ashub', label: 'LinkedIn' },
    { icon: 'bi-instagram', url: 'https://instagram.com/ashub', label: 'Instagram' },
    { icon: 'bi-youtube', url: 'https://youtube.com/@ashub', label: 'YouTube' }
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
