import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { User } from 'src/users/users';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  async add(@Body() body: { eventId: number; userId: number }, @CurrentUser() user: User) {
    return await this.participantService.createParticipant(body.eventId, body.userId);
  }

  @Get()
  async findAll(){
    return await this.participantService.findAllParticipants();
  }

  @Get(':id')
  async findById(@Param('id') id: string){
    return await this.participantService.findParticipantById(+id);
  }

  @Patch(':id/change-event')
  async changeEvent(
  @Param('id') participantId: string, @CurrentUser() user: User,
  @Body('eventId') eventId: number) {   
    return this.participantService.changeEvent(+participantId, eventId);
  }
}
