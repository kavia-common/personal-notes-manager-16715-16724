import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * EmptyStateComponent shows a friendly message when a list is empty.
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty">
      <div class="icon" aria-hidden="true">🌊</div>
      <h2>{{ title }}</h2>
      <p class="text-muted small">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty{
      display:grid; place-items:center; gap:.5rem; padding:2rem; text-align:center;
      background:linear-gradient(180deg, rgba(37,99,235,.06), rgba(255,255,255,1));
      border-radius: var(--radius); border: 1px dashed rgba(17,24,39,.12);
    }
    .icon{font-size:2rem;}
    h2{font-size:1.1rem;}
  `]
})
export class EmptyStateComponent {
  @Input() title = 'Nothing here yet';
  @Input() description = 'Start by creating your first note.';
}
