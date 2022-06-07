import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { UsersController } from './interface/rest/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UsersEntityRepository } from './infrastructure/persistence/repositories/users.repository';
import { USERS_REPOSITORY } from './domain/repositories/users.repository';
import { UserProfile } from './application/transform/profiles/user.profile';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { useClass: UsersEntityRepository, provide: USERS_REPOSITORY },
    UserProfile,
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
