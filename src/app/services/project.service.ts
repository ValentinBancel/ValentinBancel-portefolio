import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, Tag } from '../models';
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
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProjects(): Observable<Project[]> {
    return this.http.get<ApiResponse<Project>>(`${this.apiUrl}/projects/`)
      .pipe(
        map(response => response.results)
      );
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}/`);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<ApiResponse<Tag>>(`${this.apiUrl}/tags/`)
      .pipe(
        map(response => response.results)
      );
  }
}
