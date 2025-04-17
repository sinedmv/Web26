import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, ArrayNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class UpdateMessageDto {
    @Field()
    @IsString()
    @IsOptional()
    readonly content?: string;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @IsOptional()
    readonly olympiadId?: number | null;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsOptional()
    readonly newsId?: number | null;
}