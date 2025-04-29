import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { User } from 'src/users/users';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Participant } from './participant';
import { AuthGuard } from '@nestjs/passport';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async add(@CurrentUser() user: User,
  @Body('eventId') eventId: number) {
    const userId = user.id;
    return await this.participantService.createParticipant(eventId, userId);
  }

  @Get()
  async findAll(){
    return await this.participantService.findAllParticipants();
  }

  @Get(':id')
  async findById(@Param('id') id: string){
    return await this.participantService.findParticipantById(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/change-event')
  async changeEvent(@CurrentUser() user: User,
  @Body('eventId') eventId: number) {  
    const participantId = user.id; 
    return this.participantService.changeEvent(+participantId, eventId);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@CurrentUser() user: User, @Body('id') id: number) {
    const participantId = user.id;
    return this.participantService.deleteParticipant(participantId, id);
  }

}
