import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Tech News & Lab | Inicio e Innovación Digital' },
  { path: 'catalogo', component: CatalogoComponent, title: 'Tech News & Lab | Catálogo de Noticias' },
  { path: 'detalle/:id', component: DetalleComponent, title: 'Tech News & Lab | Detalle de Noticia' },
  { path: 'favoritos', component: FavoritosComponent, title: 'Tech News & Lab | Mis Favoritos' },
  { path: 'gestion', component: GestionComponent, title: 'Tech News & Lab | Experiencias Dev & Publicación' },
  { path: 'contacto', component: ContactoComponent, title: 'Tech News & Lab | Contacto y Soporte' },
  { path: '**', redirectTo: '' }
];
