// =============================================
// WDD 131 - Temple Album Filtered
// Author: Ana Suely Côrtes Santos
// =============================================

// Array de objetos dos templos
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5088.jpg"
    
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-45825.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-38451.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495.jpg"
    },
    {
        templeName: "Brasília Brazil",
        location: "Brasília, Brazil",
        dedicated: "2023, September, 17",
        area: 25000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/brasilia-brazil-temple/brasilia-brazil-temple-39184.jpg"
    },
    {
        templeName: "Belém Brazil",
        location: "Belém, Brazil",
        dedicated: "2022, November, 20",
        area: 28000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/belem-brazil-temple/belem-brazil-temple-6176.jpg"
    },
    {
        templeName: "Fortaleza Brazil",
        location: "Fortaleza, Brazil",
        dedicated: "2019, June, 2",
        area: 36000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/fortaleza-brazil-temple/fortaleza-brazil-temple-11029.jpg"
    },
    {
        templeName: "Campinas Brazil",
        location: "Campinas, Brazil",
        dedicated: "2002, May, 17",
        area: 48000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-5206.jpg"
    },
    {
        templeName: "Curitiba Brazil",
        location: "Curitiba, Brazil",
        dedicated: "2008, June, 1",
        area: 27850,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/curitiba-brazil-temple/curitiba-brazil-temple-4882.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-2737.jpg"
    }
];
// ===============================
// MENU RESPONSIVO
// ===============================

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navegacao");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    // Atualiza o atributo aria-expanded para acessibilidade
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !expanded);

    // Altera o ícone do botão
    menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";

});
// Seleciona a galeria
const gallery = document.querySelector(".gallery");

// Função para criar os cartões
function displayTemples(templeList) {

    gallery.innerHTML = "";

    templeList.forEach((temple) => {

        const card = document.createElement("section");

        const name = document.createElement("h2");
        const location = document.createElement("p");
        const dedicated = document.createElement("p");
        const area = document.createElement("p");
        const image = document.createElement("img");

        name.textContent = temple.templeName;

        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

        area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(image);

        gallery.appendChild(card);

    });

}

function closeMenu() {
    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
}


// Exibe todos os templos
displayTemples(temples);

// Rodapé
document.querySelector("#ano-atual").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
document.lastModified;

// ===========================
// FILTROS
// ===========================

// Página Inicial
document.querySelector("#paginainicial").addEventListener("click", () => {

    document.querySelector("#page-title").textContent = "Página Inicial";

    displayTemples(temples);
    closeMenu();

});

// Antigos
document.querySelector("#antigo").addEventListener("click", () => {

    document.querySelector("#page-title").textContent = "Templos Antigos";

    const filtered = temples.filter(temple =>
        parseInt(temple.dedicated) < 1900
    );

    displayTemples(filtered);
    closeMenu();
});

// Novos
document.querySelector("#novo").addEventListener("click", () => {

    document.querySelector("#page-title").textContent = "Templos Novos";

    const filtered = temples.filter(temple =>
        parseInt(temple.dedicated) > 2000
    );

    displayTemples(filtered);
    closeMenu();
});

// Grandes
document.querySelector("#grande").addEventListener("click", () => {

    document.querySelector("#page-title").textContent = "Templos Grandes";

    const filtered = temples.filter(temple =>
        temple.area > 90000
    );

    displayTemples(filtered);

});

// Pequenos
document.querySelector("#pequeno").addEventListener("click", () => {

    document.querySelector("#page-title").textContent = "Templos Pequenos";

    const filtered = temples.filter(temple =>
        temple.area < 10000
    );

    displayTemples(filtered);
    closeMenu();
});