# 🌐 Tech News & Lab — Portal de Innovación y Experiencias Tecnológicas

Aplicación web moderna desarrollada en **Angular** para la difusión, gestión y consulta de artículos técnicos, investigaciones y experiencias del sector tecnológico.

---

## 📋 Tabla de Contenidos
- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Implementación Técnica en Angular](#-implementación-técnica-en-angular)
  - [Componentes Standalone](#componentes-standalone)
  - [Manejo de Data Binding](#manejo-de-data-binding)
  - [Gestión de Estado Reactivo](#gestión-de-estado-reactivo)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
- [Scripts Disponibles](#-scripts-disponibles)
- [Autores y Créditos](#-autores-y-créditos)

---

## ✨ Características Principales

1. **📰 Portal de Noticias y Artículos:**
   - Visualización de artículos destacados y categorizados (*Desarrollo Web, Inteligencia Artificial, Ciberseguridad, Cloud & DevOps, Experiencias Tech*).
   - Lectura individualizada con vista de detalle completa y artículos relacionados por afinidad temática.

2. **🔍 Catálogo Dinámico con Búsqueda y Filtros:**
   - Filtrado instantáneo por categoría temática.
   - Búsqueda en tiempo real por título, contenido o autor.
   - Ordenamiento dinámico (cronológico y alfabético).

3. **⭐ Gestión de Favoritos:**
   - Marcador interactivo de artículos favoritos persistente en `localStorage`.
   - Sección dedicada para consultar y gestionar los favoritos guardados.

4. **⚙️ Laboratorio Dev (Panel de Publicación y Gestión):**
   - Formulario de creación y publicación de nuevos artículos con validaciones en tiempo real.
   - Listado administrativo interactivo con opción de eliminación inmediata.
   - Opción para restaurar los datos iniciales de fábrica.

5. **✉️ Centro de Contacto:**
   - Formulario de soporte y retroalimentación con validación de campos.
   - Notificaciones interactivas tipo *Toast* con temporizador automático.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura desacoplada basada en capas bien definidas:

```
src/app/
 ├── components/     # Componentes visuales reutilizables e independientes
 ├── pages/          # Páginas/vistas asociadas al enrutador (SPA)
 ├── services/       # Lógica de negocio, reactividad (Signals) y persistencia
 ├── models/         # Interfaces y contratos de datos fuertemente tipados
 └── app.routes.ts   # Definición de rutas y metadatos de navegación
```

---

## ⚡ Implementación Técnica en Angular

### Componentes Standalone
El proyecto prescinde de `NgModule` en favor de la arquitectura moderna de **Standalone Components**, permitiendo una carga más ligera, modular y eficiente:
- `NoticiaCardComponent`: Tarjeta reutilizable con binding de favoritos y ruteo dinámico.
- `NavbarComponent` & `FooterComponent`: Encabezado y pie de página accesibles y responsivos.
- `ToastComponent`: Sistema global de alertas emergentes reactivas.

### Manejo de Data Binding
Se implementaron de forma explícita todos los tipos de enlace de datos de Angular:
* **Interpolación (`{{ }}`):** Renderizado de variables, textos, contadores y formatos (`{{ noticia.title }}`, `{{ isFav() ? '★' : '☆' }}`).
* **Property Binding (`[prop]`):** Enlace dinámico de atributos DOM y directivas (`[src]`, `[alt]`, `[class.active]`, `[disabled]`, `[routerLink]`).
* **Event Binding (`(event)`):** Captura y delegación de eventos (`(click)`, `(ngSubmit)`, `(error)`).
* **Two-Way Binding (`[(ngModel)]`):** Enlace bidireccional sincronizado en inputs de texto, selectores y formularios de gestión.
* **Property Decorators & Signals:** Comunicación entre componentes mediante `@Input({ required: true })` y reactividad con `signal()` y `computed()`.

### Gestión de Estado Reactivo
* **Angular Signals:** Utilización de `signal()` y funciones computadas (`computed()`) en `NoticiasService` y `FavoritosService` para actualizar la interfaz automáticamente sin sobrecosto de detección de cambios.
* **Persistencia Local:** Sincronización en `localStorage` con fallback tolerante a fallos para conservar los cambios del usuario entre sesiones.

---

## 📂 Estructura del Proyecto

```text
tech-New-angular/
├── public/
│   └── img/                         # Ilustraciones y recursos gráficos SVG
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── footer/              # Componente de pie de página
│   │   │   ├── navbar/              # Barra de navegación principal
│   │   │   ├── noticia-card/        # Card modular para artículos
│   │   │   └── toast/               # Notificaciones flotantes
│   │   ├── models/
│   │   │   └── noticia.model.ts     # Interfaces TypeScript (Noticia, ContactoMensaje, etc.)
│   │   ├── pages/
│   │   │   ├── catalogo/            # Vista de catálogo, filtros y buscador
│   │   │   ├── contacto/            # Vista de contacto con formulario
│   │   │   ├── detalle/             # Vista de detalle de artículo
│   │   │   ├── favoritos/           # Vista de noticias marcadas como favoritas
│   │   │   ├── gestion/             # Panel CRUD y administración de noticias
│   │   │   └── home/                # Página de inicio con hero y destacados
│   │   ├── services/
│   │   │   ├── favoritos.service.ts # Servicio de gestión de favoritos
│   │   │   ├── noticias.service.ts  # Servicio principal de noticias con Signals
│   │   │   └── toast.service.ts     # Servicio reactivo de notificaciones Toast
│   │   ├── app.config.ts            # Configuración de proveedores globales
│   │   ├── app.routes.ts            # Mapeo de rutas de la aplicación
│   │   ├── app.html                 # Shell principal de la app
│   │   └── app.ts                   # Componente raíz
│   ├── index.html                   # HTML base de la aplicación
│   ├── main.ts                      # Punto de arranque de la aplicación Angular
│   └── styles.css                   # Sistema de diseño CSS global y variables
├── angular.json                     # Configuración del workspace de Angular CLI
├── package.json                     # Dependencias y scripts del proyecto
└── tsconfig.json                    # Configuración del compilador TypeScript
```

---

## 🚀 Requisitos Previos

- **Node.js:** Versión 18.x, 20.x o superior.
- **NPM:** Versión 9.x o superior.
- **Angular CLI:** Versión 19/22 (opcional, el proyecto incluye scripts locales).

---

## 💻 Instalación y Puesta en Marcha

1. **Clonar o abrir el repositorio:**
   ```bash
   cd tech-New-angular
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   # o bien: ng serve
   ```

4. **Acceder a la aplicación:**
   Abre tu navegador web e ingresa a:
   ```
   http://localhost:4200/
   ```

---

## 📜 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor de desarrollo local con recarga en vivo en `http://localhost:4200/`. |
| `npm run build` | Compila el proyecto y genera el bundle optimizado para producción en `dist/`. |
| `npm run watch` | Compila en modo desarrollo con escucha activa de cambios en archivos. |
| `npm test` | Ejecuta las pruebas unitarias mediante el runner configurado. |

---

## 👥 Autores y Créditos
- **Proyecto:** Tech News & Lab
- Desarrollo y Despliegue de Aplicación Web Front-End en Angular: Portal de Noticias "Tech News & Lab"
- **Módulo:** Front-End Development — Angular
- **Tecnologías:** Angular, TypeScript, HTML5, CSS3 Moderno, Angular Signals.
- Sonia Homez Homez
-Santiago Isaza Lema
-Pedro Alejandro Varela Pinzón

