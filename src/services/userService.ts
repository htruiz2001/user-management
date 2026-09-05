import type { CreateUser, User } from '../types/user';

export interface UserService {
  getUsers(): Promise<User[]>;
  createUser(user: CreateUser): Promise<User>;
  updateUser(id: number, user: CreateUser): Promise<User>;
  deleteUser(id: number): Promise<void>;
}