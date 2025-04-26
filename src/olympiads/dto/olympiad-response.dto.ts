import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Olympiad } from '../entities/olympiad.entity';
import { UserResponseDto } from '../../users/dto/user-response.dto';

@ObjectType()
export class OlympiadResponseDto {
    @ApiProperty({ example: 1, description: 'ID олимпиады' })
    @Field(() => Int)
    id: number;

    @ApiProperty({ example: 'Олимпиада по математике', description: 'Название олимпиады' })
    @Field()
    name: string;

    @ApiProperty({ example: 'МГУ', description: 'Организатор олимпиады' })
    @Field()
    organization: string;

    @ApiProperty({ example: 'Математика', description: 'Предмет олимпиады' })
    @Field()
    subject: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Дата начала регистрации' })
    @Field()
    registrationStartDate: Date;

    @ApiProperty({ example: '2024-01-15T00:00:00.000Z', description: 'Дата окончания регистрации' })
    @Field()
    registrationEndDate: Date;

    @ApiProperty({ example: '2024-02-01T00:00:00.000Z', description: 'Дата проведения олимпиады' })
    @Field()
    olympiadDate: Date;

    @ApiProperty({
        example: 'Для участия нужна предварительная регистрация',
        description: 'Дополнительная информация',
        required: false
    })
    @Field({ nullable: true })
    additionalInfo?: string;

    @ApiProperty({
        type: () => [UserResponseDto],
        description: 'Участники олимпиады',
        required: false
    })
    @Field(() => [UserResponseDto], { nullable: true })
    participants?: UserResponseDto[];

    constructor(olympiad: Olympiad) {
        this.id = olympiad.id;
        this.name = olympiad.name;
        this.organization = olympiad.organization;
        this.subject = olympiad.subject;
        this.registrationStartDate = olympiad.registrationStartDate;
        this.registrationEndDate = olympiad.registrationEndDate;
        this.olympiadDate = olympiad.olympiadDate;
        this.additionalInfo = olympiad.additionalInfo;
        this.participants = olympiad.participants?.map(p => new UserResponseDto(p));
    }
}