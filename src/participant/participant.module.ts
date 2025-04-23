import { Module } from '@nestjs/common';
import { Participant } from './participant';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Event])],
  providers: [ParticipantService],
  exports: [ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}
