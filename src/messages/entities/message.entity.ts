import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Olympiad} from "../../olympiads/entities/olympiad.entity";
import {User} from "../../users/entities/user.entity";
import {News} from "../../news/entities/news.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    author: User;

    @ManyToOne(() => Olympiad, { nullable: true })
    olympiad: Olympiad | null;

    @ManyToOne(() => News, { nullable: true })
    news: News | null;
}
