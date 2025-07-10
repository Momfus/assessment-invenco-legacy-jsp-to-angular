import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-search.component.html',
})
export class UserSearchComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  searchForm = this.fb.group({
    name: [''],
    email: [''],
  });

  hasSearchedWithFilters = signal(false);

  formValues = toSignal(
    this.searchForm.valueChanges.pipe(
      debounceTime(300), // 300ms debounce
      distinctUntilChanged((prev, curr) =>
        prev.name === curr.name && prev.email === curr.email
      )
    ),
    { initialValue: { name: '', email: '' } }
  );

  isFormEmpty = computed(() => {
    const { name, email } = this.formValues();
    return !name && !email;
  });

  hasActiveSearch = computed(() => {
    return this.hasSearchedWithFilters() && !this.isFormEmpty();
  });

  userResource = rxResource({
    params: () => {
      const { name, email } = this.formValues();
      return {
        name: name ?? undefined,
        email: email ?? undefined,
      };
    },
    stream: ({ params }) => {
      if (!params.name && !params.email) {
        this.hasSearchedWithFilters.set(false);
        return this.userService.getAllUsers();
      }
      this.hasSearchedWithFilters.set(true);
      return this.userService.searchUsers(params);
    }
  });

  clearSearch() {
    this.searchForm.reset();
    this.hasSearchedWithFilters.set(false);
    this.userResource.reload();
  }
}
