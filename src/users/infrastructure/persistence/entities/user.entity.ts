import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { createHmac } from 'crypto';
import { AutoMap } from '@automapper/classes';

@Entity('users')
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  email: string;

  hashPassword() {
    this.password = createHmac('sha256', this.password).digest('hex');
  }

  @AutoMap()
  @Column()
  password: string;
}
