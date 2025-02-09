import { compile } from 'handlebars';

export function getIndexContent(): string {
    const olympiads = [
        { content: "Олимпиада по информатике - регистрация до 15 октября" },
        { content: "Олимпиада по биологии - регистрация до 1 ноября" },
        { content: "Олимпиада по химии - регистрация до 20 ноября" },
    ];

    const news = [
        { title: "Новая олимпиада по математике", text: "Открыта регистрация на новую всероссийскую олимпиаду по математике. Подача заявок возможна до 30 сентября." },
        { title: "Результаты олимпиады по физике", text: "Объявлены результаты всероссийской олимпиады по физике. Поздравляем победителей!" },
    ];

    const schedule = [
        { subject: "Информатика", date: "15 окт", time: "10:00" },
        { subject: "Биология", date: "1 ноя", time: "11:30" },
        { subject: "Химия", date: "20 ноя", time: "14:00" },
    ];

    const template = `
    <section class="main__current-olympiads">
      <h2 class="main__title">Текущие олимпиады</h2>
      <ul class="main__list">
        {{#each olympiads}}
          {{> main__list-item this}}
        {{/each}}
      </ul>
    </section>
    <section class="main__news">
      <h2 class="main__title">Последние новости</h2>
      {{#each news}}
        {{> main_article this}}
      {{/each}}
    </section>
    <section class="main__schedule">
      <h2 class="main__title">Расписание</h2>
      <div class="table">
        {{#each schedule}}
          {{> table__row this}}
        {{/each}}
      </div>
    </section>
    `;

    const compiledTemplate = compile(template);
    return compiledTemplate({ olympiads, news, schedule });
}