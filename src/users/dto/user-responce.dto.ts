import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserResponseDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsNumber()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 'john@example.com' })
  email: string;
}
