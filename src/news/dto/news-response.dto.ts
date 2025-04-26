import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { OlympiadResponseDto } from '../../olympiads/dto/olympiad-response.dto';

@ObjectType()
export class NewsResponseDto {
    @ApiProperty({ example: 1, description: 'ID новости' })
    @Field(() => Int)
    id: number;

    @ApiProperty({ example: 'Новая олимпиада по математике', description: 'Заголовок новости' })
    @Field()
    title: string;

    @ApiProperty({
        example: 'Скоро стартует ежегодная олимпиада...',
        description: 'Содержание новости'
    })
    @Field()
    content: string;

    @ApiProperty({
        type: () => [OlympiadResponseDto],
        description: 'Связанные олимпиады',
        required: false
    })
    @Field(() => [OlympiadResponseDto], { nullable: true })
    relatedOlympiads?: OlympiadResponseDto[];

    constructor(news: any) {
        this.id = news.id;
        this.title = news.title;
        this.content = news.content;
        this.relatedOlympiads = news.relatedOlympiads?.map(o => new OlympiadResponseDto(o));
    }
}