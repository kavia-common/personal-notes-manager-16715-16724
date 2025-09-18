import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../core/services/notes.service';
import { Note } from '../../core/models/note.model';

/**
 * PUBLIC_INTERFACE
 * NoteEditorComponent handles creating and editing a single note.
 */
@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="container">
      <div class="editor elevated">
        <div class="editor-header">
          <input type="text" [(ngModel)]="title" placeholder="Note title" aria-label="Note title">
          <div class="editor-actions">
            <button class="btn btn-ghost" (click)="toggleFavorite()" [attr.aria-pressed]="favorite">★</button>
            <button class="btn btn-secondary" (click)="save()" aria-label="Save note">Save</button>
            <a class="btn btn-ghost" routerLink="/notes">Back</a>
          </div>
        </div>
        <div class="meta small text-muted">
          <span *ngIf="note() as n">Last updated: {{ n.updatedAt | date:'medium' }}</span>
          <span class="chip" *ngFor="let t of tags">{{t}}</span>
        </div>
        <textarea rows="14" [(ngModel)]="content" placeholder="Write your note here..." aria-label="Note content"></textarea>

        <div class="tag-input">
          <label for="tags">Tags</label>
          <input id="tags" type="text" [(ngModel)]="tagsStr" placeholder="Comma separated tags (e.g. work, ideas)">
        </div>
      </div>
    </section>
  `,
  styles: [`
    .editor{padding:1rem; border-radius: var(--radius-lg);}
    .editor-header{display:flex; gap:.75rem; align-items:center; margin-bottom:.5rem;}
    .editor-header input[type="text"]{flex:1; font-size:1.2rem; font-weight:700;}
    textarea{width:100%; resize:vertical; margin-top:.5rem;}
    .editor-actions{display:flex; gap:.5rem;}
    .tag-input{margin-top:.75rem; display:flex; gap:.5rem; align-items:center;}
    .tag-input input{flex:1;}
    .meta{display:flex; align-items:center; gap:.5rem; margin:.25rem 0;}
  `]
})
export class NoteEditorComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notesSvc = inject(NotesService);

  note = signal<Note | null>(null);

  title = '';
  content = '';
  favorite = false;
  tagsStr = '';

  get tags(): string[] {
    return this.tagsStr.split(',').map(s => s.trim()).filter(Boolean);
  }

  isEdit = computed(() => !!this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.notesSvc.get(id).subscribe({
        next: (n) => {
          this.note.set(n);
          this.title = n.title;
          this.content = n.content;
          this.favorite = !!n.favorite;
          this.tagsStr = (n.tags || []).join(', ');
        },
        error: () => {
          // On error, keep empty editor but not crash
        }
      });
    }
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  save() {
    const payload = {
      title: this.title?.trim() || 'Untitled note',
      content: this.content || '',
      favorite: this.favorite,
      tags: this.tags
    };

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.notesSvc.update(id, payload).subscribe({
        next: (n) => this.router.navigate(['/edit', n.id]),
        error: () => {} // ignore in scaffold
      });
    } else {
      this.notesSvc.create(payload).subscribe({
        next: (n) => this.router.navigate(['/edit', n.id]),
        error: () => {} // ignore in scaffold
      });
    }
  }
}
