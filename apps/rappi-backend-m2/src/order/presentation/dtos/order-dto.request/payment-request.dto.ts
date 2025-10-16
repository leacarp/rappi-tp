import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentRequestDto{
    @IsNotEmpty()
    @IsString()
    method : string;

    @IsNotEmpty()
    @IsString()
    status : string;


    @IsNotEmpty()
    @IsString()
    transactionId : string;

}