class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameOverScreen = document.getElementById("game-end");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.player = new Player(
      this.gameScreen,
      70,
      500,
      200,
      200,
      "images/main_character.png"
    );
    this.height = 700;
    this.width = 1675;
    this.obstacles = [];
    this.weapon = [];
    this.score = 0;
    this.lives = 5;
    this.backgroundMusic = new Audio("assets/backgroundMusic.mp3");
    this.zombie = new Audio("assets/zombie.mp3");
    this.backgroundMusic.volume = 0.2;
    this.backgroundMusic.loop = true;
    this.zombie.volume = 0.1;
    this.zombie.loop = true;
    this.gameOverMusic = new Audio("assets/game-over-music.mp3");
    this.gameOverMusic.volume = 0.2;
    this.gameOverMusic.loop = true;
    this.gameOverSound = new Audio("assets/game-over.mp3");
    this.gameOverSound.volume = 0.1;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
    this.obstacleIntervalNormal = null;
    this.obstacleIntervalBird = null;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    document.getElementById("game-container").style.display = "block";
    document.getElementById("game-end").style.display = "none";
    this.backgroundMusic.play();
    this.zombie.play();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);

    if (this.obstacleIntervalNormal) clearInterval(this.obstacleIntervalNormal);
    if (this.obstacleIntervalBird) clearInterval(this.obstacleIntervalBird);

    this.obstacleIntervalNormal = setInterval(() => {
      this.addObstacle("normal");
    }, Math.random() * 1000 + 1500);

    this.obstacleIntervalBird = setInterval(() => {
      this.addObstacle("zombie_bird");
    }, 2000);
  }

  addObstacle(type) {
    this.obstacles.push(new Obstacle(this.gameScreen, type, this.height));
  }

  gameLoop() {
    console.log("game loop, obstacles count:", this.obstacles.length);
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.obstacleIntervalNormal);
      clearInterval(this.obstacleIntervalBird);
      this.gameOver();
    }
  }

  update() {
    this.player.move();

    
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (obstacle.isOutOfScreen()) {
        this.lives--;
        this.livesElement.innerText = this.lives;
        obstacle.remove();
        this.obstacles.splice(i, 1);
        i--;
        if (this.lives === 0) {
          this.gameIsOver = true;
        }
      }

      if (this.player.didCollide(obstacle)) {
        console.log("Player hit a zombie!");
        this.lives--;
        this.livesElement.innerText = this.lives;
        obstacle.remove();
        this.obstacles.splice(i, 1);
        i--;

        if (this.lives === 0) {
          this.gameIsOver = true;
        }
      }

      for (let j = 0; j < this.weapon.length; j++) {
        const currentWeapon = this.weapon[j];
        if (currentWeapon.didCollide(obstacle)) {
          console.log("Weapon hit an obstacle!");
          this.score++;
          this.scoreElement.innerText = this.score;
          currentWeapon.remove();
          this.weapon.splice(j, 1);
          obstacle.remove();
          this.obstacles.splice(i, 1);
          i--;
          break;
        }
      }
    }

    for (let i = 0; i < this.weapon.length; i++) {
      const currentWeapon = this.weapon[i];
      currentWeapon.move();

      if (currentWeapon.isOutOfScreen()) {
        currentWeapon.remove();
        this.weapon.splice(i, 1);
        i--;
      }
    }
  }

  gameOver() {
    clearInterval(this.gameIntervalId);
    this.gameScreen.style.display = "none";
    this.gameOverScreen.style.display = "block";
    this.backgroundMusic.pause();
    this.zombie.pause();
    this.gameOverMusic.play();
    setTimeout(() => {
      this.gameOverSound.play();
    }, 1000);
  }
}
