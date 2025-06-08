import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeEach(async () => {
    userRepository = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should validate user with correct credentials', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('123456', 10),
    };

    userRepository.findOneBy!.mockResolvedValue(user);

    const result = await service.validateUser('test@example.com', '123456');
    expect(result).toBeDefined();
    expect(result?.email).toBe('test@example.com');
  });

  it('should return null for invalid password', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('correctpass', 10),
    };

    userRepository.findOneBy!.mockResolvedValue(user);

    const result = await service.validateUser('test@example.com', 'wrongpass');
    expect(result).toBeNull();
  });

  it('should return null if user not found', async () => {
    userRepository.findOneBy!.mockResolvedValue(null);

    const result = await service.validateUser('no-user@example.com', '123456');
    expect(result).toBeNull();
  });
});
