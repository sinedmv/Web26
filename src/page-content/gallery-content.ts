import { compile } from 'handlebars';

export function getGalleryContent(): string {
    const slides = [
        { src: "/images/Yakutia.png", alt: "Якутия" },
        { src: "/images/logo.png", alt: "Логотип" },
        { src: "/images/Yakutia.png", alt: "Якутия" },
        { src: "/images/logo.png", alt: "Логотип" },
        { src: "/images/Yakutia.png", alt: "Якутия" },
        { src: "/images/logo.png", alt: "Логотип" },
        { src: "/images/Yakutia.png", alt: "Якутия" },
        { src: "/images/logo.png", alt: "Логотип" },
        { src: "/images/Yakutia.png", alt: "Якутия" },
        { src: "/images/logo.png", alt: "Логотип" },
    ];

    const template = `
    <section class="gallery">
        <h2 class="gallery__title">Галерея изображений</h2>
        <div class="swiper">
            <div class="swiper-wrapper">
                {{#each slides}}
                    {{> swiper-slide this}}
                {{/each}}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
    </section>`;

    const compiledTemplate = compile(template);
    return compiledTemplate({ slides });
}