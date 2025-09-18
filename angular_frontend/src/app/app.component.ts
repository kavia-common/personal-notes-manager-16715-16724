import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * AppComponent is the root shell hosting the Ocean Professional layout:
 * - Sidebar for folders/tags
 * - Top bar with search and actions
 * - Main area contains routed views (notes list, editor, settings)
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /** Title presented in heading for accessibility. */
  title = 'Personal Notes Manager';

  /** Controls sidebar collapsed state for responsive behavior */
  sidebarCollapsed = signal(false);

  toggleSidebar() {
    this.sidebarCollapsed.update(v => !v);
  }

  constructor() {
    // Reactive UI state update; guard for SSR and linter by using globalThis
    effect(() => {
      const collapsed = this.sidebarCollapsed();
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      const body = g?.document?.body;
      if (body?.dataset) {
        body.dataset['sidebarCollapsed'] = String(collapsed);
      }
    });
  }
}
