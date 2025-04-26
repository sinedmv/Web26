import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsDate, IsArray, ArrayNotEmpty, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateOlympiadDto {
    @ApiProperty({
        example: 'Олимпиада по математике',
        description: 'Название олимпиады',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        example: 'МГУ им. Ломоносова',
        description: 'Организатор олимпиады',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    organization?: string;

    @ApiProperty({
        example: 'Математика',
        description: 'Предмет олимпиады',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    subject?: string;

    @ApiProperty({
        example: '2024-01-01T00:00:00.000Z',
        description: 'Дата начала регистрации',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsDateString()
    registrationStartDate?: Date;

    @ApiProperty({
        example: '2024-01-15T00:00:00.000Z',
        description: 'Дата окончания регистрации',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsDateString()
    registrationEndDate?: Date;

    @ApiProperty({
        example: '2024-02-01T00:00:00.000Z',
        description: 'Дата проведения олимпиады',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsDateString()
    olympiadDate?: Date;

    @ApiProperty({
        example: 'Для участия требуется предварительная регистрация',
        description: 'Дополнительная информация об олимпиаде',
        required: false
    })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    additionalInfo?: string;

    @ApiProperty({
        example: [1, 2, 3],
        description: 'ID участников олимпиады',
        required: false,
        type: [Number],
        isArray: true
    })
    @Field(() => [Int], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    participantIds?: number[];
}