window.onload = function () {
    const startButtonElement = document.getElementById("start-button");
    const restartButtonElement = document.getElementById("restart-button");
    let ourNewGame
   
    startButtonElement.addEventListener("click", function () {
      ourNewGame = new Game ();
      startGame();
        
    });
    function startGame () {
        console.log("start game");
        ourNewGame.start()

    }
};
     
   
