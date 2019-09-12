class Seeker extends Phaser.Sprite{

	MAX_SPEED = 240;
    MAX_STEER = 6;
    MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;
    MAX_STEER_SQ = this.MAX_STEER * this.MAX_STEER;
	vecReference = new Phaser.Point(0, 0);
	vecDesired;
	steeringForce;

	constructor(game, gameCenterX,gameCenterY) {
		super(game, gameCenterX, gameCenterY, 'imgSeeker');

		this.init(game);
    }
    
    init(game){
        game.add.existing(this);
        this.anchor.setTo(0.5, 0.5);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.collideWorldBounds = true;
    }
	
    seek(pTarget){
		// 1. vector(desired velocity) = (target position) - (vehicle position)
		this.vecDesired = Phaser.Point.subtract(pTarget, this.position);
		// 2. normalize vector(desired velocity)
		this.vecDesired.normalize();
		// 3. scale vector(desired velocity) to maximum speed
		this.vecDesired.multiply(this.MAX_SPEED, this.MAX_SPEED);
		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
		this.steeringForce = Phaser.Point.subtract(this.vecDesired, this.body.velocity);
		// 5. limit the magnitude of vector(steering force) to maximum force
		if (this.steeringForce.getMagnitudeSq()> this.MAX_STEER_SQ){
			this.steeringForce.setMagnitude(this.MAX_STEER);
		}
		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
		this.body.velocity.add(this.steeringForce.x, this.steeringForce.y);

		// 7. limit the magnitude of vector(new velocity) to maximum speed
		if (this.body.velocity.getMagnitudeSq() > this.MAX_SPEED_SQ){
			this.body.velocity.setMagnitude(this.MAX_SPEED);
		}
		// 8. update vehicle rotation according to the angle of the vehicle velocity
		this.rotation = this.vecReference.angle(this.body.velocity);
	}
	
}