import { Injectable } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Injectable()
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 30})
    name: string;

    @Column({type: 'varchar', length: 256})
    description: string;

    @Column({type: 'varchar', length: 256})
    location: string;

    @Column({type: 'int' })
    maxParticipants: number;
}
