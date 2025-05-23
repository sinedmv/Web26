document.addEventListener('DOMContentLoaded', () => {
    const eventSource = new EventSource('/users/sse');
    const usersList = document.getElementById('users__list');

    if (!usersList) {
        console.error('Element with ID "users-list" not found');
        return;
    }

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received event:', data);

        switch (data.type) {
            case 'CREATE':
                addUserToList(data.user);
                showToast(`Пользователь ${data.user.username} создан`);
                break;
            case 'UPDATE':
                updateUserInList(data.user);
                showToast(`Пользователь ${data.user.username} обновлён`);
                break;
            case 'DELETE':
                removeUserFromList(data.user);
                showToast(`Пользователь ${data.user.username} удалён`);
                break;
            default:
                console.warn('Unknown event type:', data.type);
        }
    };

    eventSource.onerror = (event) => {
        console.error('SSE connection error', event);
    };

    function addUserToList(user) {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h3 class="user-card__name">${user.username}</h3>
            <p class="user-card__email">${user.email}</p>
            <p class="user-card__meta">
                ID: ${user.id} | 
                ${user.isAdmin ? 'Администратор' : 'Пользователь'} | 
                Дата регистрации: ${new Date(user.createdAt).toLocaleString()}
            </p>
        `;
        usersList.appendChild(userCard);
    }

    function updateUserInList(user) {
        const userCards = document.querySelectorAll('.user-card');
        userCards.forEach(userCard => {
            const usernameElement = userCard.querySelector('.user-card__name');
            if (usernameElement && usernameElement.textContent === user.username) {
                userCard.querySelector('.user-card__email').textContent = user.email;
                const meta = userCard.querySelector('.user-card__meta');
                meta.textContent = `
                    ID: ${user.id} | 
                    ${user.isAdmin ? 'Администратор' : 'Пользователь'} | 
                    Дата регистрации: ${new Date(user.createdAt).toLocaleString()}
                `;
            }
        });
    }

    function removeUserFromList(user) {
        const userCards = document.querySelectorAll('.user-card');
        userCards.forEach(userCard => {
            const usernameElement = userCard.querySelector('.user-card__name');
            if (usernameElement && usernameElement.textContent === user.username) {
                userCard.remove();
            }
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = 10000;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
});
