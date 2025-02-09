import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

import { getIndexContent } from './page-content/index-content';
import { getConstructorContent } from './page-content/constructor-content';
import { getContactsContent } from './page-content/contacts-content';
import { getGalleryContent } from './page-content/gallery-content';
import { getMessagesContent } from './page-content/messages-content';
import { getNewsContent } from './page-content/news-content';
import { getOlympiadsContent } from './page-content/olympiads-content';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getMainPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const mainContent = getIndexContent();
    return { body: mainContent, isAuthorized };
  }

  @Get('/logout')
  @Render('index')
  getLogoutPage(@Req() request: Request) {
    const isAuthorized = false;
    const mainContent = getIndexContent();
    return { body: mainContent, isAuthorized };
  }

  @Get('/index')
  @Render('index')
  getIndexPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const mainContent = getIndexContent();
    return { body: mainContent, isAuthorized };
  }

  @Get('/constructor')
  @Render('constructor')
  getConstructorPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const constructorContent = getConstructorContent();
    const additionalScripts = ['/js/constructor.js'];
    return { body: constructorContent, additionalScripts, isAuthorized };
  }

  @Get('/contacts')
  @Render('contacts')
  getContactsPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const contactsContent = getContactsContent();
    return { body: contactsContent, isAuthorized };
  }

  @Get('/gallery')
  @Render('gallery')
  getGalleryPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const additionalScripts = ['/js/gallery.js', 'https://unpkg.com/swiper/swiper-bundle.min.js'];
    const galleryContent = getGalleryContent();
    return { body: galleryContent, additionalScripts, isAuthorized };
  }

  @Get('/messages')
  @Render('messages')
  getMessagesPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const additionalScripts = ['/js/messages.js'];
    const messagesContent = getMessagesContent();
    return { body: messagesContent, additionalScripts, isAuthorized };
  }

  @Get('/news')
  @Render('news')
  getNewsPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const newsContent = getNewsContent();
    return { body: newsContent, isAuthorized };
  }

  @Get('/olympiads')
  @Render('olympiads')
  getOlympiadsPage(@Req() request: Request) {
    const isAuthorized = this.checkAuthorization(request);
    const olympiadsContent = getOlympiadsContent();
    return { body: olympiadsContent, isAuthorized };
  }

  private checkAuthorization(request: Request): boolean {
    return request.query.auth === 'true';
  }
}