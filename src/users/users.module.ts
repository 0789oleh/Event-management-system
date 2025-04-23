import { Module } from '@nestjs/common';
import { User} from './users';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ← это обязательно
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // если используется в других модулях
})
export class UsersModule {}
