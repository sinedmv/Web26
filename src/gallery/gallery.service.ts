import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class GalleryService {
    async getSlides() {
        return [
            { src: "/images/Yakutia.png", alt: "Якутия" },
            { src: "/images/logo.png", alt: "Логотип" },
            { src: "/images/Yakutia.png", alt: "Якутия" },
            { src: "/images/logo.png", alt: "Логотип" },
        ];
    }
}
