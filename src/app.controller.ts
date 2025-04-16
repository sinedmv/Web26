import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import {NewsService} from "./news/news.service";
import {OlympiadsService} from "./olympiads/olympiads.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly newsService: NewsService,
      private readonly olympiadsService: OlympiadsService,
  ) {}

  @Get(['/', '/index'])
  @Render('index')
  async getIndex(@Req() request: Request) {
    const newsPage = await this.newsService.findAllPaginated(1, 5);
    const olympiadsPage = await this.olympiadsService.findAllPaginated(1, 5);

    return {
      news: newsPage.items,
      olympiads: olympiadsPage.items,
      description: 'Олимпиады для школьников Якутии',
      keywords: 'олимпиады, школьники, соревнования, новости, образование, якутия',
      title: 'Олимпиады в Якутии',
      pageTitle: 'Олимпиады в Якутии',
      isAuthorized: request.query.auth === 'true',
      currentPage: 'index'
    };
  }

  @Get('/contacts')
  @Render('contacts')
  getContacts(@Req() request: Request) {
    return {
      description: 'Контакты для олимпиады Якутии',
      keywords: 'контакты, олимпиады, якутия',
      title: 'Контакты - Олимпиады в Якутии',
      pageTitle: 'Контакты организаторов',
      isAuthorized: request.query.auth === 'true',
      currentPage: 'contacts'
    };
  }
}