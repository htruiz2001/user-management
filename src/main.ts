import './style.css';
import type {User} from './types/user';
import { LocalUserService } from './services/localUserService';
import { validateUserForm } from './utils/validation';
// import type { UserService } from './services/userService';

const userService = new LocalUserService();

const app = document.querySelector<HTMLDivElement>('#app')!;


if (!app) {
  throw new Error('No se encontró el elemento #app');
}

let users: User[] = [];
let editingUserId: number | null = null;
let searchTerm = '';

function renderUserRows(users: User[], isSearching = false): string {

if (users.length === 0 && isSearching) {
    return `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center text-gray-500">
          No se encontraron usuarios.
        </td>
      </tr>
    `;
  }

  return users.map((user) => `
    <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    ${user.id}
                  </td>

                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    ${user.name}
                  </td>

                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    ${user.username}
                  </td>

                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    ${user.email}
                  </td>

                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    ${user.phone}
                  </td>

                  <td class="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      type="button"
                      data-action="edit"
                      data-user-id="${user.id}"
                      class="mr-3 font-medium text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      data-action="delete"
                      data-user-id="${user.id}"
                      class="font-medium text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
  `).join('');
}

function renderUsers(users: User[]): void {

  const filteredUsers = users.filter((user) => {
  const term = searchTerm.toLowerCase();

  return (
      user.name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  app.innerHTML = `
    <main class="min-h-screen bg-gray-100 p-6">
      <div class="mx-auto max-w-7xl">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">
          User Management
        </h1>

        
        <div class="mb-6">
          <button
            id="create-user"
            type="button"
            class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Nuevo usuario
          </button>
        </div>

        <div class="mb-6">
          <input
            id="search-input"
            type="search"
            value="${searchTerm}"
            placeholder="Buscar usuario..."
            class="w-full rounded-md border border-gray-300 bg-white px-3 py-2"
          />
        </div>

          <form id="user-form" novalidate class="mb-6 hidden rounded-lg bg-white p-6 shadow">
    <h2 id="form-title" class="mb-4 text-xl font-semibold text-gray-900">
      Editar usuario
    </h2>

    <div id="form-errors"
      class="mb-4 hidden rounded-md bg-red-50 p-3 text-sm text-red-700">
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label
          for="name"
          class="mb-1 block text-sm font-medium text-gray-700">
          Nombre
        </label>

        <input
          id="name"
          name="name"
          type="text"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required/>
      </div>

      <div>
        <label
          for="username"
          class="mb-1 block text-sm font-medium text-gray-700">
          Username
      </label>

        <input
          id="username"
          name="username"
          type="text"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required/>
      </div>

      <div>
        <label
          for="email"
          class="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label
          for="phone"
          class="mb-1 block text-sm font-medium text-gray-700"
        >
          Teléfono
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
    </div>

    <div class="mt-4 flex gap-3">
      <button
        type="submit"
        class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Guardar
      </button>

      <button
        id="cancel-edit"
        type="button"
        class="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
      >
        Cancelar
      </button>
    </div>
  </form>

        <div class="overflow-x-auto rounded-lg bg-white shadow">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ID
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Nombre
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Username
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Teléfono
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody id="users-table-body" class="divide-y divide-gray-200 bg-white">
              ${renderUserRows(filteredUsers, searchTerm.trim() !== '')}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  `;
}

async function loadUsers(): Promise<void> {
  app.innerHTML = `
    <main class="min-h-screen bg-gray-100 p-6">
      <div class="mx-auto max-w-7xl">
        <div class="rounded-lg bg-white p-6 text-gray-600 shadow">
          Cargando usuarios...
        </div>
      </div>
    </main>
  `;

  try {

    users = await userService.getUsers();

    // const updatedUser = await updateUser(1, {
    // name: 'Usuario actualizado',
    // });

    // console.log(updatedUser);

    renderUsers(users);

  } catch (error)
   {
    console.error(error);

    app.innerHTML = `
      <main class="min-h-screen bg-gray-100 p-6">
        <div class="rounded-lg bg-red-50 p-6 text-red-700">
          No se pudieron cargar los usuarios.
        </div>
      </div>
    `;
  }
}

loadUsers()

app.addEventListener('click', async (event)=>{

  const target = event.target as HTMLElement;

  //Cancelacion de la editacion de users

  if (target.id === 'cancel-edit') {
    editingUserId = null;
    renderUsers(users);
    return;
  }

  //Funcion del boton crear user

  if (target.id === 'create-user') {
  editingUserId = null;

  const form = document.querySelector<HTMLFormElement>('#user-form');

  if (!form) {
    return;
  }

  form.reset();
  form.classList.remove('hidden');

  return;
}

  const action = target.dataset.action;
  const userId = target.dataset.userId;

  if (!action || !userId){
    return;
  }

  // console.log('Accion', action);
  // console.log('Usuario', userId);

  //If para editar ID

    if (action === 'edit') {
  const id = Number(userId);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return;
  }

  editingUserId = user.id;

  const form = document.querySelector<HTMLFormElement>('#user-form');
  const nameInput = document.querySelector<HTMLInputElement>('#name');
  const usernameInput = document.querySelector<HTMLInputElement>('#username');
  const emailInput = document.querySelector<HTMLInputElement>('#email');
  const phoneInput = document.querySelector<HTMLInputElement>('#phone');

  if (
    !form ||
    !nameInput ||
    !usernameInput ||
    !emailInput ||
    !phoneInput
  ) {
    return;
  }

  nameInput.value = user.name;
  usernameInput.value = user.username;
  emailInput.value = user.email;
  phoneInput.value = user.phone;

  form.classList.remove('hidden');
}
  
  //If para borrar ID

  if (action === 'delete'){

    const id = Number(userId);

    const user = users.find((user) => user.id === id);

    if (!user){
      return;
    }

    const confirmed = confirm(`¿Estás seguro de eliminar a ${user.name}?`);

    if (!confirmed){
      return;
    }

    try {

      await userService.deleteUser(id);

      users = users.filter((user) => user.id !== id);

      renderUsers(users)

    } catch (error) {
      
      console.error(error);
      alert('No se pudo eliminar el usuario')
      

    }
  }
});

//Listener de busqueda

app.addEventListener('input', (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  if (target.id !== 'search-input') {
    return;
  }

  searchTerm = target.value;

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();

    return (
      user.name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  const tableBody = document.querySelector<HTMLTableSectionElement>(
    '#users-table-body'
  );

  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = renderUserRows(
  filteredUsers,
  searchTerm.trim() !== ''
);

  console.log(searchTerm);
});

//Listener para guardar cambios

app.addEventListener('submit', async (event) => {
  const target = event.target;

  if (!(target instanceof HTMLFormElement)) {
    return;
  }

  if (target.id !== 'user-form') {
    return;
  }

  event.preventDefault();

  const formData = new FormData(target);

  const userData = {
    name: String(formData.get('name') ?? ''),
    username: String(formData.get('username') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
  };

  //Validacion de los campos

  const errors = validateUserForm(userData);

  const formErrors = document.querySelector<HTMLDivElement>('#form-errors');

  if (!formErrors) {
    return;
  }

  if (errors.length > 0) {
    formErrors.innerHTML = errors
      .map((error) => `<p>${error}</p>`)
      .join('');

    formErrors.classList.remove('hidden');

    return;
  }

  formErrors.classList.add('hidden');
  formErrors.innerHTML = '';

  try {
    if (editingUserId === null) {
      // CREAR
      const createdUser = await userService.createUser(userData);

      users = [...users, createdUser];
    } else {
      // EDITAR
      const updatedUser = await userService.updateUser(
      editingUserId,
      userData
      );

      users = users.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              ...updatedUser,
            }
          : user
      );
    }

    editingUserId = null;

    renderUsers(users);
  } catch (error) {
    console.error(error);

    alert('No se pudo guardar el usuario.');
  }
});