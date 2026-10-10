import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, NoticiaCardComponent],
  template: `
    <main class="container">
      <!-- HERO SECTION -->
      @if (heroArticle(); as hero) {
        <section class="hero-card">
          <div class="hero-content">
            <span class="hero-tag">EXPERIENCIA DESTACADA</span>
            <h1 class="hero-title">{{ hero.title }}</h1>
            <p class="hero-desc">{{ hero.desc }}</p>
            <div class="hero-actions">
              <a [routerLink]="['/detalle', hero.id]" class="btn btn-primary">Leer Experiencia Completa →</a>
              <a routerLink="/catalogo" class="btn btn-secondary">Ver Catálogo</a>
            </div>
          </div>
          <div class="hero-image-wrap">
            <img [src]="hero.image" [alt]="hero.title" (error)="hero.image = 'img/default-news.svg'" />
          </div>
        </section>
      }

      <!-- STATS STRIP -->
      <section class="stats-strip">
        <div class="stat-card">
          <div class="stat-icon">📰</div>
          <div>
            <div class="stat-number">{{ noticiasService.noticias().length }}</div>
            <div class="stat-label">Artículos Publicados</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div>
            <div class="stat-number">100%</div>
            <div class="stat-label">Angular Signals & SPA</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div>
            <div class="stat-number">+12k</div>
            <div class="stat-label">Lectores Mensuales</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎓</div>
          <div>
            <div class="stat-number">Subgrupo 19</div>
            <div class="stat-label">Poli Front-End 2026</div>
          </div>
        </div>
      </section>

      <!-- NOTICIAS DESTACADAS -->
      <section style="margin-bottom: 40px;">
        <div class="section-header">
          <div>
            <h2 class="section-title">Noticias Destacadas</h2>
            <p class="section-subtitle">Las publicaciones más leídas y relevantes de esta semana.</p>
          </div>
          <a routerLink="/catalogo" class="btn btn-secondary">Ver Catálogo Completo →</a>
        </div>

        <div class="catalog-grid">
          @for (noticia of featuredNews(); track noticia.id) {
            <app-noticia-card [noticia]="noticia"></app-noticia-card>
          }
        </div>
      </section>

      <!-- TESTIMONIOS Y COMUNIDAD -->
      <section>
        <div class="section-header">
          <div>
            <h2 class="section-title">Experiencias y Testimonios</h2>
            <p class="section-subtitle">Lo que nuestra comunidad de estudiantes e investigadores opina.</p>
          </div>
        </div>

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <p class="testimonial-text">
              "La profundidad de los artículos de arquitectura en Angular y WebAssembly nos ayudó a optimizar nuestro proyecto de semestre."
            </p>
            <div class="testimonial-user">
              <div class="testimonial-avatar">SH</div>
              <div>
                <strong style="font-size: 13.5px; display: block; color: var(--brand-navy, #002855);">Sonia Homez Homez</strong>
                <span style="font-size: 12px; color: var(--text-muted, #475569);">Investigadora Subgrupo 19</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <p class="testimonial-text">
              "La interfaz en Angular es ultra fluida, rápida y la reactividad de favoritos con Signals facilita guardar referencias técnicas."
            </p>
            <div class="testimonial-user">
              <div class="testimonial-avatar">SI</div>
              <div>
                <strong style="font-size: 13.5px; display: block; color: var(--brand-navy, #002855);">Santiago Isaza Lema</strong>
                <span style="font-size: 12px; color: var(--text-muted, #475569);">Desarrollador Front-End</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <p class="testimonial-text">
              "Excelente fuente de consulta sobre seguridad Zero Trust y buenas prácticas de consumo de APIs reactivas en tiempo real."
            </p>
            <div class="testimonial-user">
              <div class="testimonial-avatar">PV</div>
              <div>
                <strong style="font-size: 13.5px; display: block; color: var(--brand-navy, #002855);">Pedro Alejandro Varela</strong>
                <span style="font-size: 12px; color: var(--text-muted, #475569);">Estudiante Ingeniería Poli</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class HomeComponent {
  noticiasService = inject(NoticiasService);

  heroArticle() {
    return this.noticiasService.getHero();
  }

  featuredNews() {
    const featured = this.noticiasService.getDestacadas();
    return featured.length > 0 ? featured : this.noticiasService.noticias().slice(0, 3);
  }
}
