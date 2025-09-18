import { Routes } from '@angular/router';
import { NotesListComponent } from './features/notes/notes-list.component';
import { NoteEditorComponent } from './features/notes/note-editor.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { TagViewComponent } from './features/tags/tag-view.component';
import { FolderViewComponent } from './features/folders/folder-view.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'Welcome • Personal Notes' },
  { path: 'notes', component: NotesListComponent, title: 'All Notes • Personal Notes' },
  { path: 'new', component: NoteEditorComponent, title: 'New Note • Personal Notes' },
  { path: 'edit/:id', component: NoteEditorComponent, title: 'Edit Note • Personal Notes' },
  { path: 't/:tag', component: TagViewComponent, title: 'Tag • Personal Notes' },
  { path: 'f/:folder', component: FolderViewComponent, title: 'Folder • Personal Notes' },
  { path: '**', redirectTo: '' }
];
