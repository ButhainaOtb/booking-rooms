import { Controller, Get, Post, UseGuards, Body, Patch, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { UserRole } from 'src/commons/enums/user-role.enum';

@Controller('rooms')
export class RoomsController {

    constructor(private readonly roomsService: RoomsService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll() {
        return this.roomsService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() dto: CreateRoomDto) {
        return this.roomsService.create(dto);
    }


    @Patch(':id/book')
    @UseGuards(AuthGuard('jwt'))
    bookRoom(@Param('id') id: string) {
        return this.roomsService.bookRoom(id);
    }
}
