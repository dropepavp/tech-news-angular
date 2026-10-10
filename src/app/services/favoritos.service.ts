import { Injectable, signal, computed } from '@angular/core';

const FAVS_KEY = 'tech_news_favs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  readonly favoritosIds = signal<number[]>([]);
  readonly totalFavoritos = computed(() => this.favoritosIds().length);

  constructor() {
    this.loadFavoritos();
  }

  private loadFavoritos(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(FAVS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            this.favoritosIds.set(parsed);
          }
        }
      } catch (e) {
        console.error('Error al cargar favoritos de localStorage', e);
      }
    }
  }

  private saveFavoritos(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(FAVS_KEY, JSON.stringify(this.favoritosIds()));
      } catch (e) {
        console.error('Error al guardar favoritos en localStorage', e);
      }
    }
  }

  esFavorito(id: number): boolean {
    return this.favoritosIds().includes(id);
  }

  toggleFavorito(id: number): boolean {
    const current = this.favoritosIds();
    let isAdded = false;
    if (current.includes(id)) {
      this.favoritosIds.set(current.filter(favId => favId !== id));
      isAdded = false;
    } else {
      this.favoritosIds.set([...current, id]);
      isAdded = true;
    }
    this.saveFavoritos();
    return isAdded;
  }

  removerFavorito(id: number): void {
    this.favoritosIds.update(ids => ids.filter(favId => favId !== id));
    this.saveFavoritos();
  }

  limpiarFavoritos(): void {
    this.favoritosIds.set([]);
    this.saveFavoritos();
  }
}
