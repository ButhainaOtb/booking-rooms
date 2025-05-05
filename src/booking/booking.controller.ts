import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BookingService } from './booking.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post(':roomId')
    bookRoom(@CurrentUser() user, @Param('roomId') roomId: string, @Body() dto: CreateBookingDto) {
        return this.bookingService.bookRoom(user.userId, roomId, dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMyBooking(@CurrentUser() user) {
        return this.bookingService.getMyBookings(user.userId)
    }

}
