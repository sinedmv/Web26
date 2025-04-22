import {Controller, Get, Post, Render, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { Request } from 'express';
import { GalleryService } from './gallery.service';
import {S3Service} from "../s3/s3.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiExcludeController} from "@nestjs/swagger";

@ApiExcludeController()
@Controller('gallery')
export class GalleryController {
  constructor(
      private readonly galleryService: GalleryService,
      private readonly s3Service: S3Service,
  ) {}

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
        'https://unpkg.com/swiper/swiper-bundle.min.js',
      ],
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.galleryService.uploadImage(file);
  }

  @Get('files/:key')
  async getFile(@Req() request: Request) {
    const url = await this.s3Service.getFileUrl(request.params.key);
    return { url };
  }
}