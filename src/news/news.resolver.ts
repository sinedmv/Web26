import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { News } from "./entities/news.entity";
import { NewsService } from "./news.service";
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Resolver(() => News)
export class NewsResolver {
    constructor(private readonly newsService: NewsService) {}

    @Query(() => [News], { name: 'news' })
    async findAll(): Promise<News[]> {
        return this.newsService.findAll();
    }

    @Query(() => News, { name: 'news' })
    async findOne(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<News> {
        return this.newsService.findOne(id);
    }

    @Mutation(() => News)
    async createNews(
        @Args('createNewsDto') createNewsDto: CreateNewsDto,
    ): Promise<News> {
        return this.newsService.create(createNewsDto);
    }

    @Mutation(() => News)
    async updateNews(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateNewsDto') updateNewsDto: UpdateNewsDto,
    ): Promise<News> {
        return this.newsService.update(id, updateNewsDto);
    }

    @Mutation(() => Boolean)
    async removeNews(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<boolean> {
        await this.newsService.remove(id);
        return true;
    }
}
