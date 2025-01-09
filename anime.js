document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const headerNav = document.querySelector(".header-nav");

    hamburgerMenu.addEventListener("click", () => {
        headerNav.classList.toggle("active");
    });
});