import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserSearchComponent } from "../../components/user-search/user-search.component";

@Component({
  selector: 'app-user-list',
  imports: [UserSearchComponent],
  templateUrl: './user-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent { }
