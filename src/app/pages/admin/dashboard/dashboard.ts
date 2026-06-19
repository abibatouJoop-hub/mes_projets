// ════════════════════════════════════════
// src/app/pages/admin/dashboard/dashboard.ts
// ════════════════════════════════════════
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.model';
import { AuthService } from '../../../core/services/auth';
import { ProjectService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
   user: any = null;
  loading = true;

  constructor(
    private auth: AuthService,
    private projectSvc: ProjectService
  ) {}

  get visibleCount() {
    return this.projects.filter(p => p.is_visible).length;
  }

  get hiddenCount() {
    return this.projects.filter(p => !p.is_visible).length;
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.projectSvc.adminGetAll().subscribe({
      next: p  => { this.projects = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer ce projet ? Cette action est irréversible.')) return;
    this.projectSvc.delete(id).subscribe(() => {
      this.projects = this.projects.filter(p => p.id !== id);
    });
  }

  logout() {
    this.auth.logout().subscribe();
  }
}