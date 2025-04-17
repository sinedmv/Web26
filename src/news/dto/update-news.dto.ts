import {Field, InputType, Int} from "@nestjs/graphql";
import {IsArray, IsInt, IsOptional, IsString} from "class-validator";

@InputType()
export class UpdateNewsDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    readonly title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    readonly content?: string;

    @Field(() => [Int], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly olympiadIds?: number[];
}
