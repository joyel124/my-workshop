import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  password: string;
}
