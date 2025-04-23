import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/events.module';
import { ParticipantsModule } from './participants/participants.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { ParticipantModule } from './participant/participant.module';
import { EventsController } from './events/events.controller';
import { User } from './user/user';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventModule, ParticipantsModule, UsersModule, EventModule, ParticipantModule, AuthModule],
  controllers: [AppController, EventsController],
  providers: [AppService, User],
})
export class AppModule {}
