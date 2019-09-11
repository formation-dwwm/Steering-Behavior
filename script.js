import Seeker from './seek.js';

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
		
	

		// set the background color of the stage
		game.stage.backgroundColor = "#ccc";

		// start the Phaser arcade physics engine
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// create seeker sprite
		// sprSeeker = game.add.sprite(game.world.centerX, game.world.centerY, 'imgSeeker');
		// sprSeeker.anchor.setTo(0.5, 0.5);
		// game.physics.enable(sprSeeker, Phaser.Physics.ARCADE);

		// sprSeeker.MAX_SPEED = 240;
		// sprSeeker.MAX_STEER = 6;
		// sprSeeker.MAX_SPEED_SQ = sprSeeker.MAX_SPEED * sprSeeker.MAX_SPEED;
		// sprSeeker.MAX_STEER_SQ = sprSeeker.MAX_STEER * sprSeeker.MAX_STEER;

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



	/**
	 * Updates vehicle velocity so that it moves toward the target.
	 */
	// function seek(pVehicle, pTarget){
	// 	var vecDesired;
	// 	var vehicleVelocity = pVehicle.body.velocity;

	// 	// 1. vector(desired velocity) = (target position) - (vehicle position)
	// 	var vecDesired = Phaser.Point.subtract(pTarget.position, pVehicle.position);

	// 	// 2. normalize vector(desired velocity)
	// 	vecDesired.normalize();
		
	// 	// 3. scale vector(desired velocity) to maximum speed
	// 	vecDesired.multiply(pVehicle.MAX_SPEED, pVehicle.MAX_SPEED);

	// 	// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
	// 	var steerForce = Phaser.Point.subtract(vecDesired, vehicleVelocity);

	// 	// 5. limit the magnitude of vector(steering force) to maximum force
	// 	if(steerForce.getMagnitudeSq() > pVehicle.MAX_STEER_SQ){
	// 		steerForce.setMagnitude(pVehicle.MAX_STEER);
	// 	}

	// 	// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
	// 	vehicleVelocity.add(steerForce.x, steerForce.y);

	// 	// 7. limit the magnitude of vector(new velocity) to maximum speed
	// 	if(vehicleVelocity.getMagnitudeSq() > pVehicle.MAX_SPEED_SQ){
	// 		vehicleVelocity.setMagnitude(pVehicle.MAX_SPEED);
	// 	}

	// 	// 8. update vehicle rotation according to the angle of the vehicle velocity
	// 	pVehicle.rotation = vecReference.angle(vehicleVelocity);
	// }
}