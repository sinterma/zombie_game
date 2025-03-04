class Game {
    constructor () {
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverScreen = document.getElementById('game-end');
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
        this.player = new Player (this.gameScreen, 70, 500, 200, 200, "images/main_character.png");
        this.height = 720;
        this.width = 1675;
        this.obstacles = [];
        this.weapon = [];
        this.score = 0;
        this.lives = 2;
        this.gameIsOver = false; 
        this.gameIntervalId = null;
        this.gameLoopFrequency = (1000/60);
        this.obstacleIntervalNormal = null;
        this.obstacleIntervalBird = null;

    }
    start() { 
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        document.getElementById('game-container').style.display = 'block'; 
        document.getElementById('game-end').style.display = 'none';
        this.gameIntervalId = setInterval(() => {
        this.gameLoop(); 
        },  this.gameLoopFrequency); 

        if (this.obstacleIntervalNormal) clearInterval(this.obstacleIntervalNormal);
        if (this.obstacleIntervalBird) clearInterval(this.obstacleIntervalBird);

        this.obstacleIntervalNormal = setInterval(() => {
            this.addObstacle("normal");
        }, Math.random() * 1000 + 1500);

        this.obstacleIntervalBird = setInterval(() => {
            this.addObstacle("zombie_bird");
        }, 1000);
   
    }

    addObstacle(type) {
        this.obstacles.push(new Obstacle(this.gameScreen, type, this.height));
    }


    gameLoop() {
      console.log("game loop, obstacles count:", this.obstacles.length);
      this.update();
      if(this.gameIsOver) {
        clearInterval(this.obstacleIntervalNormal);
        clearInterval(this.obstacleIntervalBird);
        this.gameOver();
        }
      }

    update (){
        this.player.move();
        this.obstacles.forEach((obstacle, i) => {
            obstacle.move();

            if (obstacle.isOutOfScreen()) {
                this.score++;
                document.getElementById('score').innerText = this.score; 
                obstacle.remove();
                this.obstacles.splice(i, 1);
                i --;
                
            }

            if (this.player.didCollide(obstacle)) {
                console.log("Player hit a zombie!");
                obstacle.remove();
                this.obstacles.splice(i, 1);
                i--;
                this.lives --
                this.livesElement.innerText = this.lives;
                if (this.lives === 0) {
                    this.gameIsOver = true;

                }
            }

        });

            for (let i = 0; i < this.weapon.length; i++) {
                const currentWeapon = this.weapon[i];
                currentWeapon.move();
    
                if (currentWeapon.isOutOfScreen()) {
                    currentWeapon.remove();
                    this.weapon.splice(i, 1);
                    i--;
                    continue;
                }

                for (let j = 0; j < this.obstacles.length; j++) {
                    if (currentWeapon.didCollide(this.obstacles[j])) {
                        this.obstacles[j].remove();
                        this.obstacles.splice(j, 1);
                        currentWeapon.remove();
                        this.weapon.splice(i, 1);
                        i--;
                        break;
        
             }} }}
    
    
    

    gameOver() {
        clearInterval(this.gameIntervalId);
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'block';
    }
}

            