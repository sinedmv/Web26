document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");
    const error = document.getElementById("error");

    const renderMessages = (messages) => {
        messages.forEach((message) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");

            const author = document.createElement("h3");
            author.classList.add("message__author");
            author.textContent = message.author.username;

            const body = document.createElement("p");
            body.classList.add("message__text");
            body.textContent = message.content;

            const date = document.createElement("small");
            date.classList.add("message__date");
            date.textContent = new Date(message.createdAt).toLocaleString();

            messageDiv.appendChild(author);
            messageDiv.appendChild(body);
            messageDiv.appendChild(date);
            content.appendChild(messageDiv);
        });
    };

    fetch("/messages")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка сети");
            }
            return response.json();
        })
        .then((messages) => {
            renderMessages(messages);
            preloader.style.display = "none";
        })
        .catch((err) => {
            preloader.style.display = "none";
            error.textContent = `Ошибка: ${err.message}`;
        });
});