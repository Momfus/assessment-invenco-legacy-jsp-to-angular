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
  currentPage = signal(1);
  itemsPerPage = 10;

  userResource = rxResource({
    params: () => ({
      searchParams: this.searchParams(),
      pagination: {
        page: this.currentPage(),
        limit: this.itemsPerPage
      }
    }),
    stream: ({ params }) => {
      if (!params.searchParams.name && !params.searchParams.email) {
        return this.userService.getAllUsers(params.pagination);
      }
      return this.userService.searchUsers(params.searchParams, params.pagination);
    }
  });

  constructor() {
    effect(() => {
      this.searchParams();
      this.currentPage();
      this.userResource.reload();
    });
  }

  onSearchParamsChanged(params: UserSearchParams) {
    this.searchParams.set(params);
    this.currentPage.set(1);
  }

  onClearSearch() {
    this.searchParams.set({ name: undefined, email: undefined });
    this.currentPage.set(1);
  }

  onPageChanged(page: number) {
    this.currentPage.set(page);
  }
}
