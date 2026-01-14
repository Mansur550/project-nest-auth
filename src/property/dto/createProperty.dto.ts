import { IsInt, IsString, Length } from "class-validator";

export class CreateProrertyDto {
    @IsString()
    @Length(2, 10)
    name: string;
    @IsString()
    description: string;

    @IsInt()
    area: number;

}