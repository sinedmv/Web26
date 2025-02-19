import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Olympiad} from "../../olympiads/entities/olympiad.entity";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Olympiad)
    olympiad: Olympiad;

    @Column()
    notificationDate: Date;
}