document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("schedule-form");
    const tableBody = document.getElementById("table-body");
    const STORAGE_KEY = "olympiadsData";

    const loadData = () => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        data.forEach((item) => addRow(item));
    };

    const saveData = () => {
        const rows = Array.from(tableBody.querySelectorAll("tr")).map((row) => {
            return {
                olympiadName: row.cells[0].textContent,
                subject: row.cells[1].textContent,
                date: row.cells[2].textContent,
                status: row.cells[3].textContent === "Активная",
            };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    };

    const addRow = ({ olympiadName, subject, date, status = true }) => {
        const row = document.createElement("tr");
        row.classList.add("generated-table__row");

        const nameCell = document.createElement("td");
        nameCell.textContent = olympiadName;
        nameCell.classList.add("generated-table__cell");

        const subjectCell = document.createElement("td");
        subjectCell.textContent = subject;
        subjectCell.classList.add("generated-table__cell");

        const dateCell = document.createElement("td");
        dateCell.textContent = date;
        dateCell.classList.add("generated-table__cell");

        const statusCell = document.createElement("td");
        statusCell.textContent = status ? "Активная" : "Неактивная";
        statusCell.classList.add("generated-table__cell", "status");
        if (status) {
            statusCell.classList.add("status--active");
        }

        const actionsCell = document.createElement("td");
        actionsCell.classList.add("generated-table__cell");

        const toggleButton = document.createElement("button");
        toggleButton.textContent = status ? "Сделать неактивной" : "Сделать активной";
        toggleButton.classList.add("btn", "toggle-status");
        toggleButton.addEventListener("click", () => {
            const isActive = statusCell.textContent === "Активная";
            statusCell.textContent = isActive ? "Неактивная" : "Активная";
            statusCell.classList.toggle("status--active", !isActive);
            toggleButton.textContent = isActive ? "Сделать активной" : "Сделать неактивной";
            saveData();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.classList.add("btn", "delete");
        deleteButton.addEventListener("click", () => {
            row.remove();
            saveData();
        });

        actionsCell.appendChild(toggleButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(subjectCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const olympiadName = document.getElementById("olympiad-name").value;
        const subject = document.getElementById("subject").value;
        const date = document.getElementById("date").value;

        const newData = { olympiadName, subject, date, status: true };
        addRow(newData);

        saveData();

        form.reset();
    });

    loadData();
});