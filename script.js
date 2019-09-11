window.onload = function() {
	var height = window.innerHeight,
		width = window.innerWidth;

	var game = new Phaser.Game(
		width, height, Phaser.WEBGL, '',
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
		let desired_velocity;
		let normalize_vector;
        let steering_force;
        let new_velocity;
		// 1. vector(desired velocity) = (target position) - (vehicle position)
		desired_velocity = Phaser.Point.subtract(pTarget, pVehicle);

		// 2. normalize vector(desired velocity)
        normalize_vector = Phaser.Point.normalize(desired_velocity)

		// 3. scale vector(desired velocity) to maximum speed
		let scale_desired = normalize_vector.multiply(pVehicle.MAX_SPEED,pVehicle.MAX_SPEED);

		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
        steering_force = Phaser.Point.subtract(scale_desired, pVehicle.body.velocity);

		// 5. limit the magnitude of vector(steering force) to maximum force
		steering_force.setMagnitude(pVehicle.MAX_STEER)

		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
        new_velocity = Phaser.Point.add(pVehicle.body.velocity, steering_force)

		// 7. limit the magnitude of vector(new velocity) to maximum speed

		if (new_velocity.getMagnitude() > pVehicle.MAX_SPEED) {
		    new_velocity.setMagnitude(pVehicle.MAX_SPEED)
        }

		// 8. update vehicle rotation according to the angle of the vehicle velocity
        pVehicle.body.velocity = new_velocity;
		pVehicle.rotation = vecReference.angle(pVehicle.body.velocity);

	}
}
