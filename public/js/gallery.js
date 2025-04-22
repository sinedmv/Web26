document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".swiper", {
        // Настройки навигации
        navigation: {
            nextEl: ".swiper-button-next", // Кнопка для перехода к следующему слайду
            prevEl: ".swiper-button-prev", // Кнопка для перехода к предыдущему слайду
        },
        // Пагинация
        pagination: {
            el: ".swiper-pagination", // Контейнер для пагинации
            clickable: true, // Делает пагинацию кликабельной
        },
        // Адаптивное количество слайдов
        slidesPerView: 1, // Количество слайдов, отображаемых одновременно
        breakpoints: {
            768: {
                slidesPerView: 2, // Два слайда на экранах >= 768px
            },
            1024: {
                slidesPerView: 3, // Три слайда на экранах >= 1024px
            },
        },
        loop: true, // Включение бесконечной прокрутки
        autoplay: {
            delay: 3000, // Задержка между автопрокруткой (в миллисекундах)
        },
    });

    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(uploadForm);

            try {
                const response = await fetch('/gallery/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert('Изображение успешно загружено!');
                    window.location.reload();
                } else {
                    alert('Ошибка при загрузке изображения');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ошибка при загрузке изображения');
            }
        });
    }
});
