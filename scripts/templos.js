const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");
const anoAtual = document.querySelector("#ano-atual");
const ultimaModificacao = document.querySelector("#ultima-modificacao");

/* Exibe o ano atual no rodapé */
anoAtual.textContent = new Date().getFullYear();

/* Exibe a data da última modificação */
ultimaModificacao.textContent =
    `Última modificação: ${document.lastModified}`;

/* Abre e fecha o menu de navegação */
botaoMenu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");

    const menuEstaAberto = navegacao.classList.contains("aberto");

    botaoMenu.textContent = menuEstaAberto ? "✕" : "☰";

    botaoMenu.setAttribute(
        "aria-expanded",
        menuEstaAberto.toString()
    );

    botaoMenu.setAttribute(
        "aria-label",
        menuEstaAberto
            ? "Fechar menu de navegação"
            : "Abrir menu de navegação"
    );
});

/* Fecha o menu ao selecionar um link na visualização móvel */
const linksMenu = navegacao.querySelectorAll("a");

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 700) {
            navegacao.classList.remove("aberto");
            botaoMenu.textContent = "☰";
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );
        }
    });
});