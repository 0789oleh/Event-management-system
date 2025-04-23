import { Test, TestingModule } from '@nestjs/testing';
import { Participant } from './participant';

describe('Participant', () => {
  let provider: Participant;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Participant],
    }).compile();

    provider = module.get<Participant>(Participant);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
