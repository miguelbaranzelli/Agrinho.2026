let player;
let itens = [];
let score = 0;
let vidas = 3;
let gameOver = false;

function setup() {
  createCanvas(800, 500);

  player = {
    x: width / 2,
    y: height - 60,
    w: 50,
    h: 50,
    speed: 6
  };

  for (let i = 0; i < 12; i++) {
    criarItem();
  }
}

function draw() {
  desenharCenario();

  if (gameOver) {
    telaGameOver();
    return;
  }

  moverJogador();
  desenharJogador();

  for (let item of itens) {
    item.y += item.speed;

    desenharItem(item);

    if (colidiu(player, item)) {

      if (item.tipo === "semente") {
        score += 10;
      }

      if (item.tipo === "agua") {
        score += 15;
      }

      if (item.tipo === "pesticida") {
        score -= 20;
        vidas--;
      }

      resetarItem(item);
    }

    if (item.y > height + 20) {
      resetarItem(item);
    }
  }

  fill(0);
  textSize(24);
  text("Sustentabilidade: " + score, 20, 35);
  text("Vidas: " + vidas, 20, 70);

  if (vidas <= 0) {
    gameOver = true;
  }
}

function desenharCenario() {
  background(135, 206, 235);

  // gramado
  fill(80, 180, 80);
  rect(0, height - 100, width, 100);

  // plantações
  for (let x = 0; x < width; x += 40) {
    fill(34, 139, 34);
    rect(x + 15, height - 130, 10, 30);

    fill(50, 180, 50);
    ellipse(x + 10, height - 120, 15);
    ellipse(x + 30, height - 120, 15);
  }
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= player.speed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.x += player.speed;
  }

  player.x = constrain(player.x, 0, width - player.w);
}

function desenharJogador() {
  // corpo
  fill(255, 200, 100);
  rect(player.x, player.y, player.w, player.h);

  // chapéu
  fill(150, 90, 40);
  rect(player.x - 5, player.y - 10, player.w + 10, 10);

  fill(180, 120, 60);
  rect(player.x + 10, player.y - 20, 30, 10);
}

function criarItem() {
  let tipos = ["semente", "agua", "pesticida"];
  let tipo = random(tipos);

  itens.push({
    x: random(width),
    y: random(-500, 0),
    size: 25,
    speed: random(2, 5),
    tipo: tipo
  });
}

function resetarItem(item) {
  item.x = random(width);
  item.y = random(-300, -50);
  item.tipo = random(["semente", "agua", "pesticida"]);
  item.speed = random(2, 5);
}

function desenharItem(item) {

  if (item.tipo === "semente") {
    fill(139, 69, 19);
    ellipse(item.x, item.y, item.size);
  }

  if (item.tipo === "agua") {
    fill(0, 150, 255);
    ellipse(item.x, item.y, item.size);
    triangle(
      item.x,
      item.y - 15,
      item.x - 10,
      item.y,
      item.x + 10,
      item.y
    );
  }

  if (item.tipo === "pesticida") {
    fill(255, 0, 0);
    rect(item.x - 12, item.y - 12, 24, 24);

    fill(255);
    textSize(16);
    text("☠", item.x - 8, item.y + 6);
  }
}

function colidiu(a, b) {
  return (
    b.x > a.x &&
    b.x < a.x + a.w &&
    b.y > a.y &&
    b.y < a.y + a.h
  );
}

function telaGameOver() {
  background(20, 120, 50);

  fill(255);
  textAlign(CENTER);

  textSize(42);
  text("FIM DE JOGO", width / 2, height / 2 - 40);

  textSize(28);
  text("Pontuação: " + score, width / 2, height / 2 + 10);

  textSize(20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (gameOver && (key === "r" || key === "R")) {
    score = 0;
    vidas = 3;
    gameOver = false;
    itens = [];

    for (let i = 0; i < 12; i++) {
      criarItem();
    }
