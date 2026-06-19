import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(): Observable<Profile> {
    return this.http.get<Profile>(`${this.url}/profile`);
  }

  update(data: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.url}/admin/profile`, data);
  }

  // ── NOUVEAU : upload de la photo ──
  uploadPhoto(file: File): Observable<Profile> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.post<Profile>(`${this.url}/admin/profile/photo`, formData);
  }
}