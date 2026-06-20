// src/app/pages/admin/profile-form/profile-form.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile';
import { Profile } from '../../../core/models/profile.model';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css'
})
export class ProfileFormComponent implements OnInit {
  profile!: Profile;
  loading  = true;
  saving   = false;
  success  = false;
  error    = '';

  // ── Photo ──
  selectedFile?: File;
  photoPreview?: string;
  uploadingPhoto = false;
  photoError = '';
  photoSuccess = false;

  constructor(private svc: ProfileService) {}

  get initials(): string {
    if (!this.profile?.name) return '';
    return this.profile.name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  ngOnInit() {
    this.svc.get().subscribe({
      next: p  => { this.profile = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  updateSoftSkills(text: string) {
    this.profile.soft_skills = text.split('\n').map(s => s.trim()).filter(Boolean);
  }

  // ── Sélection de la photo (aperçu local avant envoi) ──
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      this.photoError = 'La photo dépasse 4 Mo.';
      return;
    }

    this.photoError = '';
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => { this.photoPreview = reader.result as string; };
    reader.readAsDataURL(file);
  }

  // ── Confirmer et envoyer au serveur ──
  uploadPhoto() {
    if (!this.selectedFile) return;

    this.uploadingPhoto = true;
    this.photoError = '';
    this.photoSuccess = false;

    this.svc.uploadPhoto(this.selectedFile).subscribe({
      next: (updated) => {
        this.profile = updated;
        this.uploadingPhoto = false;
        this.photoSuccess = true;
        this.selectedFile = undefined;
        this.photoPreview = undefined;
        setTimeout(() => this.photoSuccess = false, 3000);
      },
      error: () => {
        this.photoError = 'Erreur lors de l\'envoi de la photo.';
        this.uploadingPhoto = false;
      }
    });
  }

  cancelPhoto() {
    this.selectedFile = undefined;
    this.photoPreview = undefined;
    this.photoError = '';
  }

  onSubmit() {
    this.saving  = true;
    this.success = false;
    this.error   = '';

    this.svc.update(this.profile).subscribe({
      next: p  => {
        this.profile = p;
        this.saving  = false;
        this.success = true;
        setTimeout(() => this.success = false, 3000);
      },
      error: () => { this.error = 'Erreur lors de la sauvegarde.'; this.saving = false; }
    });
  }
}