import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';


@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private readonly roomRepo: Repository<Room>) { }

    async create(dto: CreateRoomDto): Promise<Room> {
        const room = this.roomRepo.create(dto);

        return this.roomRepo.save(room);
    }

    async findAll(): Promise<Room[]> {
        const rooms = this.roomRepo.find({ where: { isBooked: false } });

        return rooms;
    }

    async bookRoom(id: string): Promise<Room> {
        const room = await this.roomRepo.findOneBy({ id });

        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }

        room.isBooked = true;

        return this.roomRepo.save(room);
    }

    async updateRoom(id: string, data: Partial<Room>): Promise<void> {
        await this.roomRepo.update(id, data)
    }
}
