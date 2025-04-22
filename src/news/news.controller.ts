import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Req, Res } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Request, Response } from 'express';
import {ApiExcludeController} from "@nestjs/swagger";

@ApiExcludeController()
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @Render('news/index')
  async findAll(@Req() request: Request) {
    return {
      news: await this.newsService.findAll(),
      isAuthorized: request.query.auth === 'true',
      currentPage: 'news',
      meta: {
        title: 'Новости - Олимпиады в Якутии',
        description: 'Последние новости об олимпиадах',
        keywords: 'новости, олимпиады, события'
      }
    };
  }

  @Get('add')
  @Render('news/add')
  async getAddForm(@Req() request: Request) {
    return {
      olympiads: await this.newsService.getAvailableOlympiads(),
      isAuthorized: request.query.auth === 'true',
      meta: {
        title: 'Добавить новость',
        description: 'Форма добавления новой новости'
      }
    };
  }

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto, @Res() res: Response) {
    await this.newsService.create(createNewsDto);
    return res.redirect('/news');
  }

  @Get(':id')
  @Render('news/show')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    return {
      news: await this.newsService.findOne(+id),
      isAuthorized: request.query.auth === 'true',
      meta: {
        title: 'Просмотр новости',
        description: 'Детальная страница новости'
      }
    };
  }

  @Get(':id/edit')
  @Render('news/edit')
  async getEditForm(@Param('id') id: string, @Req() request: Request) {
    const [news, olympiads] = await Promise.all([
      this.newsService.findOne(+id),
      this.newsService.getAvailableOlympiads()
    ]);

    return {
      news,
      olympiads,
      isAuthorized: request.query.auth === 'true',
      meta: {
        title: 'Редактирование новости',
        description: 'Форма редактирования новости'
      }
    };
  }

  @Patch(':id')
  async update(
      @Param('id') id: string,
      @Body() updateNewsDto: UpdateNewsDto,
      @Res() res: Response
  ) {
    await this.newsService.update(+id, updateNewsDto);
    return res.redirect(`/news/${id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.newsService.remove(+id);
    return res.redirect('/news');
  }
}