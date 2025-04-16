import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'john_doe', description: 'Уникальное имя пользователя' })
    username: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
    password: string;
}