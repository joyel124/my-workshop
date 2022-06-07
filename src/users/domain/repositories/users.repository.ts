import { User } from '../entities/user.model';

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<{ delete: boolean }>;
}
