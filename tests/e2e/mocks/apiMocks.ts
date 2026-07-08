import type { Page, Route } from '@playwright/test';

export const MOCK_ADMIN = {
  email: 'admin@test.com',
  password: 'password123',
};

const MOCK_TOKEN = 'mock-jwt-token';

const MOCK_USER = {
  id: 'user-1',
  email: MOCK_ADMIN.email,
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

interface MockProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  isActive: boolean;
}

const seedProducts = (): MockProduct[] => [
  {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    currency: 'USD',
    stock: 15,
    isActive: true,
  },
];

/**
 * Intercepta todas las llamadas a /api/** y las responde con datos en memoria
 * (login, logout, me, CRUD y búsqueda de productos), para que los tests e2e
 * no dependan de un backend real. El estado se reinicia en cada llamada,
 * así que debe invocarse una vez por test (antes de cualquier page.goto).
 */
export async function mockApi(page: Page): Promise<void> {
  const products = seedProducts();
  let nextId = products.length + 1;

  await page.route('**/api/**', async (route: Route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();
    const path = url.pathname;

    if (path === '/api/auth/login' && method === 'POST') {
      const body = request.postDataJSON() as { email: string; password: string };
      if (body.email === MOCK_ADMIN.email && body.password === MOCK_ADMIN.password) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ token: MOCK_TOKEN, user: MOCK_USER }),
        });
      }
      return route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials' }),
      });
    }

    if (path === '/api/auth/logout' && method === 'POST') {
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    }

    if (path === '/api/auth/me' && method === 'GET') {
      if (request.headers()['authorization'] === `Bearer ${MOCK_TOKEN}`) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(MOCK_USER),
        });
      }
      return route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Unauthorized' }),
      });
    }

    if (path === '/api/products/search' && method === 'GET') {
      const name = url.searchParams.get('name')?.toLowerCase();
      const onlyInStock = url.searchParams.get('onlyInStock') === 'true';
      const onlyActive = url.searchParams.get('onlyActive') === 'true';

      const filtered = products.filter((p) => {
        if (name && !p.name.toLowerCase().includes(name)) return false;
        if (onlyInStock && p.stock === 0) return false;
        if (onlyActive && !p.isActive) return false;
        return true;
      });

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(filtered),
      });
    }

    if (path === '/api/products' && method === 'GET') {
      const page_ = Number(url.searchParams.get('page')) || 1;
      const pageSize = Number(url.searchParams.get('pageSize')) || 12;

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: products,
          total: products.length,
          page: page_,
          pageSize,
          totalPages: 1,
        }),
      });
    }

    if (path === '/api/products' && method === 'POST') {
      const body = request.postDataJSON() as {
        name: string;
        price: number;
        currency: string;
        stock: number;
      };
      const created: MockProduct = {
        id: String(nextId++),
        name: body.name,
        price: body.price,
        currency: body.currency,
        stock: body.stock,
        isActive: true,
      };
      products.push(created);

      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(created),
      });
    }

    const productIdMatch = path.match(/^\/api\/products\/([^/]+)$/);

    if (productIdMatch && method === 'GET') {
      const product = products.find((p) => p.id === productIdMatch[1]);
      if (!product) {
        return route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Product not found' }),
        });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(product),
      });
    }

    if (productIdMatch && method === 'PUT') {
      const product = products.find((p) => p.id === productIdMatch[1]);
      if (!product) {
        return route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Product not found' }),
        });
      }
      const body = request.postDataJSON() as { stock: number };
      product.stock = body.stock;

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(product),
      });
    }

    if (productIdMatch && method === 'DELETE') {
      const index = products.findIndex((p) => p.id === productIdMatch[1]);
      if (index !== -1) products.splice(index, 1);
      return route.fulfill({ status: 204 });
    }

    return route.continue();
  });
}
