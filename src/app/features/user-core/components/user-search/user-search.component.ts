import { Component, inject, signal, computed, effect, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserSearchParams } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-search.component.html',
})
export class UserSearchComponent {
  private fb = inject(FormBuilder);

  searchParamsChanged = output<UserSearchParams>()
  clearSearch = output<void>()

  searchForm = this.fb.group({
    name: [''],
    email: [''],
  });

  hasSearchedWithFilters = signal(false);

  formValues = toSignal(
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
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

  constructor() {
    effect(() => {
      const values = this.formValues();
      const { name, email } = values;
      if (!name && !email) {
        this.hasSearchedWithFilters.set(false);
        this.searchParamsChanged.emit({ name: undefined, email: undefined });
      } else {
        this.hasSearchedWithFilters.set(true);
        this.searchParamsChanged.emit({
          name: name || undefined,
          email: email || undefined
        });
      }
    });
  }

  onClearSearch() {
    this.searchForm.reset();
    this.hasSearchedWithFilters.set(false);
    this.clearSearch.emit();
  }
}
