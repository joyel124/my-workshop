import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  @AutoMap()
  name: string;
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;
}
