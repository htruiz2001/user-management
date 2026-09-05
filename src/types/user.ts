export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface CreateUser {
  name: string;
  username: string;
  email: string;
  phone: string;
}