import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/commons/enums/user-role.enum';
import { initTestApp } from './common/test-setup';

describe('Booking (e2e)', () => {
    let app: INestApplication;
    let jwt: string;
    let roomId: string;

    beforeAll(async () => {

        app = await initTestApp()

        const userRepo = app.get(getRepositoryToken(User));
        const roomRepo = app.get(getRepositoryToken(Room));
        const jwtService = app.get(JwtService);


        const user = await userRepo.save({
            email: `test+${Date.now()}@example.com`,
            password: 'password',
            role: UserRole.USER,
        });


        const room = await roomRepo.save({
            name: 'Test Room',
            capacity: 10,
            isBooked: false,
        });

        roomId = room.id;

        jwt = jwtService.sign({
            sub: user.id,
            role: user.role,
        });
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return available rooms', async () => {
        const res = await request(app.getHttpServer())
            .get('/rooms')
            .set('Authorization', `Bearer ${jwt}`)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);

        for (const room of res.body) {
            expect(room).toHaveProperty('isBooked', false);
        }
    });

    it('should create a booking for a user', async () => {
        const res = await request(app.getHttpServer())
            .post(`/booking/${roomId}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                startTime: new Date(Date.now() + 60_000).toISOString(),
                endTime: new Date(Date.now() + 3600_000).toISOString(),
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('startTime');
        expect(res.body.room.id).toBe(roomId);
    });

    it('should return user bookings', async () => {
        const res = await request(app.getHttpServer())
            .get('/booking/me')
            .set('Authorization', `Bearer ${jwt}`)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].room.id).toBe(roomId);
    });


});
