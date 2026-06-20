
import { Component, OnInit } from '@angular/core';
import { Project } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;

  constructor(private svc: ProjectService) {}

  ngOnInit() {
    this.svc.getAll().subscribe({
      next: p  => { this.projects = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}