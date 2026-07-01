import type { UserDto } from './UserDto';

export interface LoginResponseDto {
  token: string;
  user: UserDto;
}
