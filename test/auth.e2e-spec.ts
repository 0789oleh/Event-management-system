import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users';
import { Participant } from 'src/participant/participant';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { EventModule } from 'src/event/event.module';
import { ParticipantModule } from 'src/participant/participant.module';
import { AuthModule } from 'src/auth/auth.module';
import { DataSource } from 'typeorm';


//TODO: make workable (without 4xx errors)
describe('Auth flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Подключаем чистый SQLite in-memory
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
          dropSchema: true,
        }),
        // Регистрируем сам EventModule (внутри него TypeOrmModule.forFeature([Event]))
        UsersModule,
        AuthModule
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  }, 30_000);

  let accessToken: string;

  it('/auth/register (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '1234',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('/auth/login (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: '1234',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');

    accessToken = res.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });
});