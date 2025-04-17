import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, Int } from '@nestjs/graphql';
import {IsEmail, IsString, IsInt} from "class-validator";

@InputType()
export class CreateUserDto {
    @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
    @Field()
    @IsString()
    email: string;

    @ApiProperty({ example: 'John', description: 'Имя пользователя' })
    @Field()
    @IsEmail()
    name: string;

    @ApiProperty({ example: 25, description: 'Возраст пользователя' })
    @Field(() => Int)
    @IsInt()
    age: number;
}