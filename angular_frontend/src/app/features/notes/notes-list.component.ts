import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../core/services/notes.service';
import { Note } from '../../core/models/note.model';
import { NoteCardComponent } from '../../shared/components/note-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { SearchBarComponent } from '../../shared/components/search-bar.component';
import { RouterLink } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * NotesListComponent shows a searchable grid list of notes.
 */
@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, NoteCardComponent, EmptyStateComponent, SearchBarComponent, RouterLink],
  template: `
    <section class="container">
      <div class="toolbar">
        <app-search-bar (search)="onSearch($event)"></app-search-bar>
        <a class="btn btn-primary" routerLink="/new">New Note</a>
      </div>

      <ng-container *ngIf="(filteredNotes()).length; else emptyTpl">
        <div class="grid">
          <app-note-card *ngFor="let n of filteredNotes()" [note]="n"></app-note-card>
        </div>
      </ng-container>

      <ng-template #emptyTpl>
        <app-empty-state title="No notes yet" description="Your thoughts deserve a place. Start by creating a note.">
          <div style="margin-top:.5rem">
            <a class="btn btn-primary" routerLink="/new">Create your first note</a>
          </div>
        </app-empty-state>
      </ng-template>
    </section>
  `,
  styles: [`
    .toolbar{display:flex; gap:.75rem; align-items:center; margin-bottom:1rem;}
    .grid{display:grid; grid-template-columns: repeat( auto-fill, minmax(240px, 1fr) ); gap:.75rem;}
  `]
})
export class NotesListComponent implements OnInit {
  private readonly notesSvc = inject(NotesService);

  private allNotes = signal<Note[]>([]);
  query = signal('');

  filteredNotes = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.allNotes();
    return this.allNotes().filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q) ||
      (n.tags || []).some(t => t.toLowerCase().includes(q))
    );
  });

  ngOnInit() {
    // Fetch notes list
    this.notesSvc.list().subscribe({
      next: (data) => this.allNotes.set(data),
      error: () => this.allNotes.set([]) // fail silently for scaffold
    });
  }

  onSearch(q: string) {
    this.query.set(q);
  }
}
