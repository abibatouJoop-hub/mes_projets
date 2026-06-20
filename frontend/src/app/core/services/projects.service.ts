// ════════════════════════════════════════
// src/app/core/services/project.service.ts
// ════════════════════════════════════════
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project, ProjectPayload } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // PUBLIC
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/projects`);
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/projects/${id}`);
  }

  // ADMIN
  adminGetAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/admin/projects`);
  }

  create(data: ProjectPayload): Observable<Project> {
    return this.http.post<Project>(`${this.url}/admin/projects`, data);
  }

  update(id: number, data: Partial<ProjectPayload>): Observable<Project> {
    return this.http.put<Project>(`${this.url}/admin/projects/${id}`, data);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.url}/admin/projects/${id}`);
  }
}
