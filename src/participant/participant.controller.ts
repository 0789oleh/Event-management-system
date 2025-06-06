import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { User } from 'src/users/users';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Participant } from './participant';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('participants')
@Controller('participants')
@Throttle({default: {limit: 100, ttl: 10000}})
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Зареєструвати користувача на подію' })
  @ApiResponse({ status: 201, description: 'Успішно зареєстрвано' })
  @ApiResponse({ status: 404, description: 'Не знайдено'})
  @UseGuards(AuthGuard('jwt'))
  async add(@CurrentUser() user: User,
  @Body('eventId') eventId: number) {
    const userId = user.id;
    return await this.participantService.createParticipant(eventId, userId);
  }

  @Get()
  @ApiOperation({ summary: "Знайти всі зв'язки учасник -- подія" })
  @ApiResponse({ status: 200, description: 'Успішно знайдено' })
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
