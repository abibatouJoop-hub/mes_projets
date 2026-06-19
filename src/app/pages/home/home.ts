
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile';
import { ProjectService } from '../../core/services/projects.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  profile?: Profile;
  totalProjects = 0;
  loading = true;

  constructor(
    private profileSvc: ProfileService,
    private projectSvc: ProjectService
  ) {}

  ngOnInit() {
    this.profileSvc.get().subscribe(p => { this.profile = p; this.loading = false; });
    this.projectSvc.getAll().subscribe(p => this.totalProjects = p.length);
  }
}