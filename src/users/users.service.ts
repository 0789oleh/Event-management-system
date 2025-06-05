import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-responce.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async register(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.findOneBy({ email: dto.email });
    if (existing) {
      throw new Error('User already exists');
    }
  
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);
  
    const user = this.userRepository.create(dto);
    const saved = await this.userRepository.save(user) as User;
  
    //UserResponseDto convertion
    const { id, name, email } = saved;
    return { id, name, email };
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
