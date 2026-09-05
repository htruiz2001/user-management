export interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export function validateUserForm(data: UserFormData): string[] {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('El nombre es obligatorio.');
  }

  if (!data.username.trim()) {
    errors.push('El username es obligatorio.');
  }

  if (!data.email.trim()) {
    errors.push('El email es obligatorio.');
  } else if (!isValidEmail(data.email)) {
    errors.push('El email no tiene un formato válido.');
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}