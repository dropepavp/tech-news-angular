import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  open?: boolean;
}

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule],
  template: `
    <main class="container">
      <div class="section-header">
        <div>
          <h1 class="section-title">Canal de Contacto Técnico</h1>
          <p class="section-subtitle">¿Tienes preguntas sobre un artículo, sugerencias o deseas colaborar en nuestras investigaciones?</p>
        </div>
      </div>

      <div class="contact-grid">
        <!-- FORMULARIO DE CONTACTO -->
        <div class="form-card">
          <h3 class="form-title">Envíanos un Mensaje</h3>

          @if (mensajeEnviado()) {
            <div class="success-box">
              <strong>✅ ¡Mensaje recibido con éxito!</strong>
              <p>Gracias por contactarnos. Nuestro equipo editorial revisará tu solicitud y te responderá al correo indicado en menos de 24 horas.</p>
              <button class="btn btn-secondary" style="margin-top: 10px; font-size: 12.5px;" (click)="mensajeEnviado.set(false)">
                Enviar otro mensaje
              </button>
            </div>
          } @else {
            <form (ngSubmit)="enviarMensaje()" #contactForm="ngForm">
              <div class="form-group">
                <label class="form-label" for="contact-name">Nombre Completo *</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  class="form-control" 
                  [(ngModel)]="name" 
                  placeholder="Ej: Pedro Alejandro Varela" 
                  required 
                  minlength="3"
                  #nameCtrl="ngModel"
                />
                @if (nameCtrl.invalid && nameCtrl.touched) {
                  <span class="error-msg">Por favor ingresa tu nombre (mínimo 3 letras).</span>
                }
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-email">Correo Electrónico *</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  class="form-control" 
                  [(ngModel)]="email" 
                  placeholder="usuario@laboratorio-tech.com" 
                  required 
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                  #emailCtrl="ngModel"
                />
                @if (emailCtrl.invalid && emailCtrl.touched) {
                  <span class="error-msg">Ingresa una dirección de correo válida (ej. nombre&#64;dominio.com).</span>
                }
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-subject">Motivo de Contacto *</label>
                <select id="contact-subject" name="subject" class="form-control" [(ngModel)]="subject">
                  <option value="consulta">Consulta sobre un artículo publicado</option>
                  <option value="colaboracion">Propuesta de nuevo artículo o tema</option>
                  <option value="tecnico">Reporte de error o soporte técnico</option>
                  <option value="academico">Colaboración académica / Laboratorio</option>
                </select>
              </div>

              <div class="form-group">
                <div class="textarea-header">
                  <label class="form-label" for="contact-message" style="margin-bottom: 0;">Mensaje Detallado *</label>
                  <span class="char-count">{{ message.length }} / 500 caracteres</span>
                </div>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  rows="5" 
                  class="form-control" 
                  maxlength="500" 
                  [(ngModel)]="message" 
                  placeholder="Escribe tu duda o propuesta técnica..." 
                  required 
                  minlength="10"
                  #msgCtrl="ngModel"
                ></textarea>
                @if (msgCtrl.invalid && msgCtrl.touched) {
                  <span class="error-msg">El mensaje debe tener al menos 10 caracteres.</span>
                }
              </div>

              <button 
                type="submit" 
                class="btn btn-primary" 
                [disabled]="contactForm.invalid" 
                style="width: 100%; padding: 12px;"
              >
                Enviar Mensaje
              </button>
            </form>
          }
        </div>

        <!-- INFORMACIÓN INSTITUCIONAL Y FAQ -->
        <div class="info-sidebar">
          <div class="form-card">
            <h4 class="info-title">📍 Información de la Sede</h4>
            <div class="info-list">
              <div>
                <strong>Institución:</strong>
                <p>Politécnico Grancolombiano &bull; Sede Principal</p>
              </div>
              <div>
                <strong>Módulo:</strong>
                <p>Front End &amp; Tecnologías Web (Grupo B01 - 2026)</p>
              </div>
              <div>
                <strong>Subgrupo 19:</strong>
                <p>Sonia Homez, Santiago Isaza, Pedro Alejandro Varela</p>
              </div>
              <div>
                <strong>Docente:</strong>
                <p>Prof. John Olarte Ramos</p>
              </div>
              <div>
                <strong>Horario de Atención:</strong>
                <p>Lunes a Viernes &bull; 8:00 a.m. – 6:00 p.m. (COT)</p>
              </div>
            </div>
          </div>

          <div class="form-card">
            <h4 class="info-title">❓ Preguntas Frecuentes (FAQ)</h4>
            <div class="faq-list">
              @for (faq of faqs(); track faq.id) {
                <div class="faq-item" [class.faq-open]="faq.open">
                  <button type="button" class="faq-question" (click)="toggleFaq(faq.id)">
                    <span>{{ faq.question }}</span>
                    <span class="faq-arrow">{{ faq.open ? '−' : '+' }}</span>
                  </button>
                  @if (faq.open) {
                    <div class="faq-answer">
                      <p>{{ faq.answer }}</p>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 32px;
      margin-bottom: 48px;
    }
    .form-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-md, 10px);
      padding: 28px;
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 40, 85, 0.06));
    }
    .form-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--brand-navy, #002855);
    }
    .form-group {
      margin-bottom: 18px;
    }
    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main, #0f172a);
      margin-bottom: 6px;
    }
    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-sm, 6px);
      font-size: 13.5px;
      outline: none;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      border-color: var(--brand-blue, #0284c7);
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
    }
    .error-msg {
      color: var(--accent-danger, #ef4444);
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }
    .textarea-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .char-count {
      font-size: 12px;
      color: var(--text-light, #64748b);
    }
    .success-box {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
      padding: 18px;
      border-radius: var(--radius-sm, 6px);
      font-size: 13.5px;
      line-height: 1.6;
    }
    .info-sidebar {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .info-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--brand-navy, #002855);
    }
    .info-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-size: 13.5px;
    }
    .info-list strong {
      color: var(--brand-navy, #002855);
      display: block;
      margin-bottom: 2px;
    }
    .info-list p {
      color: var(--text-muted, #475569);
      margin: 0;
    }
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .faq-item {
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-sm, 6px);
      overflow: hidden;
      transition: all 0.2s;
    }
    .faq-question {
      width: 100%;
      text-align: left;
      background: #f8fafc;
      border: none;
      padding: 12px 16px;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--brand-navy, #002855);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    .faq-question:hover {
      background: #f1f5f9;
    }
    .faq-arrow {
      font-size: 16px;
      font-weight: 700;
      color: var(--brand-blue, #0284c7);
    }
    .faq-answer {
      padding: 14px 16px;
      font-size: 13px;
      line-height: 1.6;
      color: var(--text-muted, #475569);
      background: #ffffff;
      border-top: 1px solid var(--border-color, #e2e8f0);
    }
    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactoComponent {
  private toastService = inject(ToastService);

  name = '';
  email = '';
  subject = 'consulta';
  message = '';
  mensajeEnviado = signal(false);

  faqs = signal<FAQ[]>([
    {
      id: 1,
      question: '¿Cómo se guardan mis noticias en favoritos?',
      answer: 'Utilizamos LocalStorage del navegador sincronizado con Signals de Angular, lo que permite conservar tus noticias guardadas incluso al recargar o cerrar la pestaña.',
      open: true
    },
    {
      id: 2,
      question: '¿Puedo proponer un nuevo artículo técnico?',
      answer: '¡Por supuesto! Puedes redactarlo directamente en la pestaña "Experiencias Dev" o enviarnos tu propuesta mediante este formulario.',
      open: false
    },
    {
      id: 3,
      question: '¿El contenido es de acceso libre y académico?',
      answer: 'Sí, todo el material publicado en Tech News & Lab es desarrollado para fines de investigación académica en ingeniería y desarrollo front-end.',
      open: false
    }
  ]);

  toggleFaq(id: number): void {
    this.faqs.update(list => 
      list.map(f => f.id === id ? { ...f, open: !f.open } : f)
    );
  }

  enviarMensaje(): void {
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.toastService.show('Por favor llena todos los campos obligatorios', 'warning');
      return;
    }

    this.mensajeEnviado.set(true);
    this.toastService.show('¡Mensaje enviado exitosamente! ✅', 'success');

    this.name = '';
    this.email = '';
    this.subject = 'consulta';
    this.message = '';
  }
}
