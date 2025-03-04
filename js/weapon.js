class Weapon {
    constructor (gameScreen, left, top) {
        this.left = left;
        this.top = top;
        this.width = 35;
        this.height = 35;
        this.element = document.createElement("img");
        this.element.src = "images/fire.png";
        this.element.style.position ='absolute';
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        gameScreen.appendChild(this.element);
    

    }

    move() {

        this.left +=5;
        this.updatePosition ();
        
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
    isOutOfScreen() {
        return this.left > window.innerWidth; // Если оружие ушло за экран - удалить
    }

    remove() {
        this.element.remove();
    }

    didCollide(obstacle) {
        const weaponRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (
          weaponRect.left < obstacleRect.right &&
          weaponRect.right > obstacleRect.left &&
          weaponRect.top < obstacleRect.bottom &&
          weaponRect.bottom > obstacleRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
    }

