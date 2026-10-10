import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';
import { ToastService } from '../../services/toast.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, RouterLink, NoticiaCardComponent],
  template: `
    <main class="container">
      <div class="section-header">
        <div>
          <h1 class="section-title">Mis Noticias Favoritas</h1>
          <p class="section-subtitle">Tu colección personalizada almacenada en el navegador (LocalStorage & Signals).</p>
        </div>

        <div class="header-actions">
          <span class="fav-counter-badge">
            ⭐ {{ favoritosService.totalFavoritos() }} guardadas
          </span>
          @if (favoritosService.totalFavoritos() > 0) {
            <button class="btn btn-danger" (click)="vaciarFavoritos()">
              Vaciar Favoritos
            </button>
          }
        </div>
      </div>

      <!-- GRID DE FAVORITOS O ESTADO VACÍO -->
      @if (favoritasList().length > 0) {
        <div class="catalog-grid">
          @for (noticia of favoritasList(); track noticia.id) {
            <app-noticia-card [noticia]="noticia"></app-noticia-card>
          }
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">⭐</div>
          <h3>Aún no tienes noticias favoritas</h3>
          <p>Explora nuestro catálogo técnico y guarda los artículos que más te interesen para leerlos más tarde.</p>
          <a routerLink="/catalogo" class="btn btn-primary" style="margin-top: 14px;">Explorar Catálogo →</a>
        </div>
      }
    </main>
  `,
  styles: [`
    .header-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .fav-counter-badge {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--accent-fav, #f59e0b);
      background: rgba(245, 158, 11, 0.12);
      padding: 6px 14px;
      border-radius: 9999px;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
  `]
})
export class FavoritosComponent {
  favoritosService = inject(FavoritosService);
  private noticiasService = inject(NoticiasService);
  private toastService = inject(ToastService);

  favoritasList = computed(() => {
    const ids = this.favoritosService.favoritosIds();
    const all = this.noticiasService.noticias();
    return all.filter(n => ids.includes(n.id));
  });

  vaciarFavoritos(): void {
    if (confirm('¿Estás seguro de que deseas eliminar todas las noticias de tus favoritos?')) {
      this.favoritosService.limpiarFavoritos();
      this.toastService.show('Se han eliminado todos los favoritos', 'info');
    }
  }
}
