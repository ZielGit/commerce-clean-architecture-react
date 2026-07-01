export const apiConfig = {
  baseURL: import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || ''),
  timeout: 30000,
};
