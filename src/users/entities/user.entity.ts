import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class User {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column({ unique: true })
    superTokensId: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Field()
    @Column({ default: false })
    isAdmin: boolean;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}