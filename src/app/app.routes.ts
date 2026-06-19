// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // ── Pages publiques ──
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Mame Aby Diop — Développeuse Web Full Stack'
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills').then(m => m.SkillsComponent),
    title: 'Compétences — Mame Aby Diop'
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.ProjectsComponent),
    title: 'Projets — Mame Aby Diop'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
    title: 'À propos — Mame Aby Diop'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
    title: 'Contact — Mame Aby Diop'
  },

  // ── Admin (protégé par authGuard) ──
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin/login/login').then(m => m.LoginComponent),
    title: 'Connexion Admin'
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.DashboardComponent),
        title: 'Dashboard — Admin'
      },
      {
        path: 'projects/new',
        loadComponent: () => import('./pages/admin/project-form/project-form').then(m => m.ProjectFormComponent),
        title: 'Nouveau projet'
      },
      {
        path: 'projects/edit/:id',
        loadComponent: () => import('./pages/admin/project-form/project-form').then(m => m.ProjectFormComponent),
        title: 'Modifier le projet'
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/admin/profile-form/profile-form').then(m => m.ProfileFormComponent),
        title: 'Mon profil'
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '' }
];