class endScene extends Phaser.Scene {
  constructor() {
    super({ key: "endScene" });
  }

  preload() {
    //Loads Background Image
    this.load.image("endSceneBackground", "assets/endSceneBackground.png");
  }

  create() {
    //Shows Background Image
    this.add.image(400, 300, "endSceneBackground");

    //Adds Scoreboard
    this.add.text(350, 305, `Score: ${localStorage.getItem("score")}`, {
      fontSize: "20px",
      fill: "#fff",
    });

    //Adds Restart Text
    this.add.text(300, 330, "Click to Restart", {
      fontSize: "20px",
      fill: "#fff",
    });

    //Creates a button to change the Scene
    this.input.on("pointerdown", () => {
      this.scene.stop("endScene");
      this.scene.start("gameScene");
    });
  }
}
