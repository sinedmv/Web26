import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    DefaultValuePipe,
    HttpCode,
    HttpStatus, UseInterceptors, Header,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import {ETagInterceptor} from "../interceptors/etag.interceptor";

@ApiTags('Messages')
@Controller('api/messages')
@UseInterceptors(ETagInterceptor)
export class MessagesApiController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новое сообщение' })
    @ApiBody({ type: CreateMessageDto, description: 'Данные для создания сообщения' })
    @ApiResponse({ status: 201, description: 'Сообщение успешно создано', type: Message })
    @ApiResponse({ status: 400, description: 'Некорректные данные запроса' })
    @Header('Cache-Control', 'public, max-age=3600')
    async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
        return this.messagesService.create(createMessageDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список сообщений с пагинацией' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Номер страницы' })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Количество на страницу' })
    @ApiResponse({
        status: 200,
        description: 'Список сообщений с метаинформацией',
        schema: {
            example: {
                data: [
                    {
                        id: 1,
                        content: 'Пример сообщения',
                        createdAt: '2024-06-01T12:00:00.000Z',
                        author: { id: 1, name: 'User' },
                        olympiad: null,
                        news: null,
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
    @Header('Cache-Control', 'public, max-age=3600')
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        const { items, total } = await this.messagesService.findAllPaginated(page, limit);

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
    @ApiOperation({ summary: 'Получить сообщение по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сообщения' })
    @ApiResponse({ status: 200, description: 'Сообщение найдено', type: Message })
    @ApiResponse({ status: 404, description: 'Сообщение не найдено' })
    @Header('Cache-Control', 'public, max-age=3600')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Message> {
        return this.messagesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить сообщение по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сообщения' })
    @ApiBody({ type: UpdateMessageDto, description: 'Данные для обновления сообщения' })
    @ApiResponse({ status: 200, description: 'Сообщение обновлено', type: Message })
    @ApiResponse({ status: 400, description: 'Некорректные данные запроса' })
    @ApiResponse({ status: 404, description: 'Сообщение не найдено' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMessageDto: UpdateMessageDto
    ): Promise<Message> {
        return this.messagesService.update(id, updateMessageDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить сообщение по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID сообщения' })
    @ApiResponse({ status: 204, description: 'Сообщение удалено' })
    @ApiResponse({ status: 404, description: 'Сообщение не найдено' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.messagesService.remove(id);
    }
}
