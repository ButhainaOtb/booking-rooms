import { IsString, IsInt, IsOptional } from "class-validator";

export class CreateRoomDto {
    @IsString()
    name: string;

    @IsInt()
    capacity: number;
}

export class UpdateRoomDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    capacity: number;
}