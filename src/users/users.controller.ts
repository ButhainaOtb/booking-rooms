import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.usersService.register(dto);
    }

}
