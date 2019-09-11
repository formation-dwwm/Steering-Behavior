class Seeker extends Phaser.Sprite {


	constructor(game, posX, posY) {
		super(game, posX, posY, "imgSeeker");

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

Seeker.VEC_REF = new Phaser.Point(0, 0);
Seeker.MAX_SPEED = 240;
Seeker.MAX_STEER = 6;
Seeker.MAX_SPEED_SQ = Seeker.MAX_SPEED * Seeker.MAX_SPEED;
Seeker.MAX_STEER_SQ = Seeker.MAX_STEER * Seeker.MAX_STEER;