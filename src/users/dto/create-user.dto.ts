import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
    @ApiProperty({
        example: 'john_doe',
        description: 'Имя пользователя',
        required: true,
    })
    @Field()
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'Email пользователя',
        required: true,
    })
    @Field()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'Пароль (минимум 6 символов)',
        required: true,
        minLength: 6,
    })
    @Field()
    @IsString()
    @MinLength(6)
    password: string;
}