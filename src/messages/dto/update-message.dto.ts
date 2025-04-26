import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateMessageDto {
    @ApiProperty({
        example: 'Обновленный текст сообщения',
        description: 'Новый текст сообщения',
        required: false
    })
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    readonly content?: string;

    @ApiProperty({
        example: 2,
        description: 'Новая связанная олимпиада',
        required: false
    })
    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsPositive()
    @IsOptional()
    readonly olympiadId?: number | null;

    @ApiProperty({
        example: 3,
        description: 'Новая связанная новость',
        required: false
    })
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    readonly newsId?: number | null;
}