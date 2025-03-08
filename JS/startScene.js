class startScene extends Phaser.Scene {
  constructor() {
    super({ key: "startScene" });
  }

  preload() {
    //Loads Background Image
    this.load.image("startSceneBackground", "assets/startSceneBackground.jpg");
    //Loads button Images
    this.load.image("startButton", "assets/startButton.png");
    this.load.image("tutorialButton", "assets/tutorialButton.png");
  }

  create() {
    //Shows Background Image
    this.add.image(400, 300, "startSceneBackground");

    //Shows buttons Images
    this.start = this.add.image(400, 300, "startButton");
    this.tutorial = this.add.image(400, 400, "tutorialButton");

    //Creates a buttons interactions
    this.start.setInteractive({
      useHandCursor: true,
    });
    this.tutorial.setInteractive({
      useHandCursor: true,
    });

    this.start.on("pointerdown", () => {
      this.scene.stop("startScene");
      this.scene.start("storyScene");
    });

    this.tutorial.on("pointerdown", () => {
      this.scene.stop("startScene");
      this.scene.start("controlsScene");
    });
  }
}
