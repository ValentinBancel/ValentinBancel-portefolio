import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../models';
import { environment } from '../../environments/environment';

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getServices(): Observable<Service[]> {
    return this.http.get<ApiResponse<Service>>(`${this.apiUrl}/services/`)
      .pipe(
        map(response => response.results)
      );
  }

  getActiveServices(): Observable<Service[]> {
    return this.http.get<ApiResponse<Service>>(`${this.apiUrl}/services/?is_active=true`)
      .pipe(
        map(response => response.results)
      );
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/services/${id}/`);
  }
}
