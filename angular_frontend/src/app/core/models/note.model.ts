export type NoteID = string;

/**
 * PUBLIC_INTERFACE
 * Note represents a personal note entity used across the app.
 */
export interface Note {
  /** Unique identifier (UUID or string) */
  id: NoteID;
  /** Title of the note */
  title: string;
  /** Markdown or plain text content */
  content: string;
  /** ISO timestamps for created and updated at */
  createdAt: string;
  updatedAt: string;
  /** Optional tags for organization */
  tags?: string[];
  /** Folder name like favorites/archive/trash or custom */
  folder?: string;
  /** Whether the note is pinned/favorite */
  favorite?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * NoteCreateRequest defines payload for creating a new note.
 */
export interface NoteCreateRequest {
  title: string;
  content: string;
  tags?: string[];
  folder?: string;
  favorite?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * NoteUpdateRequest defines payload for updating an existing note.
 */
export interface NoteUpdateRequest {
  title?: string;
  content?: string;
  tags?: string[];
  folder?: string;
  favorite?: boolean;
}
