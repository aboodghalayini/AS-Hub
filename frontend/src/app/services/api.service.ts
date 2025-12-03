import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContentResponse {
  services: any[];
  pricing: any[];
  features: any[];
  testimonials: any[];
  faq: any[];
  settings: any;
}

export interface LeadRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  plan?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all landing page content
   */
  getContent(language: string = 'en'): Observable<ContentResponse> {
    return this.http.get<ContentResponse>(`${this.apiUrl}/v1/content?lang=${language}`);
  }

  /**
   * Submit contact form
   */
  submitLead(data: LeadRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/leads`, data);
  }

  /**
   * Health check
   */
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}
