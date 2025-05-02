import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from './event';
import { Repository } from 'typeorm';

describe('EventService', () => {
  let service: EventService;
  let repo: Partial<Record<keyof Repository<Event>, jest.Mock>>;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should create event', async () => {
    const mockEvent = { name: 'concert', location: 'City' };
    repo.create!.mockReturnValue(mockEvent);
    repo.save!.mockResolvedValue({ id: 1, ...mockEvent });

    const result = await service.createEvent('concert', '', 'City', 100);
    expect(result).toMatchObject({ name: 'concert', location: 'City' });
    expect(repo.save).toHaveBeenCalled();
  });

  it('should find all events', async () => {
    repo.find!.mockResolvedValue([{ name: 'test' }]);
    const events = await service.findAllEvent();
    expect(events.length).toBeGreaterThan(0);
  });
});