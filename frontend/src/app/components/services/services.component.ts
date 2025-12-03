import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  @Input() services: Service[] = [];

  getIconClass(icon: string): string {
    // Map icon names to emoji or icon classes
    const iconMap: { [key: string]: string } = {
      'website': '🌐',
      'mobile': '📱',
      'package': '📦',
      'ecommerce': '🛒',
      'management': '⚙️',
      'default': '💼'
    };
    return iconMap[icon] || iconMap['default'];
  }
}
