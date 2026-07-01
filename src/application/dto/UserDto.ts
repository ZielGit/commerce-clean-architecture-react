/**
 * DTO para representar un usuario
 * Debe coincidir exactamente con el backend
 */
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}
