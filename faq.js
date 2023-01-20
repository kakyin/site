let slideBtn = document.querySelector("#slide-btn");
let slideMenu = document.querySelector("#slide-menu");

slideBtn.addEventListener('click', () => {
    slideMenu.classList.toggle("menu-active");
});