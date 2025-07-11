import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService, PaginatedResponse, PaginationParams } from './user.service';
import { User, UserSearchParams } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';

const baseUrl = environment.baseUrl;

const mockUsers: User[] = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `User${i + 1}`,
  email: `user${i + 1}@example.com`
}));

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllUsers', () => {
    it('should return paginated users', (done) => {
      const pagination: PaginationParams = { page: 2, limit: 10 };
      service.getAllUsers(pagination).subscribe((res) => {
        expect(res.data.length).toBe(10);
        expect(res.page).toBe(2);
        expect(res.limit).toBe(10);
        expect(res.total).toBe(25);
        expect(res.totalPages).toBe(3);
        expect(res.data[0].id).toBe(11);
        done();
      });
      const req = httpMock.expectOne(`${baseUrl}/users`);
      req.flush(mockUsers);
    });

    it('should handle errors and return empty paginated response', (done) => {
      service.getAllUsers({ page: 1, limit: 10 }).subscribe((res) => {
        expect(res.data).toEqual([]);
        expect(res.total).toBe(0);
        expect(res.page).toBe(1);
        expect(res.limit).toBe(10);
        expect(res.totalPages).toBe(0);
        done();
      });
      const req = httpMock.expectOne(`${baseUrl}/users`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('searchUsers', () => {
    it('should filter users by name and paginate', (done) => {
      const params: UserSearchParams = { name: 'User1', email: '' };
      const pagination: PaginationParams = { page: 1, limit: 5 };
      service.searchUsers(params, pagination).subscribe((res) => {
        expect(res.data.length).toBe(5); // First page, 5 results
        expect(res.data[0].name).toContain('User1');
        expect(res.total).toBe(11); // 11 users contain 'User1'
        expect(res.page).toBe(1);
        expect(res.limit).toBe(5);
        expect(res.totalPages).toBe(3); // 11/5 = 3 pages
        done();
      });
      const req = httpMock.expectOne(`${baseUrl}/users`);
      req.flush(mockUsers);
    });

    it('should filter users by email and paginate', (done) => {
      const params: UserSearchParams = { name: '', email: 'user2@example.com' };
      const pagination: PaginationParams = { page: 1, limit: 10 };
      service.searchUsers(params, pagination).subscribe((res) => {
        expect(res.data.length).toBe(1);
        expect(res.data[0].email).toBe('user2@example.com');
        expect(res.total).toBe(1);
        done();
      });
      const req = httpMock.expectOne(`${baseUrl}/users`);
      req.flush(mockUsers);
    });

    it('should handle errors and return empty paginated response', (done) => {
      service.searchUsers({ name: 'fail', email: '' }, { page: 1, limit: 10 }).subscribe((res) => {
        expect(res.data).toEqual([]);
        expect(res.total).toBe(0);
        expect(res.page).toBe(1);
        expect(res.limit).toBe(10);
        expect(res.totalPages).toBe(0);
        done();
      });
      const req = httpMock.expectOne(`${baseUrl}/users`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('private methods', () => {
    it('should filter users by name and email', () => {
      // @ts-ignore: access private method
      const filtered = service.filterUsers(mockUsers, { name: 'User2', email: 'user2@example.com' });
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('User2');
    });

    it('should paginate users correctly', () => {
      // @ts-ignore: access private method
      const paginated: PaginatedResponse<User> = service.paginateUsers(mockUsers, { page: 3, limit: 10 });
      expect(paginated.data.length).toBe(5);
      expect(paginated.page).toBe(3);
      expect(paginated.limit).toBe(10);
      expect(paginated.total).toBe(25);
      expect(paginated.totalPages).toBe(3);
      expect(paginated.data[0].id).toBe(21);
    });
  });
});
