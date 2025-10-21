import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateDriverAvailabilityRequest {
    @IsBoolean()
    @IsNotEmpty({ message: 'La disponibilidad es requerida' })
    isAvailable: boolean;
}