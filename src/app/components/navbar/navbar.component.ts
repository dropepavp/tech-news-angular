import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header>
      <div class="nav-wrapper">
        <a routerLink="/" class="logo-box">
          <img src="img/logo-white.svg" alt="Tech & Lab Noticias Tecnológicas" class="brand-logo-img" />
        </a>

        <button class="mobile-toggle" (click)="toggleMenu()" aria-label="Abrir Menú">
          {{ menuOpen() ? '✕' : '☰' }}
        </button>

        <nav class="main-nav" [class.nav-open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link" (click)="closeMenu()">Inicio</a>
          <a routerLink="/catalogo" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active" class="nav-link fav-badge-btn" (click)="closeMenu()">
            ⭐ Favoritos <span class="badge-count">{{ favoritosService.totalFavoritos() }}</span>
          </a>
          <a routerLink="/gestion" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Experiencias Dev</a>
          <a routerLink="/contacto" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Contacto</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    header {
      background: var(--brand-navy, #002855);
      border-bottom: 3px solid var(--brand-cyan, #06b6d4);
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: var(--shadow-md, 0 4px 14px rgba(0, 40, 85, 0.08));
    }
    .nav-wrapper {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }
    .logo-box {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .brand-logo-img {
      height: 46px;
      width: auto;
      object-fit: contain;
      transition: all 0.2s ease;
    }
    .logo-box:hover .brand-logo-img {
      transform: scale(1.02);
    }
    .main-nav {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .nav-link {
      color: #e2e8f0;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: var(--radius-sm, 6px);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
    .nav-link:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }
    .nav-link.active {
      color: #ffffff;
      background: var(--brand-blue, #0284c7);
      font-weight: 600;
    }
    .fav-badge-btn {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24 !important;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .fav-badge-btn:hover, .fav-badge-btn.active {
      background: var(--accent-fav, #f59e0b) !important;
      color: #ffffff !important;
    }
    .badge-count {
      background: #ffffff;
      color: var(--brand-navy, #002855);
      padding: 1px 7px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
    }
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      color: #ffffff;
      font-size: 24px;
      cursor: pointer;
    }

    @media (max-width: 820px) {
      .mobile-toggle {
        display: block;
      }
      .main-nav {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: #001c3d;
        flex-direction: column;
        padding: 20px;
        gap: 12px;
        border-bottom: 2px solid #06b6d4;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
      .main-nav.nav-open {
        display: flex;
      }
      .nav-link {
        width: 100%;
        padding: 10px 16px;
      }
    }
  `]
})
export class NavbarComponent {
  favoritosService = inject(FavoritosService);
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
