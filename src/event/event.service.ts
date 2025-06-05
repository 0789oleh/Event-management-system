import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Event } from './event';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {}
    private readonly logger = new Logger(EventService.name)

    async createEvent(dto: CreateEventDto): Promise<Event> {
        try {
            const event = this.eventRepository.create(dto);
            this.logger.log(`Event creation: ${dto.name}`);
            return await this.eventRepository.save(event);
          } catch (error) {
            this.logger.error(`Error while creating event: ${error.message}`, error.stack);
            throw new Error('Unable to create event');
          }
    }

    async findAllEvent(): Promise<Event[]> {
        this.logger.log('Searching for all events');
        return await this.eventRepository.find();
    }

    async  findEventById(id: number): Promise<Event | null> {
        this.logger.log(`Finding event with id ${id}`);
        return await this.eventRepository.findOneBy({ id });
    }

    async updateEvent(id: number, dto: UpdateEventDto): Promise<Event> {
        try {
          const event = await this.eventRepository.findOneBy({ id });
          if (!event) {
            this.logger.warn(`Событие с id=${id} не найдено`);
            throw new Error('Event not found');
          }
      
          const updated = { ...event, ...dto };
          this.logger.log(`Обновление события с id=${id}`);
          return await this.eventRepository.save(updated);
        } catch (error) {
          this.logger.error(`Ошибка при обновлении события ${id}: ${error.message}`, error.stack);
          throw new Error('Unable to update event');
        }
      }

    async removeEvent(id: number): Promise<DeleteResult> {
        this.logger.log(`Deleting event with id = ${id}`)
        return await this.eventRepository.delete(id);
    }

}
