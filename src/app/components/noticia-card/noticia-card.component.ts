import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { FavoritosService } from '../../services/favoritos.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-noticia-card',
  imports: [CommonModule, RouterLink],
  template: `
    <article class="news-card">
      <div class="card-img-wrap">
        <img [src]="noticia.image" [alt]="noticia.title" (error)="onImgError($event)" loading="lazy" />
        <span class="card-badge" [class]="getCatClass(noticia.cat)">{{ noticia.cat }}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">
          <a [routerLink]="['/detalle', noticia.id]">{{ noticia.title }}</a>
        </h3>
        <p class="card-desc">{{ noticia.desc }}</p>
        <div class="card-footer">
          <div class="card-meta">
            <span class="card-author">{{ noticia.author }}</span>
            <span class="card-date">{{ noticia.date }} &bull; {{ noticia.readTime }}</span>
          </div>
          <div class="card-actions">
            <button 
              type="button" 
              class="btn-fav-card" 
              [class.is-fav]="isFav()" 
              [attr.aria-label]="isFav() ? 'Quitar de favoritos' : 'Agregar a favoritos'"
              (click)="toggleFavorito($event)">
              {{ isFav() ? '★' : '☆' }}
            </button>
            <a [routerLink]="['/detalle', noticia.id]" class="btn-read-more" title="Leer artículo">
              →
            </a>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .news-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-md, 10px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 40, 85, 0.06));
      transition: all 0.25s ease;
      height: 100%;
    }
    .news-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg, 0 10px 25px rgba(0, 40, 85, 0.12));
      border-color: var(--border-hover, #cbd5e1);
    }
    .card-img-wrap {
      position: relative;
      width: 100%;
      height: 180px;
      overflow: hidden;
      background: var(--bg-surface, #f8fafc);
    }
    .card-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .news-card:hover .card-img-wrap img {
      transform: scale(1.04);
    }
    .card-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(0, 40, 85, 0.9);
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 9999px;
      backdrop-filter: blur(4px);
      letter-spacing: 0.03em;
    }
    .cat-web { background: rgba(2, 132, 199, 0.95); }
    .cat-ia { background: rgba(124, 58, 237, 0.95); }
    .cat-sec { background: rgba(220, 38, 38, 0.95); }
    .cat-cloud { background: rgba(13, 148, 136, 0.95); }
    .cat-tech { background: rgba(217, 119, 6, 0.95); }

    .card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .card-title {
      font-size: 17px;
      line-height: 1.35;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .card-title a {
      color: var(--brand-navy, #002855);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .card-title a:hover {
      color: var(--brand-blue, #0284c7);
    }
    .card-desc {
      color: var(--text-muted, #475569);
      font-size: 13.5px;
      line-height: 1.55;
      margin-bottom: 18px;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid var(--border-color, #e2e8f0);
    }
    .card-meta {
      display: flex;
      flex-direction: column;
    }
    .card-author {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--brand-navy, #002855);
    }
    .card-date {
      font-size: 11.5px;
      color: var(--text-light, #64748b);
    }
    .card-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-fav-card {
      background: #f8fafc;
      color: var(--text-light, #64748b);
      width: 34px;
      height: 34px;
      border-radius: var(--radius-sm, 6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 1px solid var(--border-color, #e2e8f0);
      font-size: 17px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-fav-card:hover, .btn-fav-card.is-fav {
      background: #fef3c7;
      color: var(--accent-fav, #f59e0b);
      border-color: #fde68a;
    }
    .btn-read-more {
      width: 34px;
      height: 34px;
      border-radius: var(--radius-sm, 6px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--brand-cyan-light, #e0f2fe);
      color: var(--brand-blue, #0284c7);
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      transition: all 0.2s ease;
    }
    .btn-read-more:hover {
      background: var(--brand-blue, #0284c7);
      color: #ffffff;
    }
  `]
})
export class NoticiaCardComponent {
  @Input({ required: true }) noticia!: Noticia;

  private favoritosService = inject(FavoritosService);
  private toastService = inject(ToastService);

  isFav(): boolean {
    return this.favoritosService.esFavorito(this.noticia.id);
  }

  toggleFavorito(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const added = this.favoritosService.toggleFavorito(this.noticia.id);
    if (added) {
      this.toastService.show(`"${this.noticia.title.slice(0, 30)}..." agregada a favoritos ⭐`, 'success');
    } else {
      this.toastService.show(`Eliminada de favoritos`, 'info');
    }
  }

  onImgError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'img/default-news.svg';
  }

  getCatClass(cat: string): string {
    switch (cat) {
      case 'Desarrollo Web': return 'cat-web';
      case 'Inteligencia Artificial': return 'cat-ia';
      case 'Ciberseguridad': return 'cat-sec';
      case 'Cloud & DevOps': return 'cat-cloud';
      case 'Experiencias Tech': return 'cat-tech';
      default: return '';
    }
  }
}
