import { Injectable } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Injectable()
@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int' })
    eventId: number;

    @Column({type: 'int'})
    userId: number;
    
}
