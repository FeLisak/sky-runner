//Base configs for the Game
const config = {
  //Game Type
  type: Phaser.AUTO,

  //Game Scale
  width: 800,
  height: 600,
  //Center the Game in the Page
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  //Game Background Color
  backgroundColor: "000",

  //Game Physics
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 },
    },
  },

  //Defining Scene Names
  scene: [startScene, storyScene, controlsScene, gameScene, endScene],
};

//Starts the Phaser Game
const game = new Phaser.Game(config);
