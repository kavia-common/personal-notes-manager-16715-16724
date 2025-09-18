import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../app.config';
import { Observable } from 'rxjs';
import { Note, NoteCreateRequest, NoteID, NoteUpdateRequest } from '../models/note.model';

/**
 * PUBLIC_INTERFACE
 * NotesService provides methods to interact with backend Notes REST API.
 * Endpoints are scaffolded; implement backend separately to match these routes.
 */
@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** GET /notes - list all notes with optional query params like tag or folder */
  list(params?: { tag?: string; folder?: string; q?: string }): Observable<Note[]> {
    const parts: string[] = [];
    if (params?.tag) parts.push(`tag=${encodeURIComponent(params.tag)}`);
    if (params?.folder) parts.push(`folder=${encodeURIComponent(params.folder)}`);
    if (params?.q) parts.push(`q=${encodeURIComponent(params.q)}`);
    const qs = parts.length ? `?${parts.join('&')}` : '';
    return this.http.get<Note[]>(`${this.base}/notes${qs}`);
  }

  /** GET /notes/:id - get a single note by id */
  get(id: NoteID): Observable<Note> {
    return this.http.get<Note>(`${this.base}/notes/${encodeURIComponent(id)}`);
  }

  /** POST /notes - create a note */
  create(payload: NoteCreateRequest): Observable<Note> {
    return this.http.post<Note>(`${this.base}/notes`, payload);
  }

  /** PATCH /notes/:id - update a note */
  update(id: NoteID, payload: NoteUpdateRequest): Observable<Note> {
    return this.http.patch<Note>(`${this.base}/notes/${encodeURIComponent(id)}`, payload);
  }

  /** DELETE /notes/:id - delete a note */
  delete(id: NoteID): Observable<void> {
    return this.http.delete<void>(`${this.base}/notes/${encodeURIComponent(id)}`);
  }
}
