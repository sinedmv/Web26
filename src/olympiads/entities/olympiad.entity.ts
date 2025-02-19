import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Olympiad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    organization: string;

    @Column()
    subject: string;

    @Column()
    registrationStartDate: Date;

    @Column()
    registrationEndDate: Date;

    @Column()
    olympiadDate: Date;

    @Column('text', { nullable: true })
    additionalInfo: string;

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];
}