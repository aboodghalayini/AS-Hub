import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Generic CRUD methods
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }

  // Services
  getServices(language: string = 'en'): Observable<any> {
    return this.get('/admin/services', { language });
  }

  createService(data: any): Observable<any> {
    return this.post('/admin/services', data);
  }

  updateService(id: number, data: any): Observable<any> {
    return this.put(`/admin/services/${id}`, data);
  }

  deleteService(id: number): Observable<any> {
    return this.delete(`/admin/services/${id}`);
  }

  // Pricing
  getPricing(language: string = 'en'): Observable<any> {
    return this.get('/admin/pricing', { language });
  }

  createPricing(data: any): Observable<any> {
    return this.post('/admin/pricing', data);
  }

  updatePricing(id: number, data: any): Observable<any> {
    return this.put(`/admin/pricing/${id}`, data);
  }

  deletePricing(id: number): Observable<any> {
    return this.delete(`/admin/pricing/${id}`);
  }

  // Features
  getFeatures(language: string = 'en'): Observable<any> {
    return this.get('/admin/features', { language });
  }

  createFeature(data: any): Observable<any> {
    return this.post('/admin/features', data);
  }

  updateFeature(id: number, data: any): Observable<any> {
    return this.put(`/admin/features/${id}`, data);
  }

  deleteFeature(id: number): Observable<any> {
    return this.delete(`/admin/features/${id}`);
  }

  // Testimonials
  getTestimonials(language: string = 'en'): Observable<any> {
    return this.get('/admin/testimonials', { language });
  }

  createTestimonial(data: any): Observable<any> {
    return this.post('/admin/testimonials', data);
  }

  updateTestimonial(id: number, data: any): Observable<any> {
    return this.put(`/admin/testimonials/${id}`, data);
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.delete(`/admin/testimonials/${id}`);
  }

  // FAQ
  getFaq(language: string = 'en'): Observable<any> {
    return this.get('/admin/faq', { language });
  }

  createFaq(data: any): Observable<any> {
    return this.post('/admin/faq', data);
  }

  updateFaq(id: number, data: any): Observable<any> {
    return this.put(`/admin/faq/${id}`, data);
  }

  deleteFaq(id: number): Observable<any> {
    return this.delete(`/admin/faq/${id}`);
  }

  // Leads
  getLeads(): Observable<any> {
    return this.get('/admin/leads');
  }

  updateLead(id: number, data: any): Observable<any> {
    return this.put(`/admin/leads/${id}`, data);
  }

  deleteLead(id: number): Observable<any> {
    return this.delete(`/admin/leads/${id}`);
  }

  exportLeads(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/admin/leads/export`, { responseType: 'blob' });
  }

  // Settings
  getSettings(): Observable<any> {
    return this.get('/admin/settings');
  }

  updateSettings(data: any): Observable<any> {
    return this.put('/admin/settings', data);
  }

  // Media
  getMedia(): Observable<any> {
    return this.get('/admin/media');
  }

  uploadMedia(file: File, altText?: string, title?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('alt_text', altText);
    if (title) formData.append('title', title);
    return this.post('/admin/media-upload', formData);
  }

  deleteMedia(id: number): Observable<any> {
    return this.delete(`/admin/media/${id}`);
  }

  // Dashboard Stats
  getDashboardStats(): Observable<any> {
    return this.get('/admin/dashboard/stats');
  }
}
