export default class Seeker extends Phaser.Sprite 
{

	static VEC_REF = new Phaser.Point(0, 0);
	static MAX_SPEED = 240;
	static MAX_STEER = 6;
	static MAX_SPEED_SQ = Seeker.MAX_SPEED * Seeker.MAX_SPEED;
	static MAX_STEER_SQ = Seeker.MAX_STEER * Seeker.MAX_STEER;

    constructor(game, posX, posY)
    {
		super(game, posX, posY, "imgSeeker");
		
        this.init(game);
	}

	init(game)
	{
		game.add.existing(this);

		this.anchor.setTo(0.5, 0.5);
		game.physics.enable(this, Phaser.Physics.ARCADE);
	}

	seek(pTarget)
	{
		this.getDesiredVelocity(pTarget);
		this.getSteeringForce(vecDesired);
		this.setNewVelocity();
		this.lookAhead();
	}

	getDesiredVelocity(pTarget)
	{
		var vecDesired;

		vecDesired = Phaser.Point.subtract(pTarget.position, this.position);

		vecDesired.normalize();

		vecDesired.multiply(Seeker.MAX_SPEED, Seeker.MAX_SPEED);

	}

	getSteeringForce(vecDesired)
	{
		var steeringForce = Phaser.Point.subtract(vecDesired, this.body.velocity);
		
		if(steeringForce.getMagnitudeSq() > Seeker.MAX_STEER_SQ)
		{
			steeringForce.setMagnitude(Seeker.MAX_STEER);
		}

	}

	setNewVelocity(newVelocity)
	{
		var newVelocity = this.body.velocity;
		newVelocity.add(steeringForce.x, steeringForce.y);

		if(this.body.velocity.getMagnitudeSq() > Seeker.MAX_SPEED_SQ)
		{
			this.body.velocity.setMagnitude(Seeker.MAX_SPEED);
		}

	}

	lookAhead()
	{
		this.rotation = Seeker.VEC_REF.angle(this.body.velocity);
	}

}