const pokemonData = [
    {
        image: "image/烏波.png",
        name: "No.0194 烏波 ウパー",
        types: ["image/阿水屬性.png", "image/阿地鼠姓.png"]
    },
    {
        image: "image/烏波.png",
        name: "No.0194 烏波 ウパー",
        types: ["image/阿水屬性.png", "image/阿地鼠姓.png"]
    },
    {
        image: "image/烏波.png",
        name: "No.0194 烏波 ウパー",
        types: ["image/阿水屬性.png", "image/阿地鼠姓.png"]
    }
];

let currentIndex = 0;

// 更新寶可夢內容
function updatePokemonContent(index) {
    const pokemon = pokemonData[index];
    const pokemonImage = document.querySelector(".pokemon-image-large");
    const pokemonName = document.querySelector(".pokemon-name");
    const pokemonTypesContainer = document.querySelector(".pokemon-types");

    pokemonImage.src = pokemon.image;
    pokemonName.textContent = pokemon.name;

    // 更新屬性圖標
    pokemonTypesContainer.innerHTML = "";
    pokemon.types.forEach(type => {
        const typeImg = document.createElement("img");
        typeImg.src = type;
        typeImg.alt = "Type Icon";
        pokemonTypesContainer.appendChild(typeImg);
    });

    // 更新點點指示器
    updateIndicators(index);
}

// 滑動動畫
function slidePokemon(direction) {
    const pokemonContent = document.querySelector(".pokemon-content");

    // 設置滑動方向，先滑出
    const slideOut = direction === "left" ? "-100%" : "100%";
    const slideIn = direction === "left" ? "100%" : "-100%";

    pokemonContent.style.transition = "transform 0.5s ease-in-out";
    pokemonContent.style.transform = `translateX(${slideOut})`;

    setTimeout(() => {
        pokemonContent.style.transition = "none";
        pokemonContent.style.transform = `translateX(${slideIn})`;

        // 更新寶可夢索引
        currentIndex = (currentIndex + (direction === "left" ? -1 : 1) + pokemonData.length) % pokemonData.length;
        updatePokemonContent(currentIndex);

        // 再滑入新內容
        setTimeout(() => {
            pokemonContent.style.transition = "transform 0.5s ease-in-out";
            pokemonContent.style.transform = "translateX(0)";
        }, 50); // 等待內容更新完成
    }, 500); // 與 CSS 動畫時間一致
}

// 點點指示器更新
function updateIndicators(activeIndex) {
    const indicatorContainer = document.querySelector(".pokemon-indicator");
    indicatorContainer.innerHTML = "";

    pokemonData.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("indicator-dot");
        if (index === activeIndex) {
            dot.classList.add("active");
        }
        indicatorContainer.appendChild(dot);
    });
}

// 綁定按鈕事件
document.querySelector(".left-arrow").addEventListener("click", () => slidePokemon("left"));
document.querySelector(".right-arrow").addEventListener("click", () => slidePokemon("right"));

// 初始化顯示
updatePokemonContent(currentIndex);

// 漢堡選單功能
const hamburgerMenu = document.querySelector(".hamburger-menu");
const headerNav = document.querySelector(".header-nav");

hamburgerMenu.addEventListener("click", () => {
    headerNav.classList.toggle("active");
});

// 滑動檢視功能（自動監聽滑動事件）
const pokemonDisplay = document.querySelector(".pokemon-display");
pokemonDisplay.addEventListener("scroll", () => {
    const scrollLeft = pokemonDisplay.scrollLeft;
    const index = Math.round(scrollLeft / pokemonDisplay.offsetWidth);
    updatePokemonContent(index);
});

updatePokemonContent(currentIndex);
