import type { CreateUser, User } from '../types/user';
import type { UserService } from './userService';

const STORAGE_KEY = 'users';
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export class LocalUserService implements UserService {

        async getUsers(): Promise<User[]> {
  const storedUsers = localStorage.getItem(STORAGE_KEY);

  if (!storedUsers) {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users: User[] = await response.json();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    return users;
  }

  return JSON.parse(storedUsers) as User[];
}

    async createUser(user: CreateUser): Promise<User> {
    const users = await this.getUsers();

  const nextId =
    users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 1;

  // PARTE 3: aquí construimos el nuevo usuario
  const newUser: User = {
    id: nextId,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  };

  // PARTE 4: guardamos el usuario
  users.push(newUser);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return newUser;
    }

    async updateUser(

    id: number,
  user: CreateUser
): Promise<User> {
  const users = await this.getUsers();

  const userIndex = users.findIndex((currentUser) => currentUser.id === id);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const updatedUser: User = {
    id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  };

  users[userIndex] = updatedUser;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return updatedUser;

    }

    async deleteUser(id: number): Promise<void> {

        const users = await this.getUsers();

        const userExists = users.some((user) => user.id === id);

        if (!userExists) {
            throw new Error('User not found');
        }

        const filteredUsers = users.filter((user) => user.id !== id);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredUsers));
    }

}