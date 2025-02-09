export function getMessagesContent(): string {
    return `
    <section class="messages">
        <h2 class="messages__title">Сообщения от пользователей</h2>
        <div id="preloader" class="preloader">Загрузка...</div>
        <div id="content" class="messages__content"></div>
        <div id="error" class="messages__error"></div>
    </section>`;
}