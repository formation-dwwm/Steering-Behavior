window.onload = function() {
	var width = 1024,
		height = 748;

	var game = new Phaser.Game(
		width, height, Phaser.CANVAS, '',
		{preload: preload, create: create, update: update}
	);

	var vecReference = new Phaser.Point(0, 0);

	var sprSeeker;
	var sprTarget;

	/**
	 *	Preload textures
	 */
	function preload() {
		game.load.image('imgSeeker', 'assets/arrow_white_sm.png');
		game.load.image('imgTarget', 'assets/circle_blue.png');
	}

	/**
	 *	Setup the game scene
	 */
	function create(){
		// set the scale mode to cover the entire screen

		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		// set the background color of the stage
		game.stage.backgroundColor = "black";

		// start the Phaser arcade physics engine
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// create seeker sprite
		sprSeeker = new Seeker(game, game.world.centerX, game.world.centerY);

		// sprSeeker = game.add.sprite(game.world.centerX, game.world.centerY, 'imgSeeker');
		// sprSeeker.anchor.setTo(0.5, 0.5);
		// game.physics.enable(sprSeeker, Phaser.Physics.ARCADE);

		// sprSeeker.MAX_SPEED = 240;
		// sprSeeker.MAX_STEER = 6;
		// sprSeeker.MAX_SPEED_SQ = sprSeeker.MAX_SPEED * sprSeeker.MAX_SPEED;
		// sprSeeker.MAX_STEER_SQ = sprSeeker.MAX_STEER * sprSeeker.MAX_STEER;

		// // create target sprite
		sprTarget = game.add.sprite(game.input.x, game.input.y, 'imgTarget');
		sprTarget.anchor.setTo(0.5, 0.5);

	}

	/**
	 * Update the scene, called every frame.
	 */
	function update(){
		// update target position regarding to the current input control position
		sprTarget.position.setTo(game.input.x, game.input.y);

		// update seeker to move toward the target
		sprSeeker.seek(sprTarget);
	}
}