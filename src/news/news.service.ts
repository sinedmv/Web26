import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { News } from './entities/news.entity';
import { Olympiad } from '../olympiads/entities/olympiad.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        @InjectRepository(Olympiad)
        private olympiadRepository: Repository<Olympiad>,
    ) {}

    async create(createNewsDto: CreateNewsDto): Promise<News> {
        const { title, content, olympiadIds = [] } = createNewsDto;

        const news = this.newsRepository.create({
            title,
            content,
        });

        if (olympiadIds.length > 0) {
            const olympiads = await this.olympiadRepository.findBy({
                id: In(olympiadIds)
            });
            news.relatedOlympiads = olympiads;
        }

        return this.newsRepository.save(news);
    }

    async findAll(): Promise<News[]> {
        return this.newsRepository.find({
            relations: ['relatedOlympiads'],
        });
    }

    async findOne(id: number): Promise<News> {
        const news = await this.newsRepository.findOne({
            where: { id },
            relations: ['relatedOlympiads'],
        });

        if (!news) {
            throw new NotFoundException('News not found');
        }
        return news;
    }

    async getAvailableOlympiads(): Promise<Olympiad[]> {
        return this.olympiadRepository.find({
            order: { name: 'ASC' }
        });
    }

    async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
        const news = await this.findOne(id);
        const { title, content, olympiadIds = [] } = updateNewsDto;

        if (title) news.title = title;
        if (content) news.content = content;

        const olympiads = olympiadIds.length > 0
            ? await this.olympiadRepository.findBy({ id: In(olympiadIds) })
            : [];
        news.relatedOlympiads = olympiads;

        return this.newsRepository.save(news);
    }

    async remove(id: number): Promise<void> {
        const result = await this.newsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('News not found');
        }
    }
}