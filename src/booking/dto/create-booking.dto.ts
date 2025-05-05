import { IsDateString } from "class-validator";

export class CreateBookingDto {

    @IsDateString()
    startTime: string;

    @IsDateString()
    endTime: string;
}