import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestApp } from './common/test-setup';

describe('Users (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initTestApp()
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create new user', async () => {
        const body = {
            email: `test+${Date.now()}@example.com`,
            password: 'password',
        }

        const res = await request(app.getHttpServer())
            .post('/users/register')
            .send(body)
            .expect(201)

        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe(body.email);
    })
});
