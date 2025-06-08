import { Injectable } from '@nestjs/common';

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { length: 50 })
  name: string;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ length: 256 })
  password: string; // password hash
}