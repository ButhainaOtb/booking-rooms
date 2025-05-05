import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), RoomsModule],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule { }
