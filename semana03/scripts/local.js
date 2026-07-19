// Atualiza ano atual e data de última modificação
(function atualizaRodape() {
  const anoSpan = document.getElementById("ano-atual");
  const modSpan = document.getElementById("ultima-modificacao");
  const agora = new Date();
  if (anoSpan) anoSpan.textContent = String(agora.getFullYear());

  // document.lastModified retorna uma string; formatamos de forma simples
  if (modSpan) {
    const mod = new Date(document.lastModified);
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    modSpan.textContent = isNaN(mod.getTime()) ? document.lastModified : fmt.format(mod);
  }
})();

// Valores estáticos de exemplo (compatíveis com o conteúdo visível)
const unidade = "metric"; // "metric" para °C/kmh ou "imperial" para °F/mph
const temperatura = 28;   // °C quando metric; 82 quando imperial (exemplo)
const vento = 12;         // km/h quando metric; 8 quando imperial (exemplo)

// Fórmulas:
// - Wind chill (sensação de frio) no padrão imperial (NOAA):
//   T_wc = 35.74 + 0.6215*T - 35.75*(v^0.16) + 0.4275*T*(v^0.16), T em °F, v em mph
// - Adaptação para métrico: converter para imperial, aplicar fórmula, converter de volta.
// Observação: Para climas quentes e úmidos, o índice mais relevante seria o "heat index".
// Porém, o requisito do exercício pede "sensação térmica" com limites de aplicação.

// Converte C↔F e km/h↔mph
const cToF = c => (c * 9) / 5 + 32;
const fToC = f => ((f - 32) * 5) / 9;
const kmhToMph = kmh => kmh / 1.609344;

// Função solicitada: uma linha retornando o resultado
function calcularSensacaoTermica(temp, vel) {
  return unidade === "imperial"
    ? 35.74 + 0.6215 * temp - 35.75 * Math.pow(vel, 0.16) + 0.4275 * temp * Math.pow(vel, 0.16)
    : fToC(
        35.74 +
          0.6215 * cToF(temp) -
          35.75 * Math.pow(kmhToMph(vel), 0.16) +
          0.4275 * cToF(temp) * Math.pow(kmhToMph(vel), 0.16)
      );
}

// Aplica as condições de cálculo e preenche no DOM
(function atualizaSensacao() {
  const el = document.getElementById("sensacao-valor");
  if (!el) return;

  let podeCalcular = false;

  if (unidade === "metric") {
    // Regras: T <= 10 °C e vento > 4.8 km/h
    podeCalcular = temperatura <= 10 && vento > 4.8;
  } else {
    // imperial: T <= 50 °F e vento > 3 mph
    podeCalcular = temperatura <= 50 && vento > 3;
  }

  if (podeCalcular) {
    const valor = calcularSensacaoTermica(temperatura, vento);
    const arred = Math.round(valor);
    el.textContent = unidade === "imperial" ? `${arred} °F` : `${arred} °C`;
  } else {
    el.textContent = "N/A";
  }
})();

