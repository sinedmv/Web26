import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Olympiad} from "../../olympiads/entities/olympiad.entity";
import {User} from "../../users/entities/user.entity";
import {News} from "../../news/entities/news.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Message {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    author: User;

    @Field(type => Olympiad)
    @ManyToOne(() => Olympiad, { nullable: true })
    olympiad: Olympiad | null;

    @Field(type => News)
    @ManyToOne(() => News, { nullable: true })
    news: News | null;
}
