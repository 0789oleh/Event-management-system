import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from './event';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventService', () => {
  let service: EventService;
  let repo: Partial<Record<keyof Repository<Event>, jest.Mock>>;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findAndCount: jest.fn().mockResolvedValue([
        [{ id: 1, name: 'Test Event' }], // data
          1,                               // total
        ]),
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
    const dto: CreateEventDto = {
      name: 'concert',
      description: 'some artist',
      location: 'City',
      maxParticipants: 100,
    };
  
    const mockSavedEvent = { id: 1, ...dto };

  repo.create!.mockReturnValue(dto);
  repo.save!.mockResolvedValue(mockSavedEvent);

  const result = await service.createEvent(dto);

  expect(result).toEqual(mockSavedEvent);
  expect(repo.save).toHaveBeenCalledWith(dto);
  });

  it('should find all events', async () => {
    repo.find!.mockResolvedValue([{ name: 'test' }]);
    const events = await service.findAllEvent();
    expect(events.data.length).toBeGreaterThan(0);
  });
}); 