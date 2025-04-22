import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import {S3Module} from "../s3/s3.module";
import {S3Service} from "../s3/s3.service";

@Module({
  imports: [S3Module],
  controllers: [GalleryController],
  providers: [GalleryService, S3Service]
})
export class GalleryModule {}
