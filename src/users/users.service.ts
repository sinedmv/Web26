import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Subject} from "rxjs";
import {News} from "../news/entities/news.entity";

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

    async findAllPaginated(page: number, limit: number): Promise<{ items: User[]; total: number }> {
        const [items, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return { items, total };
    }

    async findOne(id: number): Promise<User> {
        if (isNaN(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
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