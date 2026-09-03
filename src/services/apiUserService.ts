import type {User} from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(): Promise<User[]> {
    
    const response = await fetch(API_URL);

    if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const users: User[] = await response.json();

    return users;
}