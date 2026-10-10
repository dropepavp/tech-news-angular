# INFORME TÉCNICO DE PROYECTO
## Desarrollo de Aplicación Web en Angular: Portal "Tech News & Lab"

---

### **DATOS DE IDENTIFICACIÓN**
* **Nombre del Proyecto:** Tech News & Lab (Portal de Innovación y Experiencias Tecnológicas)
* **Framework:** Angular 19+ (Arquitectura Standalone con Signals)
* **Lenguaje:** TypeScript / HTML5 / CSS3 Moderno
* **Fecha de Entrega:** Octubre 2026
* **Estado del Proyecto:** Completado y Validado

---

## 1. RESUMEN EJECUTIVO

El presente proyecto consiste en el desarrollo de una aplicación web de página única (**SPA - Single Page Application**) construida sobre el framework **Angular**, orientada a la difusión, catálogo, lectura y administración de noticias e investigaciones del sector tecnológico.

El desarrollo da cumplimiento riguroso a los criterios establecidos:
1. **Implementación en Angular:** Arquitectura modular basada en componentes independientes (*Standalone Components*), directivas estructurales y de control de flujo modernas (`@if`, `@for`), sistema de enrutamiento dinámico y aplicación exhaustiva de los tipos de enlace de datos (*Data Binding*).
2. **Código Organizado y Documentado:** Estructura de carpetas por capas y responsabilidades (Componentes, Páginas, Modelos, Servicios), tipado estricto mediante TypeScript, reactividad con *Angular Signals* y persistencia de datos local en `localStorage`.

---

## 2. OBJETIVOS DEL PROYECTO

### 2.1. Objetivo General
Diseñar e implementar una aplicación web moderna, interactiva y accesible en Angular que permita la consulta, filtrado, guardado y gestión de contenidos técnicos en tiempo real.

### 2.2. Objetivos Específicos
* Implementar componentes desacoplados y reutilizables bajo la especificación *Standalone*.
* Aplicar los 4 tipos fundamentales de *Data Binding* en Angular (Interpolación, Property Binding, Event Binding y Two-Way Binding).
* Integrar un sistema de estado reactivo mediante *Angular Signals* y servicios inyectables (`@Injectable`).
* Proveer un flujo de navegación completo con rutas dedicadas (`/`, `/catalogo`, `/detalle/:id`, `/favoritos`, `/gestion`, `/contacto`).
* Garantizar una experiencia de usuario (UX/UI) responsiva, intuitiva y con retroalimentación en tiempo real (notificaciones *Toast*).

---

## 3. ARQUITECTURA Y ESTRUCTURA DEL CÓDIGO

La aplicación adopta el patrón de arquitectura por separación de capas y responsabilidades (*Layered Architecture*), organizada en la siguiente jerarquía de directorios:

```
src/
└── app/
    ├── components/         --> Componentes de interfaz reutilizables
    │   ├── footer/         --> Pie de página institucional y enlaces
    │   ├── navbar/         --> Barra de navegación con conteo reactivo
    │   ├── noticia-card/   --> Tarjeta modular para visualización de noticias
    │   └── toast/          --> Sistema flotante de alertas y notificaciones
    ├── models/             --> Definición de tipos e interfaces TypeScript
    │   └── noticia.model.ts--> Contratos de datos (Noticia, ContactoMensaje, Toast)
    ├── pages/              --> Vistas principales asociadas a rutas
    │   ├── home/           --> Página de bienvenida, Hero y noticias destacadas
    │   ├── catalogo/       --> Catálogo completo con buscador y filtros
    │   ├── detalle/        --> Vista de lectura profunda y noticias relacionadas
    │   ├── favoritos/      --> Listado de artículos marcados por el usuario
    │   ├── gestion/        --> Panel administrativo y formulario de publicación
    │   └── contacto/       --> Formulario de contacto con soporte
    ├── services/           --> Servicios singleton y lógica de negocio
    │   ├── noticias.service.ts  --> Gestión central del estado con Signals y persistencia
    │   ├── favoritos.service.ts --> Lógica de almacenamiento y toggle de favoritos
    │   └── toast.service.ts     --> Emisión de notificaciones globales
    ├── app.config.ts       --> Configuración de proveedores y enrutador
    ├── app.routes.ts       --> Mapeo de rutas con títulos de página SEO
    ├── app.html / app.ts   --> Componente raíz (Shell de la aplicación)
    └── styles.css          --> Variables CSS, diseño tipográfico y utilidades globales
```

---

## 4. MATRIZ DE CUMPLIMIENTO TÉCNICO

### 4.1. Implementación de Componentes
| Componente | Tipo | Función Principal |
| :--- | :--- | :--- |
| **`AppComponent`** | Raíz | Orquestador principal, renderiza Navbar, `<router-outlet />`, Footer y Toast. |
| **`NavbarComponent`** | UI / Navegación | Barra superior de navegación con indicador en vivo del número de favoritos guardados. |
| **`NoticiaCardComponent`** | UI Reutilizable | Tarjeta de artículo con botón de guardado en favoritos, control de errores de imagen y enlace de detalle. |
| **`ToastComponent`** | UI Feedback | Renderizado de mensajes flotantes de confirmación, advertencia o error. |
| **`HomeComponent`** | Página | Portada principal con artículo destacado (*Hero Banner*) y grilla de artículos relevantes. |
| **`CatalogoComponent`** | Página | Catálogo dinámico con búsqueda por texto, filtro de categorías y ordenamiento múltiple. |
| **`DetalleComponent`** | Página | Vista detallada del artículo según el parámetro `:id` en ruta y sugerencias relacionadas. |
| **`FavoritosComponent`** | Página | Consulta de artículos favoritos del usuario con opción de eliminación rápida. |
| **`GestionComponent`** | Página | Formulario de publicación con validaciones reactivas y tabla CRUD de artículos. |
| **`ContactoComponent`** | Página | Formulario validado de contacto y envío simulado con retroalimentación. |

---

### 4.2. Evidencia de Tipos de Data Binding Implementados

#### A. Interpolación (`{{ expresion }}`)
Permite proyectar valores calculados o propiedades del componente en la plantilla HTML:
```html
<h3 class="card-title">{{ noticia.title }}</h3>
<span class="card-date">{{ noticia.date }} &bull; {{ noticia.readTime }}</span>
<span class="table-count-badge">{{ noticiasService.noticias().length }} registros</span>
```

#### B. Property Binding (`[propiedad]="expresion"`)
Permite enlazar valores de TypeScript directamente a propiedades de elementos del DOM o directivas:
```html
<img [src]="noticia.image" [alt]="noticia.title" />
<button [class.is-fav]="isFav()" [disabled]="newsForm.invalid">
<a [routerLink]="['/detalle', noticia.id]">
```

#### C. Event Binding (`(evento)="manejador()"`)
Permite capturar acciones del usuario (clicks, envíos de formulario, errores de carga) para ejecutar métodos en la clase TypeScript:
```html
<button type="button" (click)="toggleFavorito($event)">★</button>
<form (ngSubmit)="publicarNoticia()" #newsForm="ngForm">
<img (error)="onImgError($event)" />
```

#### D. Two-Way Data Binding (`[(ngModel)]="propiedad"`)
Sincroniza de forma bidireccional el estado del modelo con los campos del formulario en tiempo real:
```html
<input type="text" [(ngModel)]="formTitle" name="title" required minlength="5" />
<select [(ngModel)]="formCat" name="cat" required> ... </select>
<input type="text" [(ngModel)]="searchQuery" placeholder="Buscar..." />
```

#### E. Reactividad Moderna con Signals (`signal` y `computed`)
Se emplean Signals para una reactividad de alto rendimiento y detección de cambios granular:
```typescript
// En NoticiasService:
noticias = signal<Noticia[]>([]);

// En CatalogoComponent (filtrado reactivo en memoria):
filteredNoticias = computed(() => {
  let list = [...this.noticiasService.noticias()];
  const cat = this.selectedCategory();
  const query = this.searchQuery().trim().toLowerCase();
  if (cat !== 'all') list = list.filter(n => n.cat === cat);
  if (query) list = list.filter(n => n.title.toLowerCase().includes(query));
  return list;
});
```

---

## 5. FUNCIONALIDADES DESTACADAS DE LA APLICACIÓN

1. **Persistencia de Datos Híbrida:** Los datos de noticias y favoritos se cargan inicialmente desde un dataset predeterminado y se sincronizan en `localStorage`, garantizando persistencia ante recargas de página sin requerir base de datos externa.
2. **Filtrado y Búsqueda en Vivo:** Algoritmo de filtrado combinatorio sin latencia basado en Signals computadas.
3. **Validación de Formularios:** Formulario de redacción de artículos con validación de campos obligatorios, longitud mínima de títulos y control de estado de botón `[disabled]`.
4. **Diseño Responsivo y Accesible:** Hoja de estilos con variables CSS (`custom properties`), diseño adaptable a dispositivos móviles, tablets y monitores de escritorio.

---

## 6. INSTRUCCIONES DE EJECUCIÓN Y VALIDACIÓN

1. **Requisitos de entorno:**
   * Node.js v18.0 o superior.
   * NPM v9.0 o superior.

2. **Comandos de ejecución:**
   ```bash
   # 1. Instalar dependencias del proyecto
   npm install

   # 2. Iniciar el servidor local
   npm start
   ```

3. **Verificación en el navegador:**
   * Acceder a `http://localhost:4200/`.
   * Probar la navegación entre las secciones *Inicio*, *Catálogo*, *Favoritos*, *Gestión Dev* y *Contacto*.
   * Crear una nueva noticia en la sección *Gestión* y comprobar su aparición inmediata en el *Catálogo*.
   * Marcar y desmarcar artículos favoritos y validar la sincronización del contador en la barra de navegación.

---

## 7. CONCLUSIONES

* Se logró una solución técnica robusta, escalable y acorde a las especificaciones contemporáneas de Angular.
* La separación clara de responsabilidades en componentes, servicios y modelos facilita el mantenimiento, testing y extensión de funcionalidades futuras.
* El uso de los 4 tipos de Data Binding junto con Angular Signals asegura una interfaz fluida, interactiva y con excelente rendimiento para el usuario final.
