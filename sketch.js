//detalhes da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variáveis da raquete
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar
let meusPontos = 0;
let pontosOponente = 0;
let chanceDeErrar = 0;

//sons
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete); 
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  } else if(yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW) && yRaquete > 0) {
    yRaquete -= 10;
  } else if (keyIsDown(DOWN_ARROW) && yRaquete < height - raqueteAltura) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
    yBolinha - raio < yRaquete + raqueteAltura && 
    yBolinha + raio > yRaquete){
      velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26); 
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if(xBolinha > 590) {
     meusPontos += 1;
    ponto.play();
     }
  if(xBolinha < 10) {
     pontosOponente += 1;
    ponto.play();
     }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}