import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsDate, IsArray, ArrayNotEmpty, IsInt, IsDateString } from 'class-validator';

@InputType()
export class UpdateOlympiadDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    organization?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    subject?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsDateString()
    registrationStartDate?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsDateString()
    registrationEndDate?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsDateString()
    olympiadDate?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    additionalInfo?: string;

    @Field(() => [Int], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    participantIds?: number[];
}
