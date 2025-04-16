import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @Render('gallery')
  async getGallery(@Req() request: Request) {
    const slides = await this.galleryService.getSlides();

    return {
      description: 'Галерея изображений - Олимпиады в Якутии',
      keywords: 'галерея, слайдер, swiperjs, олимпиады',
      title: 'Галерея - Олимпиады в Якутии',
      pageTitle: 'Галерея олимпиад',
      slides,
      isAuthorized: request.query.auth === 'true',
      currentPage: 'gallery',
      additionalScripts: [
        '/js/gallery.js',
        'https://unpkg.com/swiper/swiper-bundle.min.js'
      ]
    };
  }
}