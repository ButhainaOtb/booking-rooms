import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RoomsService } from 'src/rooms/rooms.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class BookingService {
    constructor(@InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>, private readonly roomService: RoomsService) { }


    async bookRoom(userId: string, roomId: string, dto: CreateBookingDto): Promise<Booking> {
        this.roomService.bookRoom(roomId)

        const startTime = dto.startTime
        const endTime = dto.endTime

        const booking = this.bookingRepo.create({ user: { id: userId }, room: { id: roomId }, startTime: startTime, endTime: endTime })

        return await this.bookingRepo.save(booking)

    }

    async getMyBookings(userId): Promise<Booking[]> {
        const bookings = await this.bookingRepo.find({ where: { user: { id: userId } }, relations: ['room'] })

        return bookings

    }

    @Cron(CronExpression.EVERY_MINUTE)
    async deleteExpiredBookings() {
        const now = new Date()

        const bookings = await this.bookingRepo.find({
            where: {
                endTime: LessThan(now)
            }, relations: ['room']
        })

        for (var booking of bookings) {
            await this.roomService.updateRoom(booking.room.id, { isBooked: false })

            await this.bookingRepo.delete(booking.id)
        }
    }


}
