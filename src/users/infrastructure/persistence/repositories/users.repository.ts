import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/entities/user.model';
import { UsersRepository } from 'src/users/domain/repositories/users.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

export class UsersEntityRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async create(user: User): Promise<User> {
    let userEntity = this.mapper.map(user, User, UserEntity);
    userEntity = this.usersRepository.create(userEntity);
    await this.usersRepository.save(userEntity);
    return this.mapper.map(userEntity, UserEntity, User);
  }
  async delete(id: number): Promise<{ delete: boolean }> {
    await this.usersRepository.delete({ id });
    return { delete: false };
  }
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findByEmail(email: string): Promise<User> {
    const userEntity = await this.usersRepository.findOne({
      where: { email: email },
    });
    return this.mapper.map(userEntity, UserEntity, User);
  }
  async findById(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, user: User): Promise<User> {
    let userEntity = this.mapper.map(user, User, UserEntity);
    await this.usersRepository.update({ id }, userEntity);
    userEntity = await this.usersRepository.findOne({ id });
    return this.mapper.map(userEntity, UserEntity, User);
  }
}
