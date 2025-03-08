class controlsScene extends Phaser.Scene {
  constructor() {
    super({ key: "controlsScene" });
  }

  preload() {
    //Preloads Background Image
    this.load.image(
      "controlsSceneBackground",
      "assets/controlsSceneBackground.png"
    );
  }

  create() {
    //Shows Background Image
    this.add.image(400, 300, "controlsSceneBackground");

    //Adds Start Text
    this.add.text(300, 550, "Click to start!", {
      fontSize: "20px",
      fill: "#000",
    });

    //Creates a button to change the Scene
    this.input.on("pointerdown", () => {
      this.scene.stop("controlsScene");
      this.scene.start("gameScene");
    });
  }
}
