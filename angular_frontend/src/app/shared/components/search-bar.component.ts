import { Component, EventEmitter, Output, signal } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * SearchBarComponent emits query strings and shows an accessible search input.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  template: `
  <div class="search-bar">
    <label class="hidden-visually" for="search-input">Search notes</label>
    <input id="search-input" type="search" [value]="query()" (input)="onInput($event)" placeholder="Search notes..."
      aria-label="Search notes" />
  </div>
  `,
  styles: [`
    .search-bar{display:flex; align-items:center; gap:.5rem;}
    input[type="search"]{width:100%;}
  `]
})
export class SearchBarComponent {
  query = signal('');
  @Output() search = new EventEmitter<string>();

  onInput(e: any) {
    const val = (e?.target && e.target.value) ?? '';
    this.query.set(val);
    this.search.emit(val);
  }
}
