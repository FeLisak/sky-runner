class storyScene extends Phaser.Scene {
  constructor() {
    super({ key: "storyScene" });
  }

  create() {
    //Adds Start Text
    this.add.text(
      25,
      this.cameras.main.worldView.y + this.cameras.main.height / 8,
      `Plumito is a little purple bird who dreams of flying high,\nbut his wings aren't strong enough yet. They say that at\nthe top of the Celestial Tree there are golden coins with\nthe power of the winds, capable of awakening his true flight.\nThe problem? The platforms are unstable and disappear quickly!\nNow it's up to you: help Plumito climb higher and higher,\ncollecting coins and proving that he deserves to fly among\nthe legends. How far can you go?`,
      {
        fontSize: "20px",
        fill: "#fff",
      }
    );

    //Adds Start Text
    this.add.text(300, 550, "Click to start!", {
      fontSize: "20px",
      fill: "#fff",
    });

    //Creates a button to change the Scene
    this.input.on("pointerdown", () => {
      this.scene.stop("storyScene");
      this.scene.start("gameScene");
    });
  }
}
