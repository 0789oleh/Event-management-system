import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventModule } from '../src/event/event.module';
import { Event } from '../src/event/event';
import { User } from 'src/users/users';

//TODO: make wokable 
describe('EventModule (e2e on SQLite)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Подключаем чистый SQLite in-memory
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Event, User],
          synchronize: true,
          dropSchema: true,
        }),
        // Регистрируем сам EventModule (внутри него TypeOrmModule.forFeature([Event]))
        EventModule
      ],
    }).compile();

    app = module.createNestApplication();
    // Если используешь валидацию DTO глобально — подключи пайп, чтобы контроллеры в тесте его тоже использовали:
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  }, 20000);

  it('GET /event → пустой массив', async () => {
    const res = await request(app.getHttpServer()).get('/event');
    expect(res.status).toBe(200);
    expect(res.body).toEqual( {"data": [], "total": 0});
  });

  it('POST /event → создаёт и возвращает объект', async () => {
    const dto = {
      name: 'Concert',
      description: 'Tribute show',
      location: 'Middletown',
      maxParticipants: 100,
    };

    const res = await request(app.getHttpServer())
      .post('/event')
      .send(dto);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      name: dto.name,
      location: dto.location,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});