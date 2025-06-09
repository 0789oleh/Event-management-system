import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ParticipantService } from "src/participant/participant.service";
import { Repository } from "typeorm";
import { Participant } from "./participant";

describe('participantService', () => {
  let service: ParticipantService;
  let repo: Partial<Record<keyof Repository<Participant>, jest.Mock>>;
  let mockEventRepo: Partial<Record<keyof Repository<Event>, jest.Mock>>;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      count: jest.fn()
    };

    mockEventRepo = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantService,
        {
          provide: getRepositoryToken(Participant),
          useValue: repo,
        },
        {
          provide: getRepositoryToken(Event),
          useValue: mockEventRepo,
        },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  it('should create participant', async () => {
    const mockParticipantData = { userId: 1, eventId: 1 };
    const mockSavedParticipant = { id: 1, ...mockParticipantData };
  
    // Моки всех промежуточных шагов:
    mockEventRepo.findOneBy!.mockResolvedValue({ id: 1, maxParticipants: 100 }); // нашёл событие
    repo.count!.mockResolvedValue(0); // свободные места есть
    repo.findOne!.mockResolvedValue(null); // пользователь ещё не зарегистрирован
  
    // Сам participant
    repo.create!.mockReturnValue(mockParticipantData);
    repo.save!.mockResolvedValue(mockSavedParticipant);
  
    const result = await service.createParticipant(1, 1);
  
    expect(result).toEqual(mockSavedParticipant);
    expect(repo.save).toHaveBeenCalledWith(mockParticipantData);
  });

  // it('should find all participants', async () => {
  //   repo.find!.mockResolvedValue([{ name: 'test' }]);
  //   const participants = await service.findAllParticipants();
  //   expect(participants.data.length).toBeGreaterThan(0);
  // });
});