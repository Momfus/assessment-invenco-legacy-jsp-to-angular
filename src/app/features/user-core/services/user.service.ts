import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { User, UserSearchParams } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  searchUsers(params: UserSearchParams): Observable<User[]> {

    return this.http.get<User[]>(`${baseUrl}/users`)
      .pipe(
        delay(this.getRandomDelay()),
        map(users => this.filterUsers(users, params)),
        catchError((error) => {
          console.error('API Error:', error);
          return of([]);
        })
      );
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`)
      .pipe(
        delay(this.getRandomDelay()),
        catchError((error) => {
          console.error('API Error:', error);
          return of([]);
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

  private getRandomDelay(): number {
    return Math.floor(Math.random() * 500) + 1000;
  }
}
