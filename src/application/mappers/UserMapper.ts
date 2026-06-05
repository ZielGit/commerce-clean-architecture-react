import { User } from '../../domain/entities/User';

export class UserMapper {
  static toDomain(data: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  }): User {
    return new User(data.id, data.email, data.name, data.roles);
  }
}
