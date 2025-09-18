import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * WelcomeComponent shows a brief introduction and primary actions.
 */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="container">
      <div class="hero elevated">
        <div class="hero-inner">
          <div>
            <h1>Welcome to your Ocean Professional Notes</h1>
            <p class="text-muted">Organize ideas with tags and folders. Clean, fast, and focused.</p>
            <div class="actions">
              <a class="btn btn-primary" routerLink="/new">Create Note</a>
              <a class="btn btn-ghost" routerLink="/notes">View Notes</a>
            </div>
          </div>
          <div class="illus" aria-hidden="true">🧭</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero{padding:1.25rem; border-radius: var(--radius-lg);}
    .hero-inner{display:flex; align-items:center; justify-content:space-between; gap:1rem;}
    h1{font-size:1.5rem; margin-bottom:.35rem;}
    .actions{margin-top:.75rem; display:flex; gap:.5rem;}
    .illus{font-size:2.25rem;}
  `]
})
export class WelcomeComponent {}
