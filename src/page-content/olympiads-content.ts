import { compile } from 'handlebars'

export function getOlympiadsContent(): string {
    const olympiads = [
        { content: "Олимпиада по информатике - регистрация до 15 октября" },
        { content: "Олимпиада по биологии - регистрация до 1 ноября" },
        { content: "Олимпиада по химии - регистрация до 20 ноября" },
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
    `;

    const compiledTemplate = compile(template);
    return compiledTemplate({ olympiads});
}