import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  hashPassword(){
    //this.password=crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column()
  password: string;
}
