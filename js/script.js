window.onload = function () {
    const startButtonElement = document.getElementById("start-button");
    const restartButtonElement = document.getElementById("restart-button");
    let ourNewGame
   
    startButtonElement.addEventListener("click", function () {
      ourNewGame = new Game ();
      startGame();
        
    });

    window.addEventListener('keydown', (event)=> {
        if(event.code === 'ArrowUp') {
            ourNewGame.player.directionY = -5;

        }

        else if (event.code === 'ArrowDown') {
            ourNewGame.player.directionY = 5;
        }

    });

    window.addEventListener('keyup', (event) => {
        if(event.code === 'ArrowUp') {
        ourNewGame.player.directionY = 0;

        }

        else if (event.code === 'ArrowDown') {
            ourNewGame.player.directionY = 0;
        }
    });




    function startGame () {
        console.log("start game");
        ourNewGame.start()

    }
};
     
   
