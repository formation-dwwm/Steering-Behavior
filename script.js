import Seeker from './seeker.js';

window.onload = function() {
  var width = 800,
		height = 480;

	var game = new Phaser.Game(
		width, height, Phaser.CANVAS, '',
		{preload: preload, create: create, update: update}
	);

	// var vecReference = new Phaser.Point(0, 0);

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
		// sprSeeker = game.add.sprite(game.world.centerX, game.world.centerY, 'imgSeeker');
		// sprSeeker.anchor.setTo(0.5, 0.5);
		// game.physics.enable(sprSeeker, Phaser.Physics.ARCADE);

		// sprSeeker.MAX_SPEED = 240;
		// sprSeeker.MAX_STEER = 6;
		// sprSeeker.MAX_SPEED_SQ = sprSeeker.MAX_SPEED * sprSeeker.MAX_SPEED;
    // sprSeeker.MAX_STEER_SQ = sprSeeker.MAX_STEER * sprSeeker.MAX_STEER;
    sprSeeker = new Seeker(game, game.centerX, game.centerY);

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
    // seek(sprSeeker, sprTarget);

    // sprSeeker = new Seeker(sprTarget);
    sprSeeker.seek(sprTarget);
  }
  

	// /**
	//  * Updates vehicle velocity so that it moves toward the target.
	//  */
	// function seek(pTarget){
	// 	var vecDesired;

  //   // 1. vector(desired velocity) = (target position) - (vehicle position)
  //   // vecDesired = target.pos - vehicle.pos;
  //   // console.log(pTarget.position);
  //   // console.log(this.position);
  //   vecDesired = Phaser.Point.subtract(pTarget.position, this.position);
  //   // console.log(vecDesired);

  //   // 2. normalize vector(desired velocity)
  //   // normalize.vecDesired
  //   // vecDesired.Point.normalize();
  //   vecDesired.normalize();

  //   // var posImg = game.add.sprite(10, 10, 'imgSeeker');
  //   // create une copie du point
  //   // Phaser.Point.clone()
  //   // var posImg = Phaser.add(sprSeeker.position.x,sprTarget.position.x)
  //   // vecDesired = Phaser.Point(200, 300);
  //   // console.log(vecDesired);

	// 	// // 3. scale vector(desired velocity) to maximum speed
  //   // scale.vecDesired;
  //   var maxVecDesired = this.MAX_SPEED;
  //   // console.log(maxVecDesired);

  //   vecDesired.multiply(this.MAX_SPEED, this.MAX_SPEED);


	// 	// // 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
	// 	// vecSteering = vecDesired - vecCurrent;
  //   var vecSteer = Phaser.Point.subtract(vecDesired, this.body.velocity);

	// 	// // 5. limit the magnitude of vector(steering force) to maximum force
	// 	// vecSteeringLimit = vecSteering + limit;
  //   // if (vecSteer.Phaser.getMagnitudeSq() > this.MAX_STEER_SQ){
	// 	// 	vecSteer.Phaser.setMagnitude(this.MAX_STEER);
  //   // }
  //   if (vecSteer.getMagnitudeSq() > this.MAX_STEER_SQ){
	// 		vecSteer.setMagnitude(this.MAX_STEER);
	// 	}

	// 	// // 6. vector(new velocity) = vector(current velocity) + vector(steering force)
  //   // newVecVelocity = vecCurrent + vecSteering;
  //   this.body.velocity.add(vecSteer.x, vecSteer.y);

	// 	// // 7. limit the magnitude of vector(new velocity) to maximum speed
  //   // newVecVelocityLimit = newVecVelocity.max(speed);
  //   if (this.body.velocity.getMagnitudeSq() > this.MAX_SPEED_SQ){
	// 		this.body.velocity.setMagnitude(this.MAX_SPEED);
	// 	}

	// 	// 8. update vehicle rotation according to the angle of the vehicle velocity
	// 	this.rotation = vecReference.angle(this.body.velocity);
  // }

}
