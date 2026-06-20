// ════════════════════════════════════════
// src/app/pages/admin/project-form/project-form.ts
// ════════════════════════════════════════
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectPayload } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css'
})
export class ProjectFormComponent implements OnInit {
  isEdit   = false;
  loading  = false;
  error    = '';
  editId?: number;

  form: ProjectPayload = {
    title: '', description: '', emoji: '🚀',
    bg_color: '#f0fdf4', tags: [],
    github_url: '', live_url: '',
    type: 'Solo', is_visible: true, order: 0
  };

  tagsInput = '';   // string CSV → converti en array à l'envoi

  constructor(
    private svc: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.editId = +id;
      this.svc.getById(+id).subscribe(p => {
        this.form      = { ...p };
        this.tagsInput = p.tags?.join(', ') ?? '';
      });
    }
  }
  get tagsPreview(): string[] {
    return this.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
  }

  onSubmit() {
    this.loading = true;
    this.error   = '';
    this.form.tags = this.tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const req = this.isEdit
      ? this.svc.update(this.editId!, this.form)
      : this.svc.create(this.form);

    req.subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () => { this.error = 'Une erreur est survenue.'; this.loading = false; }
    });
  }
  
}