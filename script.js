window.onload = function() {
	var width = 800,
		height = 480;

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
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		// set the background color of the stage
		game.stage.backgroundColor = "#ccc";

		// start the Phaser arcade physics engine
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// create seeker sprite
		sprSeeker = game.add.sprite(game.world.centerX, game.world.centerY, 'imgSeeker');
		sprSeeker.anchor.setTo(0.5, 0.5);
		game.physics.enable(sprSeeker, Phaser.Physics.ARCADE);

		sprSeeker.MAX_SPEED = 240;
		sprSeeker.MAX_STEER = 6;
		sprSeeker.MAX_SPEED_SQ = sprSeeker.MAX_SPEED * sprSeeker.MAX_SPEED;
		sprSeeker.MAX_STEER_SQ = sprSeeker.MAX_STEER * sprSeeker.MAX_STEER;

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
		seek(sprSeeker, sprTarget);
	}

	/**
	 * Updates vehicle velocity so that it moves toward the target.
	 */
	function seek(pVehicle, pTarget){
		let vecDesired;
		let vecSteering;
		let vehicleVelocity = pVehicle.body.velocity;
		const MAX_STEER = pVehicle.MAX_STEER;
		const MAX_SPEED = pVehicle.MAX_SPEED;

		// 1. vector(desired velocity) = (target position) - (vehicle position)
		vecDesired = pTarget.position.clone().subtract(pVehicle.position.x, pVehicle.position.y);

		// 2. normalize vector(desired velocity)
		vecDesired.normalize();

		// 3. scale vector(desired velocity) to maximum speed
		vecDesired.multiply(pVehicle.position.x, pVehicle.position.y);

		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
		vecSteering = vecDesired.clone().subtract(vehicleVelocity.x, vehicleVelocity.y);

		// 5. limit the magnitude of vector(steering force) to maximum force
		vecSteering.setMagnitude(Math.min(MAX_STEER, vecSteering.getMagnitude()));

		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
		vehicleVelocity.add(vecSteering.x, vecSteering.y);

		// 7. limit the magnitude of vector(new velocity) to maximum speed
		vehicleVelocity.setMagnitude(Math.min(MAX_SPEED, vehicleVelocity.getMagnitude()));

		// 8. update vehicle rotation according to the angle of the vehicle velocity
		pVehicle.rotation = vecReference.angle(pVehicle.body.velocity);
	}
}
