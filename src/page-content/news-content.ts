import { compile } from 'handlebars'

export function getNewsContent(): string {
    const articles = [
        { title: "Новая олимпиада по математике", text: "Открыта регистрация на новую всероссийскую олимпиаду по математике. Подача заявок возможна до 30 сентября." },
        { title: "Результаты олимпиады по физике", text: "Объявлены результаты всероссийской олимпиады по физике. Поздравляем победителей!" },
    ];

    const template = `
    <section class="news">
        <h2 class="news__title">Последние новости</h2>
        {{#each articles}}
            {{> news__article this}}
        {{/each}}
    </section>`;

    const compiledTemplate = compile(template);
    return compiledTemplate({ articles });
}