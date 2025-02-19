import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Olympiad} from "../../olympiads/entities/olympiad.entity";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @ManyToMany(() => Olympiad)
    @JoinTable()
    relatedOlympiads: Olympiad[];
}