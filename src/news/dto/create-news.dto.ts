import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateNewsDto {
    @ApiProperty({
        example: 'Новая олимпиада по математике',
        description: 'Заголовок новости',
        required: true
    })
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({
        example: 'Скоро стартует ежегодная олимпиада...',
        description: 'Содержание новости',
        required: true
    })
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiProperty({
        example: [1, 2],
        description: 'ID связанных олимпиад',
        required: false,
        type: [Number]
    })
    @Field(() => [Int], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly olympiadIds?: number[];
}