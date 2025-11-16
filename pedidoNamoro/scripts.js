function accepted() {
  const mensagem = "Meu bem,Eu aceito namorar com você! S2";
  const numero = "5544998137196"; // coloque seu número aqui

  const url =
    "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

  window.location.href = url;
}

function newPosition(min, max) {
  return Math.random() * (max - min) + min + "%";
}

function declined(btn) {
  // btn declarado na função
  btn.style.position = "absolute";
  btn.style.bottom = newPosition(10, 90);
  btn.style.left = newPosition(10, 90);
  console.log("ops......");
}
