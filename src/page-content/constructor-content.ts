export function getConstructorContent(): string {
    return `
    <section class="constructor">
        <h2 class="constructor__title">Создание расписания олимпиад</h2>
        <form id="schedule-form" class="constructor__form">
            <label class="constructor__label">
                Название олимпиады:
                <input type="text" id="olympiad-name" name="olympiadName" class="constructor__input" required>
            </label>
            <label class="constructor__label">
                Предмет:
                <input type="text" id="subject" name="subject" class="constructor__input" required>
            </label>
            <label class="constructor__label">
                Дата проведения:
                <input type="date" id="date" name="date" class="constructor__input" required>
            </label>
            <button type="submit" class="btn constructor__btn">Добавить олимпиаду</button>
        </form>

        <div id="table-container" class="table-container">
            <table class="generated-table">
                <thead class="generated-table__head">
                <tr class="generated-table__row">
                    <th class="generated-table__header">Название олимпиады</th>
                    <th class="generated-table__header">Предмет</th>
                    <th class="generated-table__header">Дата</th>
                    <th class="generated-table__header">Статус</th>
                    <th class="generated-table__header">Действия</th>
                </tr>
                </thead>
                <tbody id="table-body" class="generated-table__body"></tbody>
            </table>
        </div>
    </section>`;
}