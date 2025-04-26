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
    DefaultValuePipe, Header, UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { OlympiadsService } from './olympiads.service';
import { CreateOlympiadDto } from './dto/create-olympiad.dto';
import { UpdateOlympiadDto } from './dto/update-olympiad.dto';
import { Olympiad } from './entities/olympiad.entity';
import {ETagInterceptor} from "../interceptors/etag.interceptor";
import {OlympiadResponseDto} from "./dto/olympiad-response.dto";

@ApiTags('Olympiads')
@Controller('api/olympiads')
@UseInterceptors(ETagInterceptor)
export class OlympiadsApiController {
    constructor(private readonly olympiadsService: OlympiadsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую олимпиаду' })
    @ApiBody({ type: CreateOlympiadDto })
    @ApiResponse({ status: 201, description: 'Олимпиада успешно создана', type: Olympiad })
    @Header('Cache-Control', 'public, max-age=3600')
    async create(@Body() createOlympiadDto: CreateOlympiadDto): Promise<Olympiad> {
        return this.olympiadsService.create(createOlympiadDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список олимпиад с пагинацией' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Номер страницы (по умолчанию 1)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Количество на странице (по умолчанию 10)' })
    @ApiResponse({
        status: 200,
        description: 'Список олимпиад с метаинформацией о пагинации',
        schema: {
            example: {
                data: [
                    {
                        id: 1,
                        name: 'Олимпиада по математике',
                        organization: 'Школа №1',
                        subject: 'Математика',
                        registrationStartDate: '2024-01-01T00:00:00.000Z',
                        registrationEndDate: '2024-01-15T00:00:00.000Z',
                        olympiadDate: '2024-02-01T00:00:00.000Z',
                        additionalInfo: 'Дополнительная информация',
                        participants: [],
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
        const { items, total } = await this.olympiadsService.findAllPaginated(page, limit);

        return {
            data: items.map(item => new OlympiadResponseDto(item)),
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
                perPage: limit,
            },
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить олимпиаду по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID олимпиады' })
    @ApiResponse({ status: 200, description: 'Данные олимпиады', type: Olympiad })
    @ApiResponse({ status: 404, description: 'Олимпиада не найдена' })
    @Header('Cache-Control', 'public, max-age=3600')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<OlympiadResponseDto> {
        const olympiad = await this.olympiadsService.findOne(id);
        return new OlympiadResponseDto(olympiad);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить данные олимпиады' })
    @ApiParam({ name: 'id', type: Number, description: 'ID олимпиады' })
    @ApiBody({ type: UpdateOlympiadDto })
    @ApiResponse({ status: 200, description: 'Олимпиада успешно обновлена', type: Olympiad })
    @ApiResponse({ status: 404, description: 'Олимпиада не найдена' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOlympiadDto: UpdateOlympiadDto,
    ): Promise<Olympiad> {
        return this.olympiadsService.update(id, updateOlympiadDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить олимпиаду' })
    @ApiParam({ name: 'id', type: Number, description: 'ID олимпиады' })
    @ApiResponse({ status: 200, description: 'Олимпиада успешно удалена', schema: { example: { message: 'Olympiad deleted successfully' } } })
    @ApiResponse({ status: 404, description: 'Олимпиада не найдена' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        await this.olympiadsService.remove(id);
        return { message: 'Olympiad deleted successfully' };
    }
}
