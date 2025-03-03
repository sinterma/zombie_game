class Game {
    constructor () {
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverScreen = document.getElementById('game-end');
        this.player = null;
        this.height = 720;
        this.width = 1675;
        this.obstacles = [];
        this.score = 0;
        this.lives = 5;
        this.gameIsOver = false; 
        this.gameIntervalId = null;
        this.gameLoopFrequency = (1000/60)

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
        
        
    }

    gameLoop() {
      console.log("game loop");
      this.update();
      if(this.gameIsOver) {
        clearInterval(this.gameIntervalId)
      }
}
    update (){

}
}





