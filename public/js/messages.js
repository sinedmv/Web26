document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");
    const error = document.getElementById("error");

    const renderMessages = (messages) => {
        messages.forEach((message) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");

            const title = document.createElement("h3");
            title.classList.add("message__title");
            title.textContent = message.title;

            const body = document.createElement("p");
            body.classList.add("message__text");
            body.textContent = message.body;

            messageDiv.appendChild(title);
            messageDiv.appendChild(body);
            content.appendChild(messageDiv);
        });
    };

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка сети");
            }
            return response.json();
        })
        .then((data) => {
            const numberOfMessages = Math.floor(Math.random() * data.length) + 1;
            const shuffledMessages = data.sort(() => 0.5 - Math.random());
            const selectedMessages = shuffledMessages.slice(0, numberOfMessages);

            renderMessages(selectedMessages);
            preloader.style.display = "none";
        })
        .catch((err) => {
            preloader.style.display = "none";
            error.textContent = `Ошибка: ${err.message}`;
        });
});