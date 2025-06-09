import { ConflictException, Injectable, Logger } from '@nestjs/common';
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


    private readonly logger = new Logger(ParticipantService.name)

    async createParticipant(userId: number, eventId: number): Promise<Participant | string> {
            const event = await this.eventRepository.findOneBy({ id: eventId });
            if (!event) {
                this.logger.error(`Event ${eventId} not found`);
                throw new Error(`Event with id ${eventId} not found`);
            }
            const count = await this.participantRepository.count({ where: { eventId } });
    
            if (count >= event.maxParticipants) {
                this.logger.error(`Registering on ${eventId}W not possible.`);
                return `Event with id ${eventId} already has maximum participants`;
            }
            const participant: Participant = new Participant();
            participant.eventId = eventId;
            participant.userId = userId;
            
            const existingRegistration = await this.participantRepository.findOne({
                relations: ['user', 'event'], 
                where:  { userId: participant.userId ,  eventId: participant.eventId } 
            });
          
            if (existingRegistration) {
                this.logger.error(`User already registered for ${eventId}`)
                throw new ConflictException('User already registered for this event');
            }

            this.logger.log(`Registering a new participant to the event with ${eventId}`)
            return this.participantRepository.save(participant);

    }

    async deleteParticipant(participantId: number, id: number): Promise<DeleteResult> {
        this.logger.log(`Unregistering participant from `)
        return this.participantRepository.delete({ id, eventId: participantId });
    }

    async findAllParticipants(page = 1, limit = 10): Promise<{ data: Participant[]; total: number }> {
        this.logger.log(`Searching for ${limit} participants at ${page} page`)
        const skip = (page - 1) * limit;
      
        const [data, total] = await this.participantRepository.findAndCount({
          skip,
          take: limit,
          order: { id: 'ASC' },
        });
      
        return { data, total };
    }
  

    async findParticipantById(id: number): Promise<Participant|null> {
        this.logger.log(`Searching relationship User-Event by id ${id}`)
        return await this.participantRepository.findOneBy({id });
    }

    async changeEvent(participantId: number, eventId: number): Promise<Participant | string> {
        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) {
            throw new Error(`Event with id ${eventId} not found`);
        }
    
        const count = await this.participantRepository.count({ where: { eventId } });
        if (count >= event.maxParticipants) {
            this.logger.log(`Can't register new participant`)
            return `Event with id ${eventId} already has maximum participants`;
        }
    
        const participant = await this.participantRepository.findOneBy({ id: participantId });
        if (!participant) {
            this.logger.error(`Throwing the new error. Participant ${participantId} not found.`);
            throw new Error(`Participant with id ${participantId} not found`);
        }
    
        participant.eventId = eventId;
        
        this.logger.log("Changing event to ${eventId}");
        return this.participantRepository.save(participant);
    }

}
