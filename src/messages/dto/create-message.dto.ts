import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateMessageDto {
    @ApiProperty({
        example: 'Привет! Как подготовиться к олимпиаде?',
        description: 'Текст сообщения',
        required: true
    })
    @Field()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        example: 1,
        description: 'ID автора сообщения',
        required: true
    })
    @Field(() => Int)
    @IsInt()
    @IsPositive()
    authorId: number;

    @ApiProperty({
        example: 1,
        description: 'ID связанной олимпиады',
        required: false
    })
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    olympiadId?: number | null;

    @ApiProperty({
        example: 1,
        description: 'ID связанной новости',
        required: false
    })
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    newsId?: number | null;
}