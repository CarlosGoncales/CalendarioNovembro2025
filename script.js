// Agenda — navegação por "#" (funciona no GitHub Pages e no botão Voltar do celular)

const telas = Array.from(document.querySelectorAll("[data-tela]"));
const memorias = telas.filter((t) => t.classList.contains("memoria"));
const idsMemorias = memorias.map((t) => t.id);
const navegacao = document.getElementById("navegacao");
const anterior = document.getElementById("anterior");
const proxima = document.getElementById("proxima");

const NOMES_MES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
  "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DIA_ESPECIAL = 19; // o dia do pedido — todo dia 19 com memória vira coração

/* ---------- Eventos: lidos das memórias (data-data="AAAA-MM-DD") ---------- */

// data -> primeira memória daquele dia
const eventos = new Map();
memorias.forEach((m) => {
  if (!eventos.has(m.dataset.data)) eventos.set(m.dataset.data, m);
});

function chaveMes(ano, mes) {
  return ano + "-" + String(mes + 1).padStart(2, "0");
}

function partes(data) {
  const [a, m, d] = data.split("-").map(Number);
  return { ano: a, mes: m - 1, dia: d };
}

// quantas memórias cada mês tem
const porMes = new Map();
eventos.forEach((_, data) => {
  const { ano, mes } = partes(data);
  const k = chaveMes(ano, mes);
  porMes.set(k, (porMes.get(k) || 0) + 1);
});

// Um evento sozinho no fim de um mês aparece na primeira linha do mês seguinte
// (ex.: 31 de outubro aparece em novembro), em vez de criar um mês só para ele
function mesOndeAparece(data) {
  const { ano, mes, dia } = partes(data);
  if (porMes.get(chaveMes(ano, mes)) > 1) return chaveMes(ano, mes);
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  const proxAno = mes === 11 ? ano + 1 : ano;
  const proxMes = (mes + 1) % 12;
  const inicioProx = new Date(proxAno, proxMes, 1).getDay();
  if (dia > ultimoDia - inicioProx) return chaveMes(proxAno, proxMes);
  return chaveMes(ano, mes);
}

const meses = Array.from(new Set(Array.from(eventos.keys()).map(mesOndeAparece))).sort();
let mesAtual = meses[0];

/* ---------- Calendário ---------- */

const elDias = document.getElementById("dias");
const elNome = document.getElementById("mesNome");
const btnAnterior = document.getElementById("mesAnterior");
const btnProximo = document.getElementById("mesProximo");
const elPontos = document.getElementById("pontosMeses");

function celula(ano, mes, dia, outroMes) {
  const data = chaveMes(ano, mes) + "-" + String(dia).padStart(2, "0");
  let memoria = eventos.get(data);
  if (memoria && outroMes && mesOndeAparece(data) !== mesAtual) memoria = null;
  if (!memoria) {
    const s = document.createElement("span");
    if (!outroMes) {
      s.className = "dia";
      s.textContent = dia;
    }
    return s;
  }
  const a = document.createElement("a");
  a.className = "dia " + (dia === DIA_ESPECIAL ? "especial" : "marcado") + (outroMes ? " outro-mes" : "");
  a.href = "#" + memoria.id;
  a.textContent = dia;
  const titulo = memoria.querySelector("figcaption, .legenda-colagem");
  a.setAttribute("aria-label", dia + " de " + NOMES_MES[mes].toLowerCase() + (titulo ? ": " + titulo.textContent.trim() : ""));
  return a;
}

function desenharMes() {
  const [ano, m] = mesAtual.split("-").map(Number);
  const mes = m - 1;
  const inicio = new Date(ano, mes, 1).getDay();
  const total = new Date(ano, mes + 1, 0).getDate();
  const totalAnterior = new Date(ano, mes, 0).getDate();
  const anoAnt = mes === 0 ? ano - 1 : ano;
  const mesAnt = (mes + 11) % 12;

  elDias.replaceChildren();
  for (let i = inicio - 1; i >= 0; i--) elDias.append(celula(anoAnt, mesAnt, totalAnterior - i, true));
  for (let d = 1; d <= total; d++) elDias.append(celula(ano, mes, d, false));

  elNome.textContent = NOMES_MES[mes] + " de " + ano;

  const pos = meses.indexOf(mesAtual);
  btnAnterior.disabled = pos <= 0;
  btnProximo.disabled = pos >= meses.length - 1;

  elPontos.replaceChildren(...meses.map((k) => {
    const p = document.createElement("span");
    if (k === mesAtual) p.className = "atual";
    return p;
  }));
}

btnAnterior.addEventListener("click", () => {
  const pos = meses.indexOf(mesAtual);
  if (pos > 0) { mesAtual = meses[pos - 1]; desenharMes(); }
});
btnProximo.addEventListener("click", () => {
  const pos = meses.indexOf(mesAtual);
  if (pos < meses.length - 1) { mesAtual = meses[pos + 1]; desenharMes(); }
});

/* ---------- Telas ---------- */

function mostrarTela() {
  const id = decodeURIComponent(location.hash.replace("#", "")) || "inicio";
  const el = document.getElementById(id);
  const alvo = el && el.dataset.tela ? id : "inicio";

  telas.forEach((t) => (t.hidden = t.id !== alvo));

  const posicao = idsMemorias.indexOf(alvo);
  navegacao.hidden = posicao === -1;
  if (posicao !== -1) {
    configurarSeta(anterior, idsMemorias[posicao - 1]);
    configurarSeta(proxima, idsMemorias[posicao + 1]);
    // ao voltar, o calendário abre no mês desta memória
    mesAtual = mesOndeAparece(memorias[posicao].dataset.data);
  }
  if (alvo === "calendario") desenharMes();

  window.scrollTo(0, 0);
}

function configurarSeta(seta, destino) {
  if (destino) {
    seta.href = "#" + destino;
    seta.removeAttribute("aria-disabled");
    seta.tabIndex = 0;
  } else {
    seta.removeAttribute("href");
    seta.setAttribute("aria-disabled", "true");
    seta.tabIndex = -1;
  }
}

window.addEventListener("hashchange", mostrarTela);
mostrarTela();

// "Descubra!" revela a foto
document.getElementById("descubra").addEventListener("click", () => {
  const foto = document.getElementById("fotoGata");
  foto.hidden = !foto.hidden;
});

/* ---------- Música: só toca depois do primeiro toque na tela ---------- */

const player = document.getElementById("player");
const botaoMusica = document.getElementById("musica");

function atualizarBotaoMusica() {
  const tocando = !player.paused;
  botaoMusica.setAttribute("aria-pressed", String(tocando));
  botaoMusica.setAttribute("aria-label", tocando ? "Pausar música" : "Tocar música");
}

player.addEventListener("play", atualizarBotaoMusica);
player.addEventListener("pause", atualizarBotaoMusica);

botaoMusica.addEventListener("click", (e) => {
  e.stopPropagation();
  if (player.paused) player.play();
  else player.pause();
});

document.addEventListener(
  "pointerdown",
  (e) => {
    if (e.target.closest("#musica")) return;
    player.play().catch(() => {});
  },
  { once: true }
);
