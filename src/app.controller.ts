import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getMainPage() {
    return { };
  }

  @Get('/index')
  @Render('index')
  getIndexPage() {
    return {};
  }

  @Get('/constructor')
  @Render('constructor')
  getConstructorPage() {
    return {};
  }

  @Get('/contacts')
  @Render('contacts')
  getContactsPage() {
    return {};
  }

  @Get('/gallery')
  @Render('gallery')
  getGalleryPage() {
    return {};
  }

  @Get('/messages')
  @Render('messages')
  getMessagePage() {
    return {};
  }

  @Get('/news')
  @Render('news')
  getNewsPage() {
    return {};
  }

  @Get('/olympiads')
  @Render('olympiads')
  getOlympiadsPage() {
    return {};
  }
}