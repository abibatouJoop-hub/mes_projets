// src/app/core/services/email.ts
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

export interface ContactPayload {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {

  async send(payload: ContactPayload): Promise<void> {
    try {
      const result = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name:  payload.name,
          from_email: payload.email,
          subject:    payload.subject,
          message:    payload.message,
        },
        { publicKey: environment.emailjs.publicKey }   // ← nouvelle syntaxe @emailjs/browser v4
      );

      console.log('EmailJS OK:', result.status, result.text);

      if (result.status !== 200) {
        throw new Error(`EmailJS a renvoyé le statut ${result.status}`);
      }
    } catch (err) {
      console.error('EmailJS ERREUR:', err);
      throw err;   // ← on relance pour que le composant affiche l'erreur
    }
  }
}