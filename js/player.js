class Player {
    constructor (gameScreen, positionLeft, positionTop, playerWidth, playerHeight, playerImageSrc) {
        console.log("Создаём игрока...", gameScreen, positionLeft, positionTop, playerWidth, playerHeight, playerImageSrc);
        this.gameScreen = gameScreen;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;
        this.meow = new Audio("assets/meow.mp3");
        this.meow.volume = 1;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');
        this.element.src = playerImageSrc;
        this.element.style.position ='absolute';
        this.element.style.top = `${positionTop}px`;
        this.element.style.left = `${positionLeft}px`;
        this.element.style.width = `${playerWidth}px`;
        this.element.style.height = `${playerHeight}px`;
        this.gameScreen.appendChild(this.element);

    }
    move() {
        this.positionLeft += this.directionX;
        this.positionTop += this.directionY;
    
        if (this.positionTop < 0) {
            this.positionTop = 0;
        }
    
        if (this.positionTop + this.playerHeight > this.gameScreen.clientHeight) {
            this.positionTop = this.gameScreen.clientHeight - this.playerHeight;
        }
    
        this.updatePosition();
    }

    
    updatePosition () {
        this.element.style.top = `${this.positionTop}px`;
        this.element.style.left = `${this.positionLeft}px`

    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) {
          this.meow.play();
          return true;
        } else {
          return false;
        }
      }
    }





