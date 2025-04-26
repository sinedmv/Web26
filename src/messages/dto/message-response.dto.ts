import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { OlympiadResponseDto } from '../../olympiads/dto/olympiad-response.dto';
import {NewsResponseDto} from "../../news/dto/news-response.dto";

@ObjectType()
export class MessageResponseDto {
    @ApiProperty({ example: 1, description: 'ID сообщения' })
    @Field(() => Int)
    id: number;

    @ApiProperty({
        example: 'Привет! Как подготовиться к олимпиаде?',
        description: 'Текст сообщения'
    })
    @Field()
    content: string;

    @ApiProperty({
        example: '2024-01-01T12:00:00.000Z',
        description: 'Дата создания сообщения'
    })
    @Field()
    createdAt: Date;

    @ApiProperty({ type: () => UserResponseDto, description: 'Автор сообщения' })
    @Field(() => UserResponseDto)
    author: UserResponseDto;

    @ApiProperty({
        type: () => OlympiadResponseDto,
        description: 'Связанная олимпиада',
        nullable: true
    })
    @Field(() => OlympiadResponseDto, { nullable: true })
    olympiad?: OlympiadResponseDto | null;

    @ApiProperty({
        type: () => NewsResponseDto,
        description: 'Связанная новость',
        nullable: true
    })
    @Field(() => NewsResponseDto, { nullable: true })
    news?: NewsResponseDto | null;

    constructor(message: any) {
        this.id = message.id;
        this.content = message.content;
        this.createdAt = message.createdAt;
        this.author = new UserResponseDto(message.author);
        this.olympiad = message.olympiad ? new OlympiadResponseDto(message.olympiad) : null;
        this.news = message.news ? new NewsResponseDto(message.news) : null;
    }
}