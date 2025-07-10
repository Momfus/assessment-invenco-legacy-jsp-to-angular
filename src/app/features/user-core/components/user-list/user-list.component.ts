import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {

  users = input<User[]>([]);
  isLoading = input<boolean>(false);
  error = input<Error | undefined>(undefined);
  hasActiveSearch = input<boolean>(false);
}
