import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestApp } from './common/test-setup';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    const email = `test+${Date.now()}@example.com`

    beforeAll(async () => {
        app = await initTestApp()

        const body = {
            email: email,
            password: 'password',
        }

        await request(app.getHttpServer())
            .post('/users/register')
            .send(body)
            .expect(201)

    });

    afterAll(async () => {
        await app.close();
    });

    it('should login and get the access token', async () => {
        const body = {
            email: email,
            password: 'password',
        }

        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send(body)
            .expect(201)

        expect(res.body).toHaveProperty('accessToken')
    })
});
