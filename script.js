window.onload = function() {
	var width = 800,
		height = 480;

	var game = new Phaser.Game(
		width, height, Phaser.CANVAS, '',
		{preload: preload, create: create, update: update}
	);

	var vecReference = new Phaser.Point(0, 0);

	var seekers = [];
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

		// create seekers
		seekers.push(new Seeker(game, game.world.centerX, game.world.centerY, 0xff7777));
		seekers.push(new ApproachingSeekerSimple(game, game.world.centerX, game.world.centerY, 0x7777ff));
		seekers.push(new ApproachingSeeker(game, game.world.centerX, game.world.centerY, 0x77ff77));

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
		seekers.map(seeker => {
			seeker.seek(sprTarget);
		});
	}
}


class Seeker extends Phaser.Sprite {

	static VEC_REF = new Phaser.Point(0, 0);
	static MAX_SPEED = 240;
	static MAX_STEER = 6;
	static MAX_SPEED_SQ = Seeker.MAX_SPEED * Seeker.MAX_SPEED;
	static MAX_STEER_SQ = Seeker.MAX_STEER * Seeker.MAX_STEER;

	constructor(game, posX, posY, color = 0xffffff){
		super(game, posX, posY, "imgSeeker");
		
		this.init(game);

		this.tint = color;
	}

	init(game){
		game.add.existing(this);

		this.anchor.setTo(0.5, 0.5);
		game.physics.enable(this, Phaser.Physics.ARCADE);
	}

	seek(pTarget){
		var vecDesired = this.getDesiredVelocity(pTarget);

		var vecSteer = this.getSteeringForce(vecDesired);

		this.setNewVelocity(vecSteer);

		this.lookAhead(this.body.velocity);
	}

	getDesiredVelocity(pTarget){
		var vecDesired;

		// 1. vector(desired velocity) = (target position) - (vehicle position)
		vecDesired = Phaser.Point.subtract(pTarget.position, this.position);

		// 2. normalize vector(desired velocity)
		vecDesired.normalize();

		// 3. scale vector(desired velocity) to maximum speed
		vecDesired.multiply(Seeker.MAX_SPEED, Seeker.MAX_SPEED);

		return vecDesired;
	}

	getSteeringForce(vecDesired){
		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
        var vecSteer = Phaser.Point.subtract(vecDesired, this.body.velocity);

		// 5. limit the magnitude of vector(steering force) to maximum force
		if (vecSteer.getMagnitudeSq() > Seeker.MAX_STEER_SQ){
			vecSteer.setMagnitude(Seeker.MAX_STEER);
		}

		return vecSteer;
	}

	setNewVelocity(newVelocity){
		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
		this.body.velocity.add(newVelocity.x, newVelocity.y);

		// 7. limit the magnitude of vector (new velocity) to maximum speed
		if (this.body.velocity.getMagnitudeSq() > Seeker.MAX_SPEED_SQ){
			this.body.velocity.setMagnitude(Seeker.MAX_SPEED);
		}
	}

	lookAhead(){
		// 8. update vehicle rotation according to the angle of the vehicle velocity
		this.rotation = Seeker.VEC_REF.angle(this.body.velocity);
	}
}


class ApproachingSeekerSimple extends Seeker {
	getDesiredVelocity(pTarget){
		var vecDesired;

		// 1. vector(desired velocity) = (target position) - (vehicle position)
		vecDesired = Phaser.Point.subtract(pTarget.position, this.position);

		// 2. limit the magnitude of vector (desired velocity) to maximum speed
        if(vecDesired.getMagnitudeSq() > Seeker.MAX_SPEED_SQ){
            vecDesired.setMagnitude(Seeker.MAX_SPEED);
        }

		return vecDesired;
	}
}


class ApproachingSeeker extends Seeker {

	static SLOWING_DISTANCE_THRESHOLD = 100.0;

	getDesiredVelocity(pTarget){
		var vecDesired;

		// 1. vector(desired velocity) = (target position) - (vehicle position)
		vecDesired = Phaser.Point.subtract(pTarget.position, this.position);

		// 2. normalize vector(desired velocity)
		vecDesired.normalize();

		var distance = Phaser.Point.subtract(pTarget.position, this.position).getMagnitude();
		var rampedSpeed = Seeker.MAX_SPEED * (distance / ApproachingSeeker.SLOWING_DISTANCE_THRESHOLD);
		var clippedSpeed = Math.min(rampedSpeed, Seeker.MAX_SPEED);

		vecDesired.multiply(clippedSpeed, clippedSpeed);

		return vecDesired;
	}
}