import { Module } from '@nestjs/common';
import { Event } from './event';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  providers: [Event, EventService],
  controllers: [EventController]
})
export class EventModule {}
