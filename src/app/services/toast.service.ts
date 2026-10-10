import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  show(text: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration = 3200): void {
    const id = ++this.counter;
    const toast: ToastMessage = { id, text, type };
    this.toasts.update(current => [...current, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
