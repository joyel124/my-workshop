import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
//Out Bound
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    async getAllUsers(){
        const users=await this.usersService.getAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Users fetched successfully',
            users,
        }
    }
}
