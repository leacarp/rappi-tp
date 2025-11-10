import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AssignDriverDto {
  @ApiProperty({ type: String })
  @IsString()
  driverId: string;
}