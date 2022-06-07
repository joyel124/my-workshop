import { AutoMap } from '@automapper/classes';

export class UpdateUserDto {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;
}
