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

export async function deleteUser(id: number): Promise<void> {

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
        
    }

}

export async function updateUser(
    id: number,
    user: Partial<User>
): Promise<User> {

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(user),
    });
    
    if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
        
    }

    const updateUser: User = await response.json();

    return updateUser;
    
    
}