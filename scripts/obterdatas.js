   // obterdatas.js

(function () {
  "use strict";

  // Ano atual no span com id "anoatual"
  const spanAno = document.querySelector("#anoatual");
  const anoAtual = new Date().getFullYear();
  if (spanAno) {
    spanAno.textContent = anoAtual;
  }

  // Data da última modificação no parágrafo com id "ultimaModificacao"
  const pUltimaMod = document.querySelector("#ultimaModificacao");
  if (pUltimaMod) {
    // Usa o formato nativo de document.lastModified (como solicitado)
    pUltimaMod.textContent = `Última modificação: ${document.lastModified}`;
  }
})();
             