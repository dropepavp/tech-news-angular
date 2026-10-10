import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule, NoticiaCardComponent],
  template: `
    <main class="container">
      <div class="section-header">
        <div>
          <h1 class="section-title">Catálogo de Noticias & Experiencias</h1>
          <p class="section-subtitle">Explora artículos especializados, filtra por área de interés o busca temas concretos.</p>
        </div>
        <span class="results-badge">
          Mostrando {{ filteredNoticias().length }} de {{ noticiasService.noticias().length }} artículos
        </span>
      </div>

      <!-- CONTROLES DE FILTRO Y BÚSQUEDA -->
      <div class="controls-bar">
        <!-- Buscador -->
        <div class="search-input-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Buscar por título, contenido o autor..." 
          />
          @if (searchQuery()) {
            <button class="clear-search-btn" (click)="searchQuery.set('')">✕</button>
          }
        </div>

        <!-- Categorías -->
        <div class="category-pills">
          @for (cat of categories; track cat.id) {
            <button 
              type="button"
              class="pill-btn" 
              [class.active]="selectedCategory() === cat.id"
              (click)="selectedCategory.set(cat.id)">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Selector de Ordenamiento -->
        <div class="sort-box">
          <label for="catalog-sort">Ordenar:</label>
          <select id="catalog-sort" [(ngModel)]="sortBy">
            <option value="latest">Más recientes</option>
            <option value="title">Título (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- GRID DINÁMICO DE NOTICIAS -->
      @if (filteredNoticias().length > 0) {
        <div class="catalog-grid">
          @for (noticia of filteredNoticias(); track noticia.id) {
            <app-noticia-card [noticia]="noticia"></app-noticia-card>
          }
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">🔎</div>
          <h3>No se encontraron publicaciones</h3>
          <p>No hay artículos que coincidan con "{{ searchQuery() }}" en la categoría seleccionada.</p>
          <button class="btn btn-secondary" (click)="resetFiltros()">Limpiar Filtros</button>
        </div>
      }
    </main>
  `,
  styles: [`
    .results-badge {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--text-muted, #475569);
      background: #f1f5f9;
      padding: 6px 14px;
      border-radius: 9999px;
    }
    .sort-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sort-box label {
      font-size: 13px;
      color: var(--text-muted, #475569);
      font-weight: 500;
    }
    .sort-box select {
      padding: 6px 12px;
      border-radius: var(--radius-sm, 6px);
      border: 1px solid var(--border-color, #e2e8f0);
      font-size: 13px;
      outline: none;
      background: white;
    }
    .clear-search-btn {
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 14px;
      padding: 0 4px;
    }
    .clear-search-btn:hover {
      color: #0f172a;
    }
  `]
})
export class CatalogoComponent implements OnInit {
  noticiasService = inject(NoticiasService);
  private route = inject(ActivatedRoute);

  searchQuery = signal('');
  selectedCategory = signal('all');
  sortBy = signal<'latest' | 'title'>('latest');

  readonly categories = [
    { id: 'all', label: 'Todas' },
    { id: 'Desarrollo Web', label: 'Desarrollo Web' },
    { id: 'Inteligencia Artificial', label: 'IA' },
    { id: 'Ciberseguridad', label: 'Ciberseguridad' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'Experiencias Tech', label: 'Experiencias Tech' }
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['cat']) {
        this.selectedCategory.set(params['cat']);
      }
    });
  }

  filteredNoticias = computed(() => {
    let list = [...this.noticiasService.noticias()];
    const cat = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();

    if (cat !== 'all') {
      list = list.filter(n => n.cat === cat);
    }

    if (query) {
      list = list.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.desc.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query) ||
        n.author.toLowerCase().includes(query)
      );
    }

    if (this.sortBy() === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  });

  resetFiltros(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
  }
}
