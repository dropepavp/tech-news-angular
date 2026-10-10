import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-gestion',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main class="container">
      <div class="section-header">
        <div>
          <h1 class="section-title">Laboratorio de Experiencias Dev</h1>
          <p class="section-subtitle">Publica nuevas investigaciones técnicas o administra los artículos existentes en tiempo real.</p>
        </div>
        <button class="btn btn-secondary" (click)="restaurarDatos()">
          🔄 Restaurar Datos Iniciales
        </button>
      </div>

      <div class="gestion-grid">
        <!-- FORMULARIO DE CREACIÓN -->
        <div class="form-card">
          <h3 class="form-title">➕ Redactar y Publicar Noticia</h3>

          <form (ngSubmit)="publicarNoticia()" #newsForm="ngForm">
            <div class="form-group">
              <label class="form-label" for="news-title">Título de la Noticia *</label>
              <input 
                type="text" 
                id="news-title" 
                name="title" 
                class="form-control" 
                [(ngModel)]="formTitle" 
                placeholder="Ej: Nuevas capacidades de WebGPU en 2026" 
                required 
                minlength="5"
                #titleCtrl="ngModel"
              />
              @if (titleCtrl.invalid && titleCtrl.touched) {
                <span class="error-msg">El título es requerido (mínimo 5 caracteres).</span>
              }
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="news-cat">Categoría *</label>
                <select 
                  id="news-cat" 
                  name="cat" 
                  class="form-control" 
                  [(ngModel)]="formCat" 
                  required
                >
                  <option value="">Selecciona una categoría...</option>
                  <option value="Desarrollo Web">Desarrollo Web</option>
                  <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                  <option value="Ciberseguridad">Ciberseguridad</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Experiencias Tech">Experiencias Tech</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="news-author">Autor / Redactor</label>
                <input 
                  type="text" 
                  id="news-author" 
                  name="author" 
                  class="form-control" 
                  [(ngModel)]="formAuthor" 
                  placeholder="Ej: Ing. María Torres" 
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="news-readtime">Tiempo de Lectura</label>
                <input 
                  type="text" 
                  id="news-readtime" 
                  name="readTime" 
                  class="form-control" 
                  [(ngModel)]="formReadTime" 
                  placeholder="Ej: 5 min" 
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="news-image">Ilustración Local</label>
                <select id="news-image" name="image" class="form-control" [(ngModel)]="formImage">
                  <option value="img/microservices-architecture.svg">🚀 Microservicios & Red</option>
                  <option value="img/web-development.svg">🌐 Desarrollo Web & Front-End</option>
                  <option value="img/angular-signals.svg">⚡ Angular 19 & Signals</option>
                  <option value="img/ai-apis.svg">🧠 IA & LLMs Autónomos</option>
                  <option value="img/cybersecurity-zerotrust.svg">🛡️ Ciberseguridad Zero Trust</option>
                  <option value="img/cloud-wasm.svg">☁️ Cloud & WebAssembly</option>
                  <option value="img/digital-twins.svg">🕶️ Gemelos Digitales & AR</option>
                  <option value="img/css-animations.svg">🎨 CSS Cascade & Animaciones</option>
                  <option value="img/default-news.svg">🖼️ Logotipo / Laboratorio</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="news-desc">Descripción Breve (Resumen) *</label>
              <textarea 
                id="news-desc" 
                name="desc" 
                class="form-control" 
                rows="2" 
                [(ngModel)]="formDesc" 
                placeholder="Breve resumen para la tarjeta..." 
                required
                minlength="10"
                #descCtrl="ngModel"
              ></textarea>
              @if (descCtrl.invalid && descCtrl.touched) {
                <span class="error-msg">La descripción es requerida (mínimo 10 caracteres).</span>
              }
            </div>

            <div class="form-group">
              <label class="form-label" for="news-content">Contenido Completo del Artículo *</label>
              <textarea 
                id="news-content" 
                name="content" 
                class="form-control" 
                rows="4" 
                [(ngModel)]="formContent" 
                placeholder="Escribe el cuerpo completo de la investigación..." 
                required
                minlength="20"
                #contentCtrl="ngModel"
              ></textarea>
              @if (contentCtrl.invalid && contentCtrl.touched) {
                <span class="error-msg">El contenido es requerido (mínimo 20 caracteres).</span>
              }
            </div>

            <div class="form-group-checkbox">
              <label>
                <input type="checkbox" name="featured" [(ngModel)]="formFeatured" />
                <span>Marcar como Noticia Destacada</span>
              </label>
            </div>

            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="newsForm.invalid" 
              style="width: 100%; padding: 12px;"
            >
              Publicar Noticia
            </button>
          </form>
        </div>

        <!-- TABLA DE ARTÍCULOS EXISTENTES -->
        <div class="form-card table-card">
          <div class="table-header-box">
            <h3 class="form-title" style="margin-bottom: 0;">📋 Artículos en el Sistema</h3>
            <span class="table-count-badge">{{ noticiasService.noticias().length }} registros</span>
          </div>

          <div class="table-responsive">
            <table class="news-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título & Categoría</th>
                  <th>Autor</th>
                  <th style="text-align: right;">Acciones</th>
                </tr>
              </thead>
              <tbody>
                @for (item of noticiasService.noticias(); track item.id) {
                  <tr>
                    <td class="table-img-td">
                      <img [src]="item.image" [alt]="item.title" (error)="item.image = 'img/default-news.svg'" />
                    </td>
                    <td>
                      <div class="table-title-wrap">
                        <a [routerLink]="['/detalle', item.id]" class="table-news-link">{{ item.title }}</a>
                        <span class="table-cat-tag">{{ item.cat }}</span>
                      </div>
                    </td>
                    <td class="table-author-td">{{ item.author }}</td>
                    <td style="text-align: right;">
                      <button 
                        type="button" 
                        class="btn-delete" 
                        (click)="eliminar(item.id, item.title)" 
                        title="Eliminar publicación"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .gestion-grid {
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      gap: 32px;
      margin-bottom: 40px;
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
      margin-bottom: 16px;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
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
      padding: 9px 12px;
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
    .form-group-checkbox {
      margin-bottom: 20px;
    }
    .form-group-checkbox label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--text-main, #0f172a);
      cursor: pointer;
    }
    .table-header-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .table-count-badge {
      font-size: 12px;
      font-weight: 600;
      background: #f1f5f9;
      color: var(--text-muted, #475569);
      padding: 4px 10px;
      border-radius: 9999px;
    }
    .table-responsive {
      overflow-x: auto;
      max-height: 600px;
      overflow-y: auto;
    }
    .news-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .news-table th {
      background: #f8fafc;
      color: var(--text-muted, #475569);
      font-weight: 600;
      text-align: left;
      padding: 10px;
      border-bottom: 2px solid var(--border-color, #e2e8f0);
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .news-table td {
      padding: 12px 10px;
      border-bottom: 1px solid var(--border-color, #e2e8f0);
      vertical-align: middle;
    }
    .table-img-td img {
      width: 44px;
      height: 44px;
      border-radius: 6px;
      object-fit: cover;
    }
    .table-title-wrap {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .table-news-link {
      color: var(--brand-navy, #002855);
      font-weight: 600;
      text-decoration: none;
      line-height: 1.3;
    }
    .table-news-link:hover {
      color: var(--brand-blue, #0284c7);
    }
    .table-cat-tag {
      font-size: 11px;
      color: var(--text-light, #64748b);
    }
    .table-author-td {
      color: var(--text-muted, #475569);
      font-size: 12px;
      white-space: nowrap;
    }
    .btn-delete {
      background: #fee2e2;
      border: 1px solid #fca5a5;
      color: #b91c1c;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .btn-delete:hover {
      background: #fecaca;
    }
    @media (max-width: 960px) {
      .gestion-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GestionComponent {
  noticiasService = inject(NoticiasService);
  private toastService = inject(ToastService);

  formTitle = '';
  formCat = 'Desarrollo Web';
  formAuthor = 'Investigador Subgrupo 19';
  formReadTime = '4 min';
  formImage = 'img/angular-signals.svg';
  formDesc = '';
  formContent = '';
  formFeatured = false;

  publicarNoticia(): void {
    if (!this.formTitle.trim() || !this.formDesc.trim() || !this.formContent.trim()) {
      this.toastService.show('Por favor completa todos los campos requeridos', 'warning');
      return;
    }

    const today = new Date();
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const fechaFormateada = `${today.getDate()} ${meses[today.getMonth()]} ${today.getFullYear()}`;

    const nueva = this.noticiasService.agregarNoticia({
      cat: this.formCat,
      title: this.formTitle.trim(),
      desc: this.formDesc.trim(),
      content: this.formContent.trim(),
      author: this.formAuthor.trim() || 'Equipo Editorial',
      readTime: this.formReadTime.trim() || '4 min',
      image: this.formImage || 'img/default-news.svg',
      featured: this.formFeatured,
      date: fechaFormateada
    });

    this.toastService.show(`¡Noticia "${nueva.title.slice(0, 25)}..." publicada con éxito!`, 'success');

    // Limpiar formulario
    this.formTitle = '';
    this.formDesc = '';
    this.formContent = '';
    this.formFeatured = false;
  }

  eliminar(id: number, title: string): void {
    if (confirm(`¿Estás seguro de eliminar la noticia "${title}"?`)) {
      this.noticiasService.eliminarNoticia(id);
      this.toastService.show('Noticia eliminada del sistema', 'info');
    }
  }

  restaurarDatos(): void {
    if (confirm('¿Deseas restaurar las noticias a su estado inicial predeterminado?')) {
      this.noticiasService.restaurarDatosIniciales();
      this.toastService.show('Se han restaurado los datos iniciales de las noticias', 'success');
    }
  }
}
