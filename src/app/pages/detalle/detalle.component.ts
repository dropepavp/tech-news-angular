import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { ToastService } from '../../services/toast.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container">
      @if (noticia(); as item) {
        <!-- BREADCRUMBS -->
        <nav class="breadcrumbs">
          <a routerLink="/">Inicio</a>
          <span>/</span>
          <a routerLink="/catalogo">Catálogo</a>
          <span>/</span>
          <span class="breadcrumb-current">{{ item.title }}</span>
        </nav>

        <div class="detail-layout">
          <!-- ARTÍCULO PRINCIPAL -->
          <article class="article-main">
            <div class="article-header">
              <span class="article-tag">{{ item.cat }}</span>
              <h1 class="article-title">{{ item.title }}</h1>

              <div class="article-meta-bar">
                <div class="author-chip">
                  <div class="author-avatar">{{ getInitials(item.author) }}</div>
                  <div>
                    <div class="author-name">{{ item.author }}</div>
                    <div class="article-date">
                      <span>{{ item.date }}</span> • <span>{{ item.readTime }}</span>
                    </div>
                  </div>
                </div>

                <div class="meta-action-btns">
                  <button 
                    type="button"
                    class="btn btn-outline" 
                    [class.is-fav-active]="isFav()"
                    (click)="toggleFavorito()">
                    {{ isFav() ? '★ En Favoritos' : '☆ Agregar a Favoritos' }}
                  </button>
                  <button 
                    type="button"
                    class="btn btn-secondary" 
                    (click)="copiarEnlace()"
                    title="Copiar enlace">
                    🔗 Compartir
                  </button>
                </div>
              </div>
            </div>

            <img [src]="item.image" [alt]="item.title" (error)="item.image = 'img/default-news.svg'" class="article-hero-img" />

            <div class="article-body">
              <p class="lead-paragraph">{{ item.desc }}</p>
              <p>{{ item.content }}</p>
            </div>

            <div class="article-actions-bar">
              <a routerLink="/catalogo" class="btn btn-secondary">← Volver al Catálogo</a>
              <a routerLink="/contacto" class="btn btn-primary">Contactar al Autor / Soporte</a>
            </div>
          </article>

          <!-- SIDEBAR -->
          <aside>
            <div class="sidebar-card">
              <h4 class="sidebar-title">Sobre la Publicación</h4>
              <p style="font-size: 13.5px; color: var(--text-muted, #475569); margin-bottom: 14px; line-height: 1.6;">
                Este contenido es elaborado y verificado por el equipo de investigación y desarrollo del <strong>Politécnico Grancolombiano</strong> como parte de los módulos de Front-End y Tecnologías Web.
              </p>
              <div style="background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 12px; color: var(--text-muted, #475569);">
                🔒 Contenido bajo licencia académica abierta &bull; 2026
              </div>
            </div>

            <div class="sidebar-card">
              <h4 class="sidebar-title">Noticias Relacionadas</h4>
              <div class="related-list">
                @for (rel of relatedNews(); track rel.id) {
                  <a [routerLink]="['/detalle', rel.id]" class="related-item">
                    <img [src]="rel.image" [alt]="rel.title" (error)="rel.image = 'img/default-news.svg'" />
                    <div>
                      <span class="related-cat">{{ rel.cat }}</span>
                      <h5>{{ rel.title }}</h5>
                    </div>
                  </a>
                }
              </div>
            </div>
          </aside>
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">⚠️</div>
          <h2>Artículo no encontrado</h2>
          <p>La publicación que estás buscando no existe o fue eliminada del sistema.</p>
          <a routerLink="/catalogo" class="btn btn-primary" style="margin-top: 14px;">Ir al Catálogo de Noticias</a>
        </div>
      }
    </main>
  `,
  styles: [`
    .breadcrumb-current {
      color: var(--text-main, #0f172a);
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 400px;
    }
    .meta-action-btns {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .is-fav-active {
      background: #fef3c7 !important;
      color: #d97706 !important;
      border-color: #f59e0b !important;
    }
    .lead-paragraph {
      font-size: 16px;
      font-weight: 500;
      color: var(--brand-navy, #002855);
      border-left: 4px solid var(--brand-cyan, #06b6d4);
      padding-left: 14px;
      margin-bottom: 20px;
    }
    .related-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .related-item {
      display: flex;
      gap: 12px;
      align-items: center;
      text-decoration: none;
      padding: 8px;
      border-radius: var(--radius-sm, 6px);
      transition: all 0.2s ease;
    }
    .related-item:hover {
      background: #f1f5f9;
    }
    .related-item img {
      width: 58px;
      height: 58px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .related-cat {
      font-size: 11px;
      color: var(--brand-blue, #0284c7);
      font-weight: 700;
      text-transform: uppercase;
    }
    .related-item h5 {
      font-size: 13px;
      line-height: 1.35;
      color: var(--brand-navy, #002855);
      margin-top: 2px;
    }
  `]
})
export class DetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private noticiasService = inject(NoticiasService);
  private favoritosService = inject(FavoritosService);
  private toastService = inject(ToastService);

  noticia = signal<Noticia | undefined>(undefined);
  relatedNews = signal<Noticia[]>([]);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.cargarDetalle(id);
    });
  }

  private cargarDetalle(id: number): void {
    const item = this.noticiasService.getNoticiaById(id);
    this.noticia.set(item);
    if (item) {
      this.relatedNews.set(this.noticiasService.getRelacionadas(item.cat, item.id, 3));
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  isFav(): boolean {
    const item = this.noticia();
    return item ? this.favoritosService.esFavorito(item.id) : false;
  }

  toggleFavorito(): void {
    const item = this.noticia();
    if (!item) return;
    const added = this.favoritosService.toggleFavorito(item.id);
    if (added) {
      this.toastService.show(`"${item.title.slice(0, 30)}..." guardada en favoritos ⭐`, 'success');
    } else {
      this.toastService.show(`Eliminada de tus favoritos`, 'info');
    }
  }

  copiarEnlace(): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.toastService.show('¡Enlace copiado al portapapeles! 🔗', 'success');
    }
  }

  getInitials(name: string): string {
    if (!name) return 'TN';
    const words = name.replace(/^(Ing\.|Dr\.|MSc\.|Lic\.|Arq\.)\s+/i, '').trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
}
