import { Module } from '@nestjs/common';
import { Event } from './event';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [EventService],
  imports: [TypeOrmModule.forFeature([Event])], 
  exports: [EventService],
  controllers: [EventController]
})
export class EventModule {}
