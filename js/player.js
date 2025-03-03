class Player {
    constructor (gameScreen, positionLeft, positionTop, playerWidth, playerHeight, playerImageSrc) {
        console.log("Создаём игрока...", gameScreen, positionLeft, positionTop, playerWidth, playerHeight, playerImageSrc);
        this.gameScreen = gameScreen;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;
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
    move () {
        this.positionLeft += this.directionX;
        this.positionTop += this.directionY;
        this.updatePosition();

    }
    updatePosition () {
        this.element.style.top = `${this.positionTop}px`;
        this.element.style.left = `${this.positionLeft}px`

    }

    didCollide (obstacles) {

    }




}