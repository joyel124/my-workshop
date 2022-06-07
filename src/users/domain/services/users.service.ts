import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './application/transform/user.dto';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
//Capa de Servicio
@Injectable()
export class UsersService {
    constructor(//Capa de persistencia(Repository)
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ){}

    async showAll(){
        return await this.usersRepository.find();
    }

    async create(data: UserDto){
        const user=this.usersRepository.create(data);
        await this.usersRepository.save(data);
        return user;
    }

    async getByEmail(email: string): Promise<UserDto>{
        return await this.usersRepository.findOne({
            where: {email: email},
        });
    }

    async getbyId(id: number){
        return await this.usersRepository.findOne({ where: {id: id}});
    }

    async update(id: number, data: Partial<UserDto>){
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ id });
    }

    async delete(id: number){
        await this.usersRepository.delete({id});
        return {deleted: true};
    }
}
