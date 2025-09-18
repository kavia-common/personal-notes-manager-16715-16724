import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../core/services/notes.service';
import { Note } from '../../core/models/note.model';
import { NoteCardComponent } from '../../shared/components/note-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

/**
 * PUBLIC_INTERFACE
 * TagViewComponent shows notes filtered by a tag.
 */
@Component({
  selector: 'app-tag-view',
  standalone: true,
  imports: [CommonModule, NoteCardComponent, EmptyStateComponent],
  template: `
    <section class="container">
      <h2>Tag: {{ tag }}</h2>
      <div class="grid" *ngIf="notes().length; else emptyTpl">
        <app-note-card *ngFor="let n of notes()" [note]="n"></app-note-card>
      </div>
      <ng-template #emptyTpl>
        <app-empty-state title="No notes for this tag" [description]="'Tag ' + tag + ' has no notes yet.'"></app-empty-state>
      </ng-template>
    </section>
  `,
  styles: [`
    h2{margin-bottom:.5rem;}
    .grid{display:grid; grid-template-columns: repeat( auto-fill, minmax(240px, 1fr) ); gap:.75rem;}
  `]
})
export class TagViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly notesSvc = inject(NotesService);

  tag = '';
  notes = signal<Note[]>([]);

  ngOnInit(): void {
    this.tag = this.route.snapshot.paramMap.get('tag') || '';
    this.notesSvc.list({ tag: this.tag }).subscribe({
      next: d => this.notes.set(d),
      error: () => this.notes.set([])
    });
  }
}
