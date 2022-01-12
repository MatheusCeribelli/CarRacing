var database;
var estadoJogo = 0;
var numJogadores = 0;
var form, jogador, jogo;

var todosJogadores;

var Carro1, Carro2, Carro3, Carro4, Carros;

var Car1, Car2, Car3, Car4;

var Track;

function Preload() {
  Car1 = loadImage("images/car1.png");
  Car2 = loadImage("images/car2.png");
  Car3 = loadImage("images/car3.png");
  Car4 = loadImage("images/car4.png");
  Track = loadImage("images/track.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(displayWidth-20, displayHeight-100);
  jogo = new Jogo();
  jogo.getState();
  jogo.start();
}

function draw() {
  //atualizar o estado de jogo para um quando houver 4 jogadores
  if(numJogadores >= 4){
    jogo.update(1);
  }

  //limpa a tela e comaço o jogo se o modo de jogo for 1
  if(estadoJogo === 1){
    clear();
    jogo.jogar();
  }
}