import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../core/services/notes.service';
import { Note } from '../../core/models/note.model';
import { NoteCardComponent } from '../../shared/components/note-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

/**
 * PUBLIC_INTERFACE
 * FolderViewComponent shows notes filtered by folder (favorites, archive, trash, ...).
 */
@Component({
  selector: 'app-folder-view',
  standalone: true,
  imports: [CommonModule, NoteCardComponent, EmptyStateComponent],
  template: `
    <section class="container">
      <h2>Folder: {{ folder }}</h2>
      <div class="grid" *ngIf="notes().length; else emptyTpl">
        <app-note-card *ngFor="let n of notes()" [note]="n"></app-note-card>
      </div>
      <ng-template #emptyTpl>
        <app-empty-state title="No notes in this folder" [description]="'Folder ' + folder + ' has no notes yet.'"></app-empty-state>
      </ng-template>
    </section>
  `,
  styles: [`
    h2{margin-bottom:.5rem;}
    .grid{display:grid; grid-template-columns: repeat( auto-fill, minmax(240px, 1fr) ); gap:.75rem;}
  `]
})
export class FolderViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly notesSvc = inject(NotesService);

  folder = '';
  notes = signal<Note[]>([]);

  ngOnInit(): void {
    this.folder = this.route.snapshot.paramMap.get('folder') || '';
    this.notesSvc.list({ folder: this.folder }).subscribe({
      next: d => this.notes.set(d),
      error: () => this.notes.set([])
    });
  }
}
