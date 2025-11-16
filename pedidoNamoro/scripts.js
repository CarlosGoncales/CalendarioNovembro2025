function accepted() {
  alert(
    "Você aceitou namorar com Carlos Gonçales," +
      "por falor envie o número do seu dedo! e fotos para sugestão de Aliança"
  );
  // redireciona para um URL após clicar no SIM
  location.href = "https://music.youtube.com/watch?v=izGwDsrQ1eQ";
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
