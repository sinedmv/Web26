import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { Olympiad } from './entities/olympiad.entity';
import { User } from '../users/entities/user.entity';
import { CreateOlympiadDto } from './dto/create-olympiad.dto';
import { UpdateOlympiadDto } from './dto/update-olympiad.dto';
import {Message} from "../messages/entities/message.entity";

@Injectable()
export class OlympiadsService {
    constructor(
        @InjectRepository(Olympiad)
        private olympiadRepository: Repository<Olympiad>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createOlympiadDto: CreateOlympiadDto): Promise<Olympiad> {
        const { name, organization, subject, registrationStartDate, registrationEndDate, olympiadDate, additionalInfo, participantIds } = createOlympiadDto;

        const participants = await this.userRepository.find({
            where: { id: In(participantIds || []) },
        });

        const olympiad = this.olympiadRepository.create({
            name,
            organization,
            subject,
            registrationStartDate,
            registrationEndDate,
            olympiadDate,
            additionalInfo,
            participants,
        });

        return this.olympiadRepository.save(olympiad);
    }

    async findAll(): Promise<Olympiad[]> {
        return this.olympiadRepository.find({ relations: ['participants'] });
    }

    async findAllPaginated(page: number, limit: number): Promise<{ items: Olympiad[]; total: number }> {
        const [items, total] = await this.olympiadRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { olympiadDate: 'DESC' },
        });
        return { items, total };
    }

    async findOne(id: number): Promise<Olympiad> {
        const olympiad = await this.olympiadRepository.findOne({
            where: { id },
            relations: ['participants'],
        });

        if (!olympiad) {
            throw new Error('Olympiad not found');
        }
        return olympiad;
    }

    async update(id: number, updateOlympiadDto: UpdateOlympiadDto): Promise<Olympiad> {
        const olympiad = await this.findOne(id);

        const { name, organization, subject, registrationStartDate, registrationEndDate, olympiadDate, additionalInfo, participantIds } = updateOlympiadDto;

        if (name) olympiad.name = name;
        if (organization) olympiad.organization = organization;
        if (subject) olympiad.subject = subject;
        if (registrationStartDate) olympiad.registrationStartDate = registrationStartDate;
        if (registrationEndDate) olympiad.registrationEndDate = registrationEndDate;
        if (olympiadDate) olympiad.olympiadDate = olympiadDate;
        if (additionalInfo) olympiad.additionalInfo = additionalInfo;

        if (participantIds) {
            olympiad.participants = await this.userRepository.find({
                where: { id: In(participantIds || []) },
            });
        }

        return this.olympiadRepository.save(olympiad);
    }

    async remove(id: number): Promise<void> {
        const result = await this.olympiadRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Olympiad not found');
        }
    }
}
