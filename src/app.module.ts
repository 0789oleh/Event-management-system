import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantModule } from './participant/participant.module';
import { EventModule } from './event/event.module';
import { User } from './users/users';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'
import { Participant } from './participant/participant';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: 5432,
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
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