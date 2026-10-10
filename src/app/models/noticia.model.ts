export interface Noticia {
  id: number;
  cat: string;
  title: string;
  desc: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  content: string;
}

export interface ContactoMensaje {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  fecha?: string;
}

export interface ToastMessage {
  id: number;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
