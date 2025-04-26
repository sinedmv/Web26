import { IsString, IsEmail, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: 'new_john_doe',
        description: 'Новое имя пользователя',
        required: false,
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    username?: string;

    @ApiProperty({
        example: 'new_john@example.com',
        description: 'Новый email',
        required: false,
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        example: 'new_password123',
        description: 'Новый пароль (минимум 6 символов)',
        required: false,
        minLength: 6,
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @ApiProperty({
        example: true,
        description: 'Сделать пользователя администратором',
        required: false,
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;
}