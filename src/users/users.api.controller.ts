import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    Query,
    DefaultValuePipe, UseInterceptors, Header,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {CacheInterceptor} from "@nestjs/cache-manager";
import {ETagInterceptor} from "../interceptors/etag.interceptor";
import {UserResponseDto} from "./dto/user-response.dto";

@ApiTags('Users')
@Controller('api/users')
@UseInterceptors(CacheInterceptor)
@UseInterceptors(ETagInterceptor)
export class UsersApiController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Получить список пользователей с пагинацией' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Номер страницы' })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Количество пользователей на странице' })
    @ApiResponse({
        status: 200,
        description: 'Список пользователей и метаинформация о пагинации',
        schema: {
            example: {
                data: [
                    {
                        id: 1,
                        username: 'john_doe',
                        email: 'john@example.com',
                        isAdmin: false,
                        createdAt: '2024-06-01T12:00:00.000Z',
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
        const { items, total } = await this.usersService.findAllPaginated(page, limit);

        return {
            data: items.map(user => new UserResponseDto(user)),
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
                perPage: limit,
            },
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить пользователя по ID' })
    @ApiParam({ name: 'id', type: Number, description: 'ID пользователя', example: 1 })
    @ApiResponse({
        status: 200,
        description: 'Пользователь найден',
        type: UserResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Некорректный ID пользователя' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    @Header('Cache-Control', 'public, max-age=3600')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
        const user = await this.usersService.findOne(id);
        return new UserResponseDto(user);
    }

    @Post()
    @ApiOperation({ summary: 'Создать нового пользователя' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Пользователь успешно создан',
        type: User,
    })
    @ApiResponse({ status: 400, description: 'Некорректные данные для создания пользователя' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить данные пользователя' })
    @ApiParam({ name: 'id', type: Number, description: 'ID пользователя', example: 1 })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: 200,
        description: 'Пользователь успешно обновлён',
        type: User,
    })
    @ApiResponse({ status: 400, description: 'Некорректные данные для обновления пользователя' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiParam({ name: 'id', type: Number, description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 204, description: 'Пользователь успешно удалён' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.usersService.remove(id);
    }
}
