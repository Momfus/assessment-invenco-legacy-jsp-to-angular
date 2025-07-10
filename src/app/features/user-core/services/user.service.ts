import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { User, UserSearchParams } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  searchUsers(params: UserSearchParams, pagination?: PaginationParams): Observable<PaginatedResponse<User>> {
    return this.http.get<User[]>(`${baseUrl}/users`)
      .pipe(
        delay(this.getRandomDelay()),
        map(users => {
          const filteredUsers = this.filterUsers(users, params);
          return this.paginateUsers(filteredUsers, pagination);
        }),
        catchError((error) => {
          console.error('API Error:', error);
          return of({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });
        })
      );
  }

  getAllUsers(pagination?: PaginationParams): Observable<PaginatedResponse<User>> {
    return this.http.get<User[]>(`${baseUrl}/users`)
      .pipe(
        delay(this.getRandomDelay()),
        map(users => this.paginateUsers(users, pagination)),
        catchError((error) => {
          console.error('API Error:', error);
          return of({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });
        })
      );
  }

  private filterUsers(users: User[], params: UserSearchParams): User[] {
    let filteredUsers = [...users];

    if (params.name && params.name.trim()) {
      const nameFilter = params.name.toLowerCase().trim();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(nameFilter)
      );
    }

    if (params.email && params.email.trim()) {
      const emailFilter = params.email.toLowerCase().trim();
      filteredUsers = filteredUsers.filter(user =>
        user.email.toLowerCase().includes(emailFilter)
      );
    }

    return filteredUsers;
  }

  private paginateUsers(users: User[], pagination?: PaginationParams): PaginatedResponse<User> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const total = users.length;
    const totalPages = Math.ceil(total / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = users.slice(startIndex, endIndex);

    return {
      data,
      total,
      page,
      limit,
      totalPages
    };
  }

  private getRandomDelay(): number {
    return Math.floor(Math.random() * 500) + 1000;
  }
}
