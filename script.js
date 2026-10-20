// Agenda de Novembro — navegação por "#" (funciona no GitHub Pages e no botão Voltar do celular)

const telas = Array.from(document.querySelectorAll("[data-tela]"));
const memorias = telas.filter((t) => t.classList.contains("memoria")).map((t) => t.id);
const navegacao = document.getElementById("navegacao");
const anterior = document.getElementById("anterior");
const proxima = document.getElementById("proxima");

function mostrarTela() {
  const id = location.hash.replace("#", "") || "inicio";
  const alvo = document.getElementById(id) && document.getElementById(id).dataset.tela ? id : "inicio";

  telas.forEach((t) => (t.hidden = t.id !== alvo));

  const posicao = memorias.indexOf(alvo);
  navegacao.hidden = posicao === -1;
  if (posicao !== -1) {
    configurarSeta(anterior, memorias[posicao - 1]);
    configurarSeta(proxima, memorias[posicao + 1]);
  }

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

// Música: navegadores só deixam tocar depois do primeiro toque na tela
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
