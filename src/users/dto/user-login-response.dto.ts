import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-responce.dto';

export class UserLoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOi…' })
  access_token: string;

  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
}
