const zombieImages = {
  normal: ["images/zombie_1.png", "images/zombie_2.png", "images/zombie_3.png"],
  bird: ["images/zombie_bird.png"],
};

class Obstacle {
  constructor(gameScreen, type, gameHeight) {
    this.type = type;
    this.left = 1475;
    this.top = 500;
    this.width = 210;
    this.height = 210;
    this.speed = Math.random() * 7 + 2;

    if (this.type === "zombie_bird") {
      this.top = Math.random() * 150;
    } else {
      this.top =
        Math.floor(Math.random() * (gameHeight - this.height - 400)) + 400;
    }

    this.element = document.createElement("img");
    if (this.type === "zombie_bird") {
      this.element.src = zombieImages.bird[0];
    } else {
      let randomIndex = Math.floor(Math.random() * zombieImages.normal.length);
      this.element.src = zombieImages.normal[randomIndex];
    }
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    gameScreen.appendChild(this.element);
  }

  move() {
    this.left -= this.speed;

    if (this.type === "zombie_bird") {
      this.top += Math.random() * 6 - 3; // Легкое покачивание вверх-вниз
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  isOutOfScreen() {
    return this.left + this.width < 0;
  }

  remove() {
    this.element.remove();
  }
}
