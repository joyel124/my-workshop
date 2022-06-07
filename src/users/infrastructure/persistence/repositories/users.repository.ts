import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/domain/entities/user.model";
import { UsersRepository } from "src/users/domain/repositories/users.repository";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export class UsersEntityRepository implements UsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ){

    }

    create(user: User): Promise<User>{
        return Promise.resolve(undefined);
    }
    delete(id: number): Promise<{delete: boolean}>{
        return Promise.resolve({ delete: false});
    }
    findAll(): Promise<User[]>{
        return Promise.resolve([]);
    }
    findByEmail(email: string): Promise<User>{
        return Promise.resolve(undefined);
    }
}
