import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div class="toast-container" aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="custom-toast" [class]="'toast-' + toast.type" (click)="toastService.remove(toast.id)">
          <span class="toast-icon">
            @if (toast.type === 'success') { ✅ }
            @else if (toast.type === 'error') { ❌ }
            @else if (toast.type === 'warning') { ⚠️ }
            @else { ℹ️ }
          </span>
          <span class="toast-msg">{{ toast.text }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    .custom-toast {
      pointer-events: auto;
      min-width: 280px;
      max-width: 420px;
      padding: 12px 18px;
      border-radius: var(--radius-sm, 6px);
      box-shadow: 0 10px 25px rgba(0, 40, 85, 0.25);
      font-size: 13.5px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      animation: slideInToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 0.2s ease;
    }
    .custom-toast:hover {
      transform: translateY(-2px);
    }
    .toast-info {
      background: #002855;
      color: #ffffff;
      border-left: 4px solid #06b6d4;
    }
    .toast-success {
      background: #064e3b;
      color: #ecfdf5;
      border-left: 4px solid #10b981;
    }
    .toast-warning {
      background: #78350f;
      color: #fffbeb;
      border-left: 4px solid #f59e0b;
    }
    .toast-error {
      background: #7f1d1d;
      color: #fef2f2;
      border-left: 4px solid #ef4444;
    }
    @keyframes slideInToast {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
