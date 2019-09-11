window.onload = function () {
	var width = 800,
		height = 480;

	var game = new Phaser.Game(
		width, height, Phaser.CANVAS, '', {
			preload: preload,
			create: create,
			update: update
		}
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
	function create() {
		// set the scale mode to cover the entire screen
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		// set the background color of the stage
		game.stage.backgroundColor = "#ccc";

		// start the Phaser arcade physics engine
		game.physics.startSystem(Phaser.Physics.ARCADE);

		sprSeeker = new Seeker(game, game.world.centerX, game.world.centerY);

		// create target sprite
		sprTarget = game.add.sprite(game.input.x, game.input.y, 'imgTarget');
		sprTarget.anchor.setTo(0.5, 0.5);
	}

	/**
	 * Update the scene, called every frame.
	 */
	function update() {
		// update target position regarding to the current input control position
		sprTarget.position.setTo(game.input.x, game.input.y);

		// update seeker to move toward the target
		//seek(sprSeeker, sprTarget);
		sprSeeker.seek(sprTarget);
	}

}

class Seeker extends Phaser.Sprite {


	constructor(game, posX, posY) {
		super(game, posX, posY, "imgSeeker");

		Seeker.VEC_REF = new Phaser.Point(0, 0);
		Seeker.MAX_SPEED = 240;
		Seeker.MAX_STEER = 6;
		Seeker.MAX_SPEED_SQ = Seeker.MAX_SPEED * Seeker.MAX_SPEED;
		Seeker.MAX_STEER_SQ = Seeker.MAX_STEER * Seeker.MAX_STEER;

		this.init(game);
	}

	// "bad method definition" in firefox (cannot use statics ?) --> see end of class
	// static VEC_REF = new Phaser.Point(0, 0);
	// static MAX_SPEED = 240;
	// static MAX_STEER = 6;
	// static MAX_SPEED_SQ = Seeker.MAX_SPEED * Seeker.MAX_SPEED;
	// static MAX_STEER_SQ = Seeker.MAX_STEER * Seeker.MAX_STEER;

	init(game) {
		game.add.existing(this);
		this.anchor.setTo(0.5, 0.5);
		game.physics.enable(this, Phaser.Physics.ARCADE);
	}

	/**
	 * Updates vehicle velocity so that it moves toward the target.
	 */
	seek(pTarget) {

		// 1. vector(desired velocity) = (target position) - (vehicle position):: mouvement
		let vecDesired = Phaser.Point.subtract(pTarget.position, this.position);

		// 2. normalize vector(desired velocity)::direction
		vecDesired.normalize();

		// 3. scale vector(desired velocity) to maximum speed::vitesse désirée
		vecDesired.multiply(Seeker.MAX_SPEED, Seeker.MAX_SPEED);

		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
		let vecSteerForce = Phaser.Point.subtract(vecDesired, this.body.velocity);

		// 5. limit the magnitude of vector(steering force) to maximum force
		if (vecSteerForce.getMagnitudeSq() > Seeker.MAX_STEER_SQ) {
			vecSteerForce.setMagnitude(Seeker.MAX_STEER);
		}

		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
		this.body.velocity.add(vecSteerForce.x, vecSteerForce.y);

		// 7. limit the magnitude of vector(new velocity) to maximum speed
		if (this.body.velocity.getMagnitudeSq() > Seeker.MAX_SPEED_SQ) {
			vecSteerForce.setMagnitude(Seeker.MAX_SPEED);
		}

		// 8. update vehicle rotation according to the angle of the vehicle velocity
		this.rotation = Seeker.VEC_REF.angle(this.body.velocity);
	}
}