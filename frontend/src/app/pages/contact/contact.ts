// src/app/pages/contact/contact.ts
import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile';
import { EmailService } from '../../core/services/email';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements OnInit {
  profile?: Profile;
  form = { name: '', email: '', subject: 'Mission freelance', message: '' };
  sending = false;
  success = false;
  error   = '';
  lastSentName = '';

  constructor(
    private profileSvc: ProfileService,
    private emailSvc: EmailService,
    private zone: NgZone   // ← ajouté
  ) {}

  ngOnInit() {
    this.profileSvc.get().subscribe(p => this.profile = p);
  }

  async onSubmit() {
    this.sending = true;
    this.error   = '';

    try {
      await this.emailSvc.send(this.form);

      // ← on force Angular à re-render dans sa zone
      this.zone.run(() => {
        this.lastSentName = this.form.name;
        this.success = true;
        this.sending = false;
        this.form = { name: '', email: '', subject: 'Mission freelance', message: '' };
      });

    } catch (e) {
      this.zone.run(() => {
        this.error   = 'Erreur lors de l\'envoi. Réessaie ou contacte-moi directement par email.';
        this.sending = false;
      });
    }
  }

  resetForm() {
    this.success = false;
    this.error   = '';
  }
}