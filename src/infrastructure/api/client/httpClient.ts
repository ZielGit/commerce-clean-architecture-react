import { apiConfig } from '../../config/apiConfig';
import { TokenStorage } from '../../storage/TokenStorage';

/**
 * Cliente HTTP basado en Fetch API
 * Maneja configuración base, headers y autenticación
 */
class HttpClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = apiConfig.baseURL;
    this.timeout = apiConfig.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Headers por defecto
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Agregar JWT si existe
    const token = TokenStorage.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Manejar respuestas de error
      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Si es 204 No Content, retornar null
      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      throw error;
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Si no puede parsear JSON, usar mensaje por defecto
    }

    // Si es 401 en una sesión ya autenticada, limpiar token y redirigir a login
    // (un 401 en el propio login son credenciales inválidas, no una sesión expirada)
    if (response.status === 401 && TokenStorage.hasToken()) {
      TokenStorage.clearToken();
      window.location.href = '/login';
    }

    throw new Error(errorMessage);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient();
