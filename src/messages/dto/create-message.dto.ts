import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, ArrayNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class CreateMessageDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    content: string;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    authorId: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    olympiadId?: number | null;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    newsId?: number | null;
}