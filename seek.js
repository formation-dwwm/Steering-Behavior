export default class Seeker extends Phaser.Sprite
{ 
    static VEC_REF = new Phaser.Point(0, 0);
    static MAX_SPEED = 240;
    static MAX_STEER = 6;
    static MAX_SPEED_SQ = Seeker.MAX_SPEED * Seeker.MAX_SPEED;
    static MAX_STEER_SQ = Seeker.MAX_STEER * Seeker.MAX_STEER;

   
    constructor(game, posX, posY) {

        super(game, posX, posY, 'imgSeeker');

        this.init(game);
    }

    static get vecReference() {

        new Phaser.Point(0, 0);
    }


    init(game) {

        game.add.existing(this);
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }


    seek(pTarget) {

        var vecDesired;
		var vehicleVelocity = this.body.velocity;

		// 1. vector(desired velocity) = (target position) - (vehicle position)
		var vecDesired = Phaser.Point.subtract(pTarget.position, this.position);

		// 2. normalize vector(desired velocity)
		vecDesired.normalize();
		
		// 3. scale vector(desired velocity) to maximum speed
		vecDesired.multiply(Seeker.MAX_SPEED, Seeker.MAX_SPEED);

		// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
		var steerForce = Phaser.Point.subtract(vecDesired, vehicleVelocity);

		// 5. limit the magnitude of vector(steering force) to maximum force
		if(steerForce.getMagnitudeSq() > Seeker.MAX_STEER_SQ){
			steerForce.setMagnitude(Seeker.MAX_STEER);
		}

		// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
		vehicleVelocity.add(steerForce.x, steerForce.y);

		// 7. limit the magnitude of vector(new velocity) to maximum speed
		if(vehicleVelocity.getMagnitudeSq() > Seeker.MAX_SPEED_SQ){
			vehicleVelocity.setMagnitude(Seeker.MAX_SPEED);
		}

		// 8. update vehicle rotation according to the angle of the vehicle velocity
        this.rotation = Seeker.VEC_REF.angle(vehicleVelocity);
	}
  
}

    // desiredVec(pVehicle, pTarget) {
        
    //     let vecDesired = Phaser.Point.subtract(pTarget.position, pVehicle.position);

    //     vecDesired.normalize();
        
    //     vecDesired.multiply(pVehicle.MAX_SPEED, pVehicle.MAX_SPEED);
        
    //     return vecDesired;
    // }


    // steeringForce(vecDesired) {

    //     let vehicleVelocity = this.body.velocity;

    //     let vecSteering = vecDesired.subtract(vehicleVelocity.x, vehicleVelocity.y);

    //     vecSteering.setMagnitude(Math.min(Seeker.MAX_STEER, vecSteering.getMagnitude()));

    //     return vecSteering;
    // }

    // setNewVelocity(newVelocity) {
    //     let vehicleVelocity = this.body.velocity;
    //     vehicleVelocity.add(newVelocity.x, newVelocity.y);
    //     vehicleVelocity.setMagnitude(Math.min(Seeker.MAX_SPEED, vehicleVelocity.getMagnitude()));
    // }

    // Rotation() {

    //     this.rotation = Seeker.vecReference.angle(this.body.velocity);
    // }