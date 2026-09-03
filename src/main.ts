import './style.css';
import type {User} from './types/user';
import { getUsers } from './services/apiUserService';

const app = document.querySelector<HTMLDivElement>('#app')!;

if (!app) {
  throw new Error('No se encontró el elemento #app');
}

function renderUsers(users: User[]): void {
  app.innerHTML = `
    <main class="min-h-screen bg-gray-100 p-6">
      <div class="mx-auto max-w-7xl">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">
          User Management
        </h1>

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

            <tbody class="divide-y divide-gray-200 bg-white">
              ${users.map((user) => `
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
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  `;
}

async function loadUser(): Promise<void> {

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
    // await new Promise(resolve => setTimeout(resolve, 3000));
    
    const users = await getUsers();

    renderUsers(users)

  } catch (error) {

    console.error(error);

    app.innerHTML = `
      <main class="min-h-screen bg-gray-100 p-6">
        <div class="mx-auto max-w-7xl">
          <div class="rounded-lg bg-red-50 p-6 text-red-700">
            No se pudieron cargar los usuarios.
          </div>
        </div>
      </main>
    `;
    
  }
  
}

loadUser()