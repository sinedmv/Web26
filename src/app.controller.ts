import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['/', '/index'])
  @Render('index')
  getIndex(@Req() request: Request) {
    return {
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