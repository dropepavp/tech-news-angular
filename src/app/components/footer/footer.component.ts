import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <footer>
      <div class="footer-top">
        <div class="footer-col">
          <img src="img/logo-white.svg" alt="Tech & Lab" class="brand-logo-img-footer" />
          <p>
            Plataforma académica y portal de difusión tecnológica del Subgrupo 19, enfocado en el desarrollo front-end moderno, servicios cloud e innovación de software.
          </p>
        </div>
        <div class="footer-col">
          <h4>Navegación</h4>
          <ul class="footer-links">
            <li><a routerLink="/">Inicio</a></li>
            <li><a routerLink="/catalogo">Catálogo de Noticias</a></li>
            <li><a routerLink="/favoritos">Mis Favoritos</a></li>
            <li><a routerLink="/gestion">Experiencias Dev</a></li>
            <li><a routerLink="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Categorías</h4>
          <ul class="footer-links">
            <li><a [routerLink]="['/catalogo']" [queryParams]="{ cat: 'Desarrollo Web' }">Desarrollo Web</a></li>
            <li><a [routerLink]="['/catalogo']" [queryParams]="{ cat: 'Inteligencia Artificial' }">Inteligencia Artificial</a></li>
            <li><a [routerLink]="['/catalogo']" [queryParams]="{ cat: 'Ciberseguridad' }">Ciberseguridad</a></li>
            <li><a [routerLink]="['/catalogo']" [queryParams]="{ cat: 'Cloud & DevOps' }">Cloud & DevOps</a></li>
            <li><a [routerLink]="['/catalogo']" [queryParams]="{ cat: 'Experiencias Tech' }">Experiencias Tech</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Boletín Tecnológico</h4>
          <p>Recibe los mejores análisis técnicos directamente en tu correo semanal.</p>
          <form class="newsletter-form" (ngSubmit)="suscribir()">
            <input 
              type="email" 
              name="email" 
              [(ngModel)]="email" 
              placeholder="tu@laboratorio-tech.com" 
              required 
            />
            <button type="submit" class="btn btn-primary" style="padding: 8px 14px;">Unirse</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Tech News & Lab &bull; Politécnico Grancolombiano &bull; Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: var(--brand-navy-dark, #001c3d);
      color: #cbd5e1;
      margin-top: auto;
      border-top: 4px solid var(--brand-blue, #0284c7);
    }
    .footer-top {
      max-width: 1240px;
      margin: 0 auto;
      padding: 30px 20px 18px;
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
      gap: 28px;
    }
    .footer-col h4 {
      color: #ffffff;
      font-size: 15px;
      margin-bottom: 12px;
      position: relative;
      padding-bottom: 6px;
    }
    .footer-col h4::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 24px;
      height: 2px;
      background: var(--brand-cyan, #06b6d4);
      border-radius: 2px;
    }
    .footer-col p {
      font-size: 13.5px;
      line-height: 1.55;
      color: #94a3b8;
    }
    .brand-logo-img-footer {
      height: 38px;
      margin-bottom: 10px;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 7px;
      padding: 0;
    }
    .footer-links a {
      color: #cbd5e1;
      font-size: 13.5px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .footer-links a:hover {
      color: var(--brand-cyan, #06b6d4);
      padding-left: 4px;
    }
    .newsletter-form {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .newsletter-form input {
      flex: 1;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
      outline: none;
    }
    .newsletter-form input:focus {
      border-color: var(--brand-cyan, #06b6d4);
      background: rgba(255, 255, 255, 0.12);
    }
    .newsletter-form input::placeholder {
      color: #64748b;
    }
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 12px 20px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    @media (max-width: 900px) {
      .footer-top {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 580px) {
      .footer-top {
        grid-template-columns: 1fr;
      }
      .newsletter-form {
        flex-direction: column;
      }
    }
  `]
})
export class FooterComponent {
  private toastService = inject(ToastService);
  email = signal('');

  suscribir(): void {
    if (!this.email() || !this.email().includes('@')) {
      this.toastService.show('Por favor ingresa un correo electrónico válido', 'warning');
      return;
    }
    this.toastService.show('¡Te has suscrito exitosamente al boletín técnico!', 'success');
    this.email.set('');
  }
}
