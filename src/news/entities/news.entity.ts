import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Olympiad} from "../../olympiads/entities/olympiad.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {User} from "../../users/entities/user.entity";

@ObjectType()
@Entity()
export class News {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column('text')
    content: string;

    @Field(type => [Olympiad])
    @ManyToMany(() => Olympiad)
    @JoinTable()
    relatedOlympiads: Olympiad[];
}