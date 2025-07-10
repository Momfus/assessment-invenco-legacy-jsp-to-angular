import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-user-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent {

  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  users = signal<User[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  searchForm: FormGroup = this.fb.group({
    name: [''],
    email: [''],
  });

  onSubmit() {
    if (this.searchForm.valid) {
      this.performSearch();
    }
  }

  private performSearch() {
    const searchParams = this.searchForm.value;

    // Reset states
    this.isLoading.set(true);
    this.error.set(null);

    this.userService.searchUsers(searchParams)
      .pipe(
        catchError((error: Error) => {
          this.error.set(error.message);
          return [];
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe(users => {
        this.users.set(users);
      });
  }

  clearSearch() {
    this.searchForm.reset();
    this.users.set([]);
    this.error.set(null);
  }
}
