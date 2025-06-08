import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsInt, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  @ApiProperty({example: "Exhibition"})
  name: string;

  @IsString()
  @ApiProperty({example: "Aivazovsky's paintings exhibition"})
  description: string;

  @IsString()
  @ApiProperty({example: "Nature Museum, Middletown"})
  location: string;

  @IsInt()
  @ApiProperty({example: 250})
  maxParticipants: number;
}