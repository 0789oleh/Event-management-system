import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  private readonly logger = new Logger(AuthService.name)

  async login(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    if (!user) return null;

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    this.logger.log(`Loging in user`);
    return { token };
  }
  
  async register(name: string, email: string, password: string) {
    this.logger.log(`Registering new user`);
    return this.userService.register(name, email, password);
  }

  async validateToken(payload: any) {
    return this.userService.findByEmail(payload.email);
  }
}