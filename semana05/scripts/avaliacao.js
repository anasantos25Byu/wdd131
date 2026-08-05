let contador = Number(localStorage.getItem("contadorAvaliacoes")) || 0;

contador++;

localStorage.setItem("contadorAvaliacoes", contador);

document.querySelector("#contador").textContent = contador;

document.querySelector("#ano").textContent =
new Date().getFullYear();

document.querySelector("#ultimaModificacao").textContent =
`Última Modificação: ${document.lastModified}`;