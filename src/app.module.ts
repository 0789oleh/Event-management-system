import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantModule } from './participant/participant.module';
import { EventModule } from './event/event.module';
import { User } from './users/users';
import { Event } from './event/event';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'
import { Participant } from './participant/participant';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: Number(config.get<string>('POSTGRES_PORT')),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [User, Event, Participant],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    EventModule,
    ParticipantModule,
    AuthModule,
  ],
})
export class AppModule {}