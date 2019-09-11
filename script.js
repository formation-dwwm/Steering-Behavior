window.onload = function() {

	var width = 800,
	height = 480;

	var game = new Phaser.Game(
		width, height, Phaser.CANVAS, '',
		{preload: preload, create: create, update: update}
	);

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
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		// set the background color of the stage
		game.stage.backgroundColor = "#ccc";

		// start the Phaser arcade physics engine
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// create seeker sprite
		sprSeeker = new Seeker(game, game.world.centerX, game.world.centerY);

		// create target sprite
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

// Je créer une nouvelle Class Seek

class Seeker extends Phaser.Sprite {

	// Je définie mes variables
	MAX_SPEED = 240;
	MAX_STEER = 6;
	MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;
	MAX_STEER_SQ = this.MAX_STEER * this.MAX_STEER;

	//J'appelle le constructor de la class ainsi que de celle qu'on étend avec super
	constructor(game, centX, centY){
		super(game, centX, centY, 'imgSeeker');
		//J'initialise mon jeu
		this.init(game);
	}
	//Je définie mon jeu en lui ajoutant l'instance donc elle même
	init(game){
		game.add.existing(this);
		this.anchor.setTo(0.5, 0.5);
		game.physics.enable(this, Phaser.Physics.ARCADE);
	}

	//Voici ma méthode Seek qui définit les param de mon seeker
	seek(sprTarget){
		var vecReference = new Phaser.Point(0, 0);
		var vecDesired;

		// 1. vector(desired velocity) = (target position) - (vehicle position)
		vecDesired = Phaser.Point.subtract(sprTarget.position, this.position);

		// 2. normalize vector(desired velocity)
		vecDesired.normalize();

		// 3. scale vector(desired velocity) to maximum speed
		vecDesired.multiply(this.MAX_SPEED, this.MAX_SPEED);

		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
		var vecStr = Phaser.Point.subtract(vecDesired, this.body.velocity);

		// 5. limit the magnitude of vector(steering force) to maximum force
		if (vecStr.getMagnitudeSq() > this.MAX_STEER_SQ){
			vecStr.setMagnitude(this.MAX_STEER);
		};

		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
		this.body.velocity.add(vecStr.x, vecStr.y);

		// 7. limit the magnitude of vector(new velocity) to maximum speed
		if (this.body.velocity.getMagnitudeSq() > this.MAX_SPEED_SQ){
			this.body.velocity.setMagnitude(this.MAX_SPEED);
		};

		// 8. update vehicle rotation according to the angle of the vehicle velocity
		this.rotation = vecReference.angle(this.body.velocity);
	};
}