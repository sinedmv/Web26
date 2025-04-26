import { Field, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class UpdateNewsDto {
    @ApiProperty({
        example: 'Обновленный заголовок',
        description: 'Новый заголовок новости',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    readonly title?: string;

    @ApiProperty({
        example: 'Обновленное содержание...',
        description: 'Новое содержание новости',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    readonly content?: string;

    @ApiProperty({
        example: [1, 3],
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