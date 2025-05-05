import { IsEmail, MinLength, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

}