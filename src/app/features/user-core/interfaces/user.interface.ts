export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserSearchParams {
  name?: string;
  email?: string;
}
