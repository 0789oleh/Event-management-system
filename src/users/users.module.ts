import { Module } from '@nestjs/common';
import { User} from './users';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  providers: [User, UserService],
  controllers: [UserController]
})
export class UsersModule {}
