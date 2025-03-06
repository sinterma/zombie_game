window.onload = function () {
  const startButtonElement = document.getElementById("start-button");
  const restartButtonElement = document.getElementById("restart-button");
  const playMusicButton = document.getElementById("play-music-button");

  let ourNewGame;
  let introMusic = new Audio("assets/intro.mp3");
  introMusic.volume = 0.3;
  introMusic.loop = true;
  let playClickSound = new Audio("assets/click.mp3");
  playClickSound.volume = 0.3;

  let isMuted = true;
  let canShoot = true;
  const fireRate = 600;

  startButtonElement.addEventListener("click", function () {
    playClickSound.play();
    ourNewGame = new Game();
    introMusic.pause();
    startGame();
  });

  restartButtonElement.addEventListener("click", () => {
    playClickSound.play();
    window.location.reload();
  });

  playMusicButton.textContent = "Play Music";

  playMusicButton.addEventListener("click", function () {
    playClickSound.play();
    if (isMuted) {
      introMusic.play();
      playMusicButton.textContent = "Mute Music";
      isMuted = false;
    } else {
      introMusic.pause();
      introMusic.currentTime = 0;
      playMusicButton.textContent = "Play Music";
      isMuted = true;
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
      ourNewGame.player.directionY = -5;
    } else if (event.code === "ArrowDown") {
      ourNewGame.player.directionY = 5;
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowUp") {
      ourNewGame.player.directionY = 0;
    } else if (event.code === "ArrowDown") {
      ourNewGame.player.directionY = 0;
    } else if (event.code === "Space" && canShoot) {
      canShoot = false;
      const weapon = new Weapon(
        ourNewGame.gameScreen,
        ourNewGame.player.positionLeft + ourNewGame.player.playerWidth,
        ourNewGame.player.positionTop + ourNewGame.player.playerHeight / 2
      );
      ourNewGame.weapon.push(weapon);

      setTimeout(() => {
        canShoot = true;
      }, fireRate);
    }
  });

  function startGame() {
    console.log("start game");
    ourNewGame.start();
  }
};
