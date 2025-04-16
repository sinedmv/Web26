import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Subject} from "rxjs";

@Injectable()
export class UsersService {
    private userEvents = new Subject<any>();
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        if (isNaN(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(user);
        this.userEvents.next({ type: 'CREATE', user: savedUser });
        return savedUser;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        this.userRepository.merge(user, updateUserDto);
        const updatedUser = await this.userRepository.save(user);
        this.userEvents.next({ type: 'UPDATE', user: updatedUser });
        return updatedUser;
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.delete(id);
        this.userEvents.next({ type: 'DELETE', user });
    }

    getUserEvents() {
        return this.userEvents.asObservable();
    }
}