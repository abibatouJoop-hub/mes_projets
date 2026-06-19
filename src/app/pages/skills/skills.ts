
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class SkillsComponent implements OnInit {
  profile?: Profile;
  loading = true;

  constructor(private svc: ProfileService) {}

  ngOnInit() {
    this.svc.get().subscribe(p => { this.profile = p; this.loading = false; });
  }
}