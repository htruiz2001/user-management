import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

app.innerHTML = `
  <main class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-gray-900">
      User Management
    </h1>

    <p class="mt-2 text-gray-600">
      Vite + TypeScript + Tailwind CSS
    </p>
  </main>
`;