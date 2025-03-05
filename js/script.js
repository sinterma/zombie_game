window.onload = function () {
    const startButtonElement = document.getElementById("start-button");
    const restartButtonElement = document.getElementById("restart-button");
    let ourNewGame
    let introMusic = new Audio("assets/intro.mp3");
    introMusic.volume = 0.3;
    introMusic.loop = true; 
    introMusic.play();
   
    startButtonElement.addEventListener("click", function () {
    
      ourNewGame = new Game ();
      introMusic.pause();
      startGame();
    
        
    });

    restartButtonElement.addEventListener("click", ()=> {
        window.location.reload ()

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

        else if (event.code === 'Space') {
            const weapon = new Weapon(
                ourNewGame.gameScreen,
                ourNewGame.player.positionLeft + ourNewGame.player.playerWidth, // Начинается справа от игрока
                ourNewGame.player.positionTop + ourNewGame.player.playerHeight / 2 // По центру высоты игрока
            );
            ourNewGame.weapon.push(weapon);
        }
    });




    function startGame () {
        console.log("start game");
        ourNewGame.start()

    }
};
     
   
