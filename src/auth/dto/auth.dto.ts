import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SignInDto {
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}