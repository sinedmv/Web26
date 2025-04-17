import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

@InputType()
export class CreateNewsDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @Field(() => [Int], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly olympiadIds?: number[];
}
