import type {User, CreateUser} from '../types/user';
import type { UserService } from './userService';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export class ApiUserService implements UserService {

  async getUsers(): Promise<User[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users: User[] = await response.json();

    return users;
  }

  async createUser(user: CreateUser): Promise<User> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const createdUser: User = await response.json();

    return createdUser;
  }

  async updateUser(
    id: number,
    user: CreateUser
  ): Promise<User> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const updatedUser: User = await response.json();

    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
  }
}