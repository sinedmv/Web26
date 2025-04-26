import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, Int } from '@nestjs/graphql';
import {IsEmail, IsString, IsInt, IsOptional, MinLength, IsNotEmpty} from "class-validator";

@InputType()
export class CreateUserDto {
    @ApiProperty({example: 'John', description: 'Имя пользователя'})
    @Field()
    @IsString()
    username?: string;

    @ApiProperty({ example: 'abas', description: 'Supertoken ID' })
    @IsNotEmpty()
    @IsString()
    supertoken_id: string;

    @ApiProperty({example: 'john@example.com', description: 'Email пользователя'})
    @Field()
    @IsEmail()
    email: string;

    @ApiProperty({example: '123456', description: 'Пароль пользователя'})
    @Field()
    @IsString()
    @MinLength(6)
    password: string;
}