import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-responce.dto';
import { IsString } from 'class-validator';

export class UserLoginResponseDto {

  @IsString()
  @ApiProperty({ example: 'eyJhbGciOi…' })
  access_token: string;

  @IsString()
  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
}
