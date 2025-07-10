import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { UserSearchComponent } from "../../components/user-search/user-search.component";
import { UserListComponent } from "../../components/user-list/user-list.component";
import { UserService } from "../../services/user.service";
import { rxResource } from '@angular/core/rxjs-interop';
import { UserSearchParams } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-page',
  imports: [UserSearchComponent, UserListComponent],
  templateUrl: './user-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  private userService = inject(UserService);

  searchParams = signal<UserSearchParams>({ name: undefined, email: undefined });

  userResource = rxResource({
    params: () => this.searchParams(),
    stream: ({ params }) => {
      if (!params.name && !params.email) {
        return this.userService.getAllUsers();
      }
      return this.userService.searchUsers(params);
    }
  });

  constructor() {
    effect(() => {
      this.searchParams();
      this.userResource.reload();
    });
  }

  onSearchParamsChanged(params: UserSearchParams) {
    this.searchParams.set(params);
  }

  onClearSearch() {
    this.searchParams.set({ name: undefined, email: undefined });
  }
}
