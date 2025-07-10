import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { PaginatedResponse } from '../../services/user.service';

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
  paginationData = input<PaginatedResponse<User> | undefined>(undefined);

  pageChanged = output<number>();

  currentPage = signal(1);
  itemsPerPage = 10;
  Math = Math;

  totalPages = computed(() => this.paginationData()?.totalPages || 0);
  totalItems = computed(() => this.paginationData()?.total || 0);
  currentPageData = computed(() => this.paginationData()?.page || 1);

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.pageChanged.emit(page);
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages();
    const currentPage = this.currentPageData();
    const pages: number[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  }
}
