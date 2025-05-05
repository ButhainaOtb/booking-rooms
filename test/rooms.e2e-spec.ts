import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/commons/enums/user-role.enum';
import { initTestApp } from './common/test-setup';

describe('Rooms (e2e)', () => {
    let app: INestApplication;
    let jwt: string;

    beforeAll(async () => {

        app = await initTestApp()

        const userRepo = app.get(getRepositoryToken(User));
        const jwtService = app.get(JwtService);


        const user = await userRepo.save({
            email: `test+${Date.now()}@example.com`,
            password: 'password',
            role: UserRole.ADMIN,
        });

        jwt = jwtService.sign({
            sub: user.id,
            role: user.role,
        });
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create new room by admin', async () => {
        const body = {
            name: 'Admin Room',
            capacity: 5,
        };

        const res = await request(app.getHttpServer())
            .post('/rooms')
            .set('Authorization', `Bearer ${jwt}`)
            .send(body)
            .expect(201);

        expect(res.body.name).toBe('Admin Room')
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
});
