class gameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });
    this.score = 0; // Set score to 0 as default
    this.platformSpeed = -200; // Defines platform speed to be created
    this.canJump = true; // Verifies if some key is being pressed continually
    this.lastPlatformsY = new Set([500]); // Use Set to avoid duplicate values
    this.lastPlatformsX = new Set(); // Stores the X positions of the previous 5 platforms
  }

  preload() {
    // Loading Background
    this.load.image("gameSceneBackground", "assets/gameSceneBackground.jpg");
    // Loading platforms
    this.load.image("platform", "assets/platforms.png");
    // Loading bird
    this.load.spritesheet("player", "assets/bird-purple.png", {
      frameWidth: 75,
      frameHeight: 75,
    });
    // Loading coins
    this.load.image("coin", "assets/coin.png");
  }

  create() {
    // Shows background
    this.add.image(400, 300, "gameSceneBackground");

    // Shows scoreboard
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      fill: "#fff",
    });

    // Create platforms group
    this.platforms = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    this.coins = this.physics.add.group();

    // Creates the start platform
    this.createLargePlatform(400, 500);

    // Creates player
    this.player = this.physics.add.sprite(400, 370, "player");
    this.player.setCollideWorldBounds(true);

    // Creates player animations
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    // Adds game collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    );

    // Recognizes when some key is pressed
    this.cursors = this.input.keyboard.createCursorKeys();

    // Creates platforms continually
    this.time.addEvent({
      delay: 1200,
      callback: () => {
        this.generatePlatforms(1); // Creates platforms
      },
      loop: true,
    });
  }

  update() {
    // Player moves
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.setFlip(false, false);
    } else {
      this.player.setVelocityX(0);
    }

    // Verifies if player has collided with bottom
    if (this.player.y + this.player.height > this.sys.game.config.height) {
      localStorage.setItem("score", this.score);
      this.scene.stop("gameScene");
      this.scene.start("endScene");
    }

    // Verifies if player is able to jump again
    if (this.cursors.up.isDown && this.canJump) {
      this.player.setVelocityY(-700);
      this.canJump = false;
    }

    // Verifies if player is in contact with some platform, so it can jump again
    if (this.player.body.touching.down) {
      this.canJump = true;
    }

    // Increases game speed as score increases
    if (this.score % 50 === 0 && this.score > 0) {
      this.platformSpeed -= 10;
      this.platforms.setVelocityX(this.platformSpeed);
      this.coins.setVelocityX(this.platformSpeed);
    }

    this.player.anims.play("right", true);
  }

  generatePlatforms(count) {
    let attempts = 0; // Counter to avoid infinite loop

    for (let i = 0; i < count; i++) {
      let randomY = Phaser.Math.Between(300, 450); // Creates platform random height
      let randomX = Phaser.Math.Between(600, 800); // Creates platform random X

      // Ensures that platforms are not too close together
      while (
        [...this.lastPlatformsY].some((y) => Math.abs(y - randomY) < 100) ||
        [...this.lastPlatformsX].some(
          (x) => Math.abs(x - randomX) < 90 || Math.abs(x - randomX) > 250
        )
      ) {
        randomY = Phaser.Math.Between(300, 450); // Creates new Y position
        randomX = Phaser.Math.Between(600, 800); // Creates new X position
        attempts++;

        if (attempts > 10) break; // If it doesn't find a valid Y and X after 10 tries, it exits the loop to avoid overloading the game
      }

      this.createPlatform(randomX, randomY);
      this.lastPlatformsY.add(randomY);
      this.lastPlatformsX.add(randomX);

      // Keeps only the last 5 records to avoid overload
      if (this.lastPlatformsY.size > 5) {
        this.lastPlatformsY.delete([...this.lastPlatformsY][0]);
      }
      if (this.lastPlatformsX.size > 5) {
        this.lastPlatformsX.delete([...this.lastPlatformsX][0]);
      }
    }
  }

  // Creates platforms
  createPlatform(x, y) {
    let platform = this.platforms.create(x, y, "platform");
    platform.setVelocityX(this.platformSpeed);

    // Add coins into platforms
    let coin = this.coins.create(x, y - 50, "coin");
    coin.setVelocityX(this.platformSpeed);
  }

  // Creates first platform
  createLargePlatform(x, y) {
    let platform = this.platforms.create(x, y, "platform");
    platform.setDisplaySize(platform.width * 3, platform.height);
    platform.setVelocityX(this.platformSpeed);
  }

  // Collects coins
  collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
  }
}
