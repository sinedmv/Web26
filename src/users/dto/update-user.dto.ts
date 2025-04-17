import { IsString, IsEmail, IsOptional, MinLength, IsBoolean } from 'class-validator';
import {Field, InputType} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";

@InputType()
export class UpdateUserDto {
    @ApiProperty({ example: 'John', description: 'Имя пользователя' })
    @Field()
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
    @Field()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
    @Field()
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @ApiProperty({ example: 'true', description: 'Админ ли пользователь' })
    @Field()
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;
}