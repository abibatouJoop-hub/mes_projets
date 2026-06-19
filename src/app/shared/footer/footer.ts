
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit {
  profile?: Profile;
  year = new Date().getFullYear();
  constructor(private svc: ProfileService) {}
  ngOnInit() { this.svc.get().subscribe(p => this.profile = p); }
}