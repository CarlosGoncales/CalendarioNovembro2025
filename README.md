# Calendário Novembro 2025 ❤️

Uma agenda digital com as memórias de novembro de 2025 — do primeiro date ao pedido de namoro.

## Como publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)` e clique em **Save**.
4. Em um ou dois minutos o site fica em
   `https://<seu-usuario>.github.io/CalendarioNovembro2025/`

Tudo usa caminhos relativos, então funciona tanto no GitHub Pages quanto abrindo o `index.html` direto no computador.

## Estrutura

```
index.html            capa, calendário e as 11 memórias
style.css             visual da agenda (usado pelas duas páginas)
script.js             navegação entre as datas e a música
ImagensNovas/         fotos das memórias e o fundo
assets/trilhasonora.mp3
pedidoNamoro/         a página do pedido (19 de novembro)
```

Para adicionar uma memória nova: copie um bloco `<article class="tela memoria" ...>` no `index.html`, troque o `id` (ex.: `dia-30`), a foto e o texto, e transforme o dia no calendário em um link `<a class="dia marcado" href="#dia-30">30</a>`.

## Créditos

A página do pedido foi baseada em [pedido-de-namoro](https://github.com/laisfrigerio/pedido-de-namoro), de [@laisfrigerio](https://github.com/laisfrigerio) (licença MIT).
