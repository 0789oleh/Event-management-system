import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Event } from './event';

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {}

    async createEvent(name: string, description: string, location: string, maxParticipants: number): Promise<Event> {
        try {
            const event = this.eventRepository.create({
              name,
              description,
              location,
              maxParticipants,
            });
        return await this.eventRepository.save(event);
        } catch(error){
            console.error('Error creating event:', error);
            throw new Error('Unable to create event');
        }
    }

    async findAllEvent(): Promise<Event[]> {
        return await this.eventRepository.find();
    }

    async  findEventById(id: number): Promise<Event | null> {
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
        return await this.eventRepository.delete(id);
    }

}
