import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserResponseDto {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    @Field(() => Number)
    id: number;

    @ApiProperty({ example: 'john_doe', description: 'Имя пользователя' })
    @Field()
    username: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
    @Field()
    email: string;

    @ApiProperty({ example: false, description: 'Является ли администратором' })
    @Field()
    isAdmin: boolean;

    @ApiProperty({ example: '2024-06-01T12:00:00.000Z', description: 'Дата создания' })
    @Field()
    createdAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.isAdmin = user.isAdmin;
        this.createdAt = user.createdAt;
    }
}