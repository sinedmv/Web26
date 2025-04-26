import {Injectable, NotFoundException} from '@nestjs/common';
import {Olympiad} from "../olympiads/entities/olympiad.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "../news/entities/news.entity";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {Message} from "./entities/message.entity";
import {CreateMessageDto} from "./dto/create-message.dto";
import {UpdateMessageDto} from "./dto/update-message.dto";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(Olympiad)
        private olympiadRepository: Repository<Olympiad>,
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const { content, authorId, olympiadId, newsId } = createMessageDto;

        const author = await this.userRepository.findOne({
            where: { id: authorId },
        });

        if (!author) {
            throw new NotFoundException('Author not found');
        }

        const [olympiad, news] = await Promise.all([
            olympiadId ? this.olympiadRepository.findOne({ where: { id: olympiadId } }) : Promise.resolve(null),
            newsId ? this.newsRepository.findOne({ where: { id: newsId } }) : Promise.resolve(null)
        ]);

        const message = this.messageRepository.create({
            content,
            author,
            olympiad,
            news
        });

        return this.messageRepository.save(message);
    }

    async findAll(): Promise<Message[]> {
        return this.messageRepository.find({
            relations: ['author', 'olympiad', 'news'],
        });
    }


    async findAllPaginated(page: number, limit: number): Promise<{ items: Message[]; total: number }> {
        const [items, total] = await this.messageRepository.findAndCount({
            relations: ['author', 'olympiad', 'news'],
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return { items, total };
    }

    async findOne(id: number): Promise<Message> {
        const message = await this.messageRepository.findOne({
            where: { id },
            relations: ['author', 'olympiad', 'news'],
        });

        if (!message) {
            throw new NotFoundException('Message not found');
        }
        return message;
    }

    async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
        const message = await this.findOne(id);

        const { content, olympiadId, newsId } = updateMessageDto;

        if (content) {
            message.content = content;
        }

        if (olympiadId !== undefined) {
            message.olympiad = olympiadId
                ? await this.olympiadRepository.findOne({ where: { id: olympiadId } })
                : null;
        }

        if (newsId !== undefined) {
            message.news = newsId
                ? await this.newsRepository.findOne({ where: { id: newsId } })
                : null;
        }

        return this.messageRepository.save(message);
    }

    async remove(id: number): Promise<void> {
        const result = await this.messageRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Message not found');
        }
    }
}
