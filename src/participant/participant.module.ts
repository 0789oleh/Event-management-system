import { Module } from '@nestjs/common';
import { Participant } from './participant';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';

@Module({
  providers: [Participant, ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}
