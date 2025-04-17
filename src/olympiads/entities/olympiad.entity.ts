import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Olympiad {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    organization: string;

    @Field()
    @Column()
    subject: string;

    @Field()
    @Column()
    registrationStartDate: Date;

    @Field()
    @Column()
    registrationEndDate: Date;

    @Field()
    @Column()
    olympiadDate: Date;

    @Field()
    @Column('text', { nullable: true })
    additionalInfo: string;

    @Field(type => [User])
    @ManyToMany(() => User)
    @JoinTable()
    participants?: User[];
}