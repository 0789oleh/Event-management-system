import { Injectable } from '@nestjs/common';
import { Participant } from './participant';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Event } from 'src/event/event';

@Injectable()
export class ParticipantService {
    constructor(@InjectRepository(Participant) 
    private readonly participantRepository: Repository<Participant>,
       
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>) {}

    async createParticipant(userId: number, eventId: number): Promise<Participant | string> {
            const event = await this.eventRepository.findOneBy({ id: eventId });
            if (!event) {
                throw new Error(`Event with id ${eventId} not found`);
            }
            const count = await this.participantRepository.count({ where: { eventId } });
    
            if (count >= event.maxParticipants) {
                return `Event with id ${eventId} already has maximum participants`;
            }
            const participant: Participant = new Participant();
            participant.eventId = eventId;
            participant.userId = userId;
            
            return this.participantRepository.save(participant);
    }

    async deleteParticipant(id: number): Promise<DeleteResult> {
        return await this.participantRepository.delete(id);
    }

    async findAllParticipants(): Promise<Participant[]> {
        return await this.participantRepository.find();
    }

    async findParticipantById(id: number): Promise<Participant|null> {
        return await this.participantRepository.findOneBy({id });
    }

    async changeEvent(participantId: number, eventId: number): Promise<Participant | string> {
        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) {
            throw new Error(`Event with id ${eventId} not found`);
        }
    
        const count = await this.participantRepository.count({ where: { eventId } });
        if (count >= event.maxParticipants) {
            return `Event with id ${eventId} already has maximum participants`;
        }
    
        const participant = await this.participantRepository.findOneBy({ id: participantId });
        if (!participant) {
            throw new Error(`Participant with id ${participantId} not found`);
        }
    
        participant.eventId = eventId;
        
        return this.participantRepository.save(participant);
    }

}
