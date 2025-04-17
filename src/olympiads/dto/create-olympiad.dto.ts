import { IsString, IsOptional, IsDate, IsArray, ArrayNotEmpty, IsInt, MinLength } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

@InputType()
export class CreateOlympiadDto {
    @ApiProperty({ example: 'Олимпудка', description: 'Имя олимпиады' })
    @Field()
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({ example: 'СКБ Контур', description: 'Имя организации' })
    @Field()
    @IsString()
    organization: string;

    @ApiProperty({ example: 'Математика', description: 'Предмет олимпиады' })
    @Field()
    @IsString()
    subject: string;

    @ApiProperty({ example: '2024-09-01T00:00:00.000Z', description: 'Дата начала регистрации' })
    @Field(() => Date)
    @Type(() => Date)
    @IsDate()
    registrationStartDate: Date;

    @ApiProperty({ example: '2024-09-10T00:00:00.000Z', description: 'Дата окончания регистрации' })
    @Field(() => Date)
    @Type(() => Date)
    @IsDate()
    registrationEndDate: Date;

    @ApiProperty({ example: '2024-09-15T10:00:00.000Z', description: 'Дата проведения олимпиады' })
    @Field(() => Date)
    @Type(() => Date)
    @IsDate()
    olympiadDate: Date;

    @ApiProperty({ example: 'Дополнительная информация', description: 'Дополнительная информация', required: false })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    additionalInfo?: string;

    @ApiProperty({ example: [1, 2, 3], description: 'ID участников', required: false, type: [Number] })
    @Field(() => [Number], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    participantIds?: number[];
}
