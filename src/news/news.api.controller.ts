import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';

@ApiTags('News')
@Controller('api/news')
export class NewsApiController {
    constructor(private readonly newsService: NewsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новость' })
    @ApiBody({ type: CreateNewsDto, description: 'Данные для создания новости' })
    @ApiResponse({ status: 201, description: 'Новость успешно создана', type: News })
    @ApiResponse({ status: 400, description: 'Некорректные данные запроса' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
        return this.newsService.create(createNewsDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список новостей с пагинацией' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Номер страницы' })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Количество на страницу' })
    @ApiResponse({
        status: 200,
        description: 'Список новостей с метаинформацией',
        schema: {
            example: {
                data: [
                    {
                        id: 1,
                        title: 'Пример новости',
                        content: 'Текст новости',
                        createdAt: '2024-06-01T12:00:00.000Z',
                        updatedAt: '2024-06-01T12:00:00.000Z',
                        relatedOlympiads: [
                            { id: 1, name: 'Олимпиада по математике' }
                        ],
                    },
                ],
                meta: {
                    total: 1,
                    page: 1,
                    lastPage: 1,
                    perPage: 10,
                },
            },
        },
    })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        const { items, total } = await this.newsService.findAllPaginated(page, limit);

        return {
            data: items,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
                perPage: limit,
            },
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить новость по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID новости' })
    @ApiResponse({ status: 200, description: 'Новость найдена', type: News })
    @ApiResponse({ status: 404, description: 'Новость не найдена' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<News> {
        return this.newsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить новость по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID новости' })
    @ApiBody({ type: UpdateNewsDto, description: 'Данные для обновления новости' })
    @ApiResponse({ status: 200, description: 'Новость обновлена', type: News })
    @ApiResponse({ status: 400, description: 'Некорректные данные запроса' })
    @ApiResponse({ status: 404, description: 'Новость не найдена' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateNewsDto: UpdateNewsDto,
    ): Promise<News> {
        return this.newsService.update(id, updateNewsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить новость по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID новости' })
    @ApiResponse({ status: 204, description: 'Новость удалена' })
    @ApiResponse({ status: 404, description: 'Новость не найдена' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.newsService.remove(id);
    }
}
