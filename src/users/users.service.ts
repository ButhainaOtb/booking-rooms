import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async register(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.userRepo.create({
            email: dto.email,
            password: hashedPassword
        })

        const saved = await this.userRepo.save(user);
        const { password, ...result } = saved;
        return result;

    }
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email } });
    }

}
