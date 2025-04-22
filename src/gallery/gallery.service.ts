import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class GalleryService {
    constructor(private readonly s3Service: S3Service) {}

    async getSlides() {
        const files = await this.s3Service.listFiles();

        return files.map(file => ({
            src: `https://storage.yandexcloud.net/sinedmv/${file.Key}`,
            alt: file.Key,
        }));
    }

    async uploadImage(file: Express.Multer.File) {
        const key = `gallery/${Date.now()}-${file.originalname}`;
        await this.s3Service.uploadFile(file, key);
        return key;
    }
}
