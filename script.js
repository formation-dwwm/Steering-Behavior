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

		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.scale.pageAlignVertically = true;
		// this.scale.pageAlignHorizontally = true;

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
		
		var vecDesired;
		var pVehicle;
		var pTarget;
		var vecSteering;
		var vecCurrent = pVehicle.body.velocity;
		var forceMax = pVehicle.MAX_STEER;
		var speedMax = pVehicle.MAX_SPEED;
		var newVelocity;
		var scale;

		// 1. vector(desired velocity) = (target position) - (vehicle position)
		
		vecDesired = Phaser.Point.subtract(pTarget, pVehicle);

		// 2. normalize vector(desired velocity)
		
		vecDesired.normalize();

		// 3. scale vector(desired velocity) to maximum speed

		scale = vecDesired.multiply(speedMax, speedMax);

		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
		
		vecSteering = Phaser.Point.subtract(vecDesired, vecCurrent);

		// 5. limit the magnitude of vector(steering force) to maximum force
		
		if(vecSteering.getMagnitudeSq() > forceMax * forceMax ){

			vecSteering.setMagnitude(forceMax);
		}

		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
		
		newVelocity = vecCurrent.add(vecSteering.x, vecSteering.y);

		// 7. limit the magnitude of vector(new velocity) to maximum speed
		
		if(vecCurrent.getMagnitudeSq() > scale){

			vecCurrent.setMagnitude(speedMax);
		}

		// 8. update vehicle rotation according to the angle of the vehicle velocity

		pVehicle.rotation = vecReference.angle(vecCurrent);
	}
}