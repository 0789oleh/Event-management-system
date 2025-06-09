import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/users';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

describe('UserService (Integration)', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test', // отдельное окружение для тестов
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite', // можно PostgreSQL, если хочешь
          database: ':memory:',
          dropSchema: true,
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should register a new user', async () => {
    const result = await service.register({
      name: 'Test User',
      email: 'test@example.com',
      password: '1234',
    });
    expect(result).toHaveProperty('email', 'test@example.com');
  });

  afterAll(async () => {
    const dataSource = module.get<DataSource>(DataSource);
    await dataSource.destroy();
  });
});