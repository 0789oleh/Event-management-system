import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Event } from './event';

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {}
    private readonly logger = new Logger(EventService.name)

    async createEvent(name: string, description: string, location: string, maxParticipants: number): Promise<Event> {
        try {
            const event = this.eventRepository.create({
              name,
              description,
              location,
              maxParticipants,
            });
        this.logger.log(`Creating event with name ${name}`);
        return await this.eventRepository.save(event);
        } catch(error){
            this.logger.error(`Error creating event:`, error);
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

    async updateEvent(id: number, name: string, description: string, location: string, maxParticipants: number): Promise<Event> {
        const event: Event = new Event();
        event.name = name;
        event.description = description;
        event.location = location;
        event.maxParticipants = maxParticipants;
        event.id = id;
        return await this.eventRepository.save(event);
    }

    async removeEvent(id: number): Promise<DeleteResult> {
        this.logger.log(`Deleting event with id = ${id}`)
        return await this.eventRepository.delete(id);
    }

}
