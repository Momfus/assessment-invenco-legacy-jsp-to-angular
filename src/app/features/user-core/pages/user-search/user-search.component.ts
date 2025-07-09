import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-search',
  imports: [],
  templateUrl: './user-search.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent { }
