import { IsAlpha, IsAlphanumeric, IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsAlphanumeric()
    @MinLength(6)
    @Matches(/^(?=.[0-9])/, { message: 'Password must contain character and at least one number' })
    password: string;
}