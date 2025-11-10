import { IsBoolean, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverAvailabilityRequest {
    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsNotEmpty({ message: 'La disponibilidad es requerida' })
    isAvailable: boolean;
}