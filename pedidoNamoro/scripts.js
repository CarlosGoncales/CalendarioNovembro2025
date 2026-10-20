function accepted() {
  const mensagem = "Meu bem,Eu aceito namorar com você! S2";
  const numero = "5544998137196"; // coloque seu número aqui

  const url =
    "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

  window.location.href = url;
}

// O botão "NÃO" foge para um lugar aleatório dentro da tela
function declined(btn) {
  const margem = 12;
  const largura = btn.offsetWidth;
  const altura = btn.offsetHeight;
  const maxX = window.innerWidth - largura - margem;
  const maxY = window.innerHeight - altura - margem;

  btn.style.position = "fixed";
  btn.style.left = margem + Math.random() * Math.max(0, maxX - margem) + "px";
  btn.style.top = margem + Math.random() * Math.max(0, maxY - margem) + "px";
  console.log("ops......");
}
