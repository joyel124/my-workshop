import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { InjectMapper } from '@automapper/nestjs';
import { UserDto } from '../../application/transform/dto/user.dto';
import { User } from '../../domain/entities/user.model';
import { Mapper } from '@automapper/core';
import { CreateUserDto } from '../../application/transform/dto/create-user.dto';
import { UpdateUserDto } from '../../application/transform/dto/update-user.dto'; //Out Bound
@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAll();
    const resources = users.map((user) => this.mapper.map(user, User, UserDto));
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users: resources,
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.mapper.map(createUserDto, CreateUserDto, User);
    console.log(user);
    const result = await this.usersService.create(user);
    const resource = this.mapper.map(user, User, UserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      user: resource,
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getById(id);
    const resource = this.mapper.map(user, User, UserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      user: resource,
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = this.mapper.map(updateUserDto, UpdateUserDto, User);
    const result = await this.usersService.update(id, user);
    const resource = this.mapper.map(result, User, UserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      user: resource,
    };
  }

  @Patch(':id')
  async partiallyUpdateUser(
    @Param('id') id: number,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    const user = this.mapper.map(updateUserDto, UpdateUserDto, User);
    const result = await this.usersService.update(id, user);
    const resource = this.mapper.map(result, User, UserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      user: resource,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'User deleted successfully',
    };
  }
}
