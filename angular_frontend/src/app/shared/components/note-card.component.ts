import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Note } from '../../core/models/note.model';
import { CommonModule } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * NoteCardComponent renders a compact card summary for a note.
 */
@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
  <article class="note-card card">
    <a class="note-link" [routerLink]="['/edit', note?.id]" [attr.aria-label]="'Open ' + (note?.title || 'untitled')">
      <header class="note-header">
        <h3>{{ note?.title || 'Untitled note' }}</h3>
        <div class="badges" *ngIf="note?.favorite"><span class="chip">★ Favorite</span></div>
      </header>
      <p class="preview text-muted">{{ note?.content | slice:0:160 }}{{ (note?.content?.length || 0) > 160 ? '…' : '' }}</p>
      <footer class="meta small">
        <span>{{ note?.updatedAt | date:'medium' }}</span>
        <span class="tags" *ngIf="note?.tags?.length">
          <span *ngFor="let t of note?.tags" class="chip">{{t}}</span>
        </span>
      </footer>
    </a>
  </article>
  `,
  styles: [`
    .note-card{padding:1rem; transition: var(--transition); height:100%;}
    .note-card:hover{transform: translateY(-2px); box-shadow: var(--shadow-md);}
    .note-link{display:flex; flex-direction:column; gap:.5rem; text-decoration:none; color:inherit;}
    .note-header{display:flex; justify-content:space-between; align-items:center;}
    h3{font-size:1.05rem;}
    .preview{min-height:2.6rem;}
    .meta{display:flex; gap:.5rem; justify-content:space-between; align-items:center;}
    .tags{display:flex; gap:.25rem; flex-wrap:wrap;}
  `]
})
export class NoteCardComponent {
  @Input() note: Note | null = null;
}
