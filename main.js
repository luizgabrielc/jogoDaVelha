var tabela = document.querySelector("table");
var reiniciar = document.querySelector("#reiniciar");
var jogadorAtual = "X";
let contadorX = 0;
let contadorO = 0;
let xTotal = document.querySelector(".xTotal");
let eTotal = document.querySelector(".eTotal");
let oTotal = document.querySelector(".oTotal");
var caixaDeAlerta = document.querySelector(".caixaDeAlerta");
var alertaDeConteudo = document.querySelector(".alertaDeConteudo");
let jogadas = 0;
let vencedor = [];
let empate = 0;
let fimDaRodada = false;

tabela.addEventListener("click", function jogar(evento) {
  if (evento.target.tagName === "TD" && evento.target.textContent == "" && fimDaRodada == false) {
    evento.target.textContent = jogadorAtual;
    verificaVencedor();
    jogadas++;
    if (fimDaRodada == true) {
      jogar(evento);
    }
    if (jogadorAtual === "X") {
      jogadorAtual = "O";
    } else {
      jogadorAtual = "X";
    }
  }
});

reiniciar.addEventListener("click", function () {
  reiniciarJogo();
});

function verificaVencedor() {
  var celulas = tabela.querySelectorAll("td");
  var combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (var i = 0; i < combinacoes.length; i++) {
    var combinacao = combinacoes[i];
    if (
      celulas[combinacao[0]].textContent === jogadorAtual &&
      celulas[combinacao[1]].textContent === jogadorAtual &&
      celulas[combinacao[2]].textContent === jogadorAtual
    ) {
      vencedor = [celulas[combinacao[0]], celulas[combinacao[1]], celulas[combinacao[2]]];
      vencedor[0].classList.add("vencedor");
      vencedor[1].classList.add("vencedor");
      vencedor[2].classList.add("vencedor");
      if (jogadorAtual === "X") {
        contadorX++;
        xTotal.innerHTML = contadorX;
        exibeAlerta(jogadorAtual + " ganhou! Parabéns!");
      } else if (jogadorAtual === "O") {
        contadorO++;
        oTotal.innerHTML = contadorO;
        exibeAlerta(jogadorAtual + " ganhou! Parabéns!");
      }
      return (fimDaRodada = true);
    }
  }
  verificaEmpate();
}

function verificaEmpate() {
  if (jogadas == 8) {
    exibeEmpate("Empate! Jogue novamente!");
    empate++;
    eTotal.innerHTML = empate;
  }
}

function exibeEmpate(mensagem) {
  caixaDeAlerta.style.display = "flex";
  alertaDeConteudo.innerHTML = "<p>" + mensagem + "</p>" + '<button id="ok">OK</button>';

  var ok = document.querySelector("#ok");
  ok.addEventListener("click", function () {
    caixaDeAlerta.style.display = "none";
  });
}
function exibeAlerta(mensagem) {
  caixaDeAlerta.style.display = "flex";
  alertaDeConteudo.innerHTML =
    "<p>" + mensagem + "</p>" + "<p>Você é demais!</p>" + '<button id="ok">OK</button>';

  var ok = document.querySelector("#ok");
  ok.addEventListener("click", function () {
    caixaDeAlerta.style.display = "none";
    jogadas = 0;
  });
}
function jogarNovamente() {
  var celulas = tabela.querySelectorAll("td");
  for (var i = 0; i < celulas.length; i++) {
    celulas[i].textContent = "";
    celulas[i].classList.remove("vencedor");
  }
  jogadas = 0;
  fimDaRodada = false;
}
function reiniciarJogo() {
  var celulas = tabela.querySelectorAll("td");
  for (var i = 0; i < celulas.length; i++) {
    celulas[i].textContent = "";
    celulas[i].classList.remove("vencedor");
  }
  jogadorAtual = "X";
  contadorX = 0;
  xTotal.innerHTML = contadorX;
  contadorO = 0;
  oTotal.innerHTML = contadorO;
  empate = 0;
  eTotal.innerHTML = empate;
  jogadas = 0;
  fimDaRodada = false;
}
