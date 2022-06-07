import { Inject, Injectable } from '@nestjs/common';
import {
  UsersRepository,
  USERS_REPOSITORY,
} from '../repositories/users.repository';
import { User } from '../entities/user.model';
//Capa de Servicio
@Injectable()
export class UsersService {
  constructor(
    //Capa de persistencia(Repository)
    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepository,
  ) {}

  async getAll() {
    return await this.usersRepository.findAll();
  }

  async create(user: User) {
    return await this.usersRepository.create(user);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }

  async getbyId(id: number) {
    return await this.usersRepository.findById(id);
  }

  async update(id: number, user: User) {
    return await this.usersRepository.update(id, user);
  }
  async delete(id: number) {
    return await this.usersRepository.delete(id);
  }
}
