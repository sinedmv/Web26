(function () {
    window.addEventListener("load", function () {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const footer = document.getElementById("footer");

        if (footer) {
            const loadInfo = document.createElement("p");
            loadInfo.textContent = `Время загрузки страницы: ${loadTime} мс`;
            footer.appendChild(loadInfo);
        } else {
            console.warn("Footer element not found.");
        }

        let path = document.location.pathname.split('/').pop();
        if (!path) {
            path = "index.html";
        }
        const menuLinks = document.querySelectorAll(".header__nav-list a");

        menuLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname.split('/').pop();
            if (linkPath === path) {
                link.classList.add("header__nav-list__link--active");
            }
        });
    });
})();